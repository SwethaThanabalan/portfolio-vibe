#!/usr/bin/env python3
"""Give every project its own real, indexable page.

new-site/index.html is one file with every page inside it, shown by a hash route
(/#sahay). Search engines treat that as the home page, so a project there can't
rank on its own. This script writes new-site/project/<name>/index.html for each
project: the same page, but with its own address, title, description, canonical
link, social tags and structured data, and with that project visible from the start.

Run it again whenever new-site/index.html changes (the deploy workflow also runs it):

    python3 scripts/build-project-pages.py

Standard library only.
"""
import html
import json
import os
import re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'new-site')
SITE = 'https://swethathanabalan.com'
# section id -> folder name under /project/
PROJECTS = {'sahay': 'sahay', 'monster-walk': 'monster-walk', 'septa': 'septa', 'adult-you': 'adult-you'}
OTHER_PAGES = ['about', 'photography', 'graphic-design']


def section_span(text, sec_id):
    """Start and end of <section id="sec_id" ...> ... </section>, counting nested sections."""
    start = text.index('<section id="%s"' % sec_id)
    depth, pos = 0, start
    for m in re.finditer(r'<section\b|</section>', text[start:]):
        depth += 1 if m.group(0) == '<section' else -1
        if depth == 0:
            return start, start + m.end()
    raise ValueError('unclosed section ' + sec_id)


def text_of(fragment):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', fragment))).strip()


def attr(s):
    return html.escape(s, quote=True)


def build():
    src = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    made = []
    for sec_id, slug in PROJECTS.items():
        t = src
        # facts about this project, read from its own header
        s, e = section_span(t, sec_id)
        block = t[s:e]
        h1 = text_of(re.search(r'<h1[^>]*>(.*?)</h1>', block, re.S).group(1))
        lede = text_of(re.search(r'<p class="cs-lede">(.*?)</p>', block, re.S).group(1))
        image = '%s/assets/%s/cover.jpg' % (SITE, slug)
        url = '%s/project/%s/' % (SITE, slug)
        title = '%s | Swetha Thanabalan' % h1

        # drop every other page so this one carries only its own content
        for other in [p for p in list(PROJECTS) + OTHER_PAGES if p != sec_id]:
            a, b = section_span(t, other)
            t = t[:a] + t[b:]
        # show this project in the raw HTML, not only after scripts run
        t = t.replace('<section id="%s" class="cs-page gutter" data-page hidden' % sec_id,
                      '<section id="%s" class="cs-page gutter" data-page' % sec_id, 1)

        # head: base for relative paths, page marker, own title, description, canonical, social tags
        t = t.replace('<meta charset="utf-8">',
                      '<meta charset="utf-8">\n<base href="/">\n<script>window.__PAGE__ = %s;</script>' % json.dumps(sec_id), 1)
        t = re.sub(r'<title>.*?</title>', '<title>%s</title>' % attr(title), t, count=1, flags=re.S)
        t = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + attr(lede) + m.group(2), t, count=1)
        t = re.sub(r'(<link rel="canonical" href=")[^"]*(")', lambda m: m.group(1) + url + m.group(2), t, count=1)
        for prop, val in (('og:title', title), ('og:description', lede), ('og:url', url), ('og:image', image)):
            t = re.sub(r'(<meta property="%s" content=")[^"]*(")' % prop, lambda m, v=val: m.group(1) + attr(v) + m.group(2), t, count=1)
        for name, val in (('twitter:title', title), ('twitter:description', lede), ('twitter:image', image)):
            t = re.sub(r'(<meta name="%s" content=")[^"]*(")' % name, lambda m, v=val: m.group(1) + attr(v) + m.group(2), t, count=1)

        # structured data: the person, the site, and this piece of work
        ld = re.search(r'<script type="application/ld\+json">(.*?)</script>', t, re.S)
        graph = json.loads(ld.group(1))
        graph['@graph'].append({
            '@type': 'CreativeWork', 'name': h1, 'description': lede, 'url': url, 'image': image,
            'author': {'@type': 'Person', 'name': 'Swetha Thanabalan', 'url': SITE},
            'isPartOf': {'@type': 'WebSite', 'url': SITE},
        })
        graph['@graph'].append({
            '@type': 'BreadcrumbList', 'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE + '/'},
                {'@type': 'ListItem', 'position': 2, 'name': h1, 'item': url}]})
        t = t.replace(ld.group(0), '<script type="application/ld+json">\n%s\n</script>' % json.dumps(graph, indent=2), 1)

        # links to the other projects become real addresses
        for other_id, other_slug in PROJECTS.items():
            t = t.replace('href="#%s"' % other_id, 'href="/project/%s/"' % other_slug)

        # router: a project page shows its own project without a hash, and keeps its own title;
        # "back" links do a normal page load to the home page instead of switching sections
        t = t.replace("var id = location.hash.slice(1), match = null;",
                      "var id = location.hash.slice(1) || window.__PAGE__ || '', match = null;", 1)
        t = t.replace("    document.title = match ? (titles[id] || id) + ' | Swetha Thanabalan, Product Designer' : baseTitle;",
                      "    if (!(match && id === window.__PAGE__)) document.title = match ? (titles[id] || id) + ' | Swetha Thanabalan, Product Designer' : baseTitle;", 1)
        t = t.replace("if (!a || !document.body.classList.contains('on-about')) return;",
                      "if (!a || window.__PAGE__ || !document.body.classList.contains('on-about')) return;", 1)

        out_dir = os.path.join(ROOT, 'project', slug)
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(t)
        made.append((slug, len(t)))

    # sitemap: the home page and every project
    urls = [SITE + '/'] + ['%s/project/%s/' % (SITE, s) for s in PROJECTS.values()]
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for i, u in enumerate(urls):
            f.write('  <url>\n    <loc>%s</loc>\n    <changefreq>monthly</changefreq>\n    <priority>%s</priority>\n  </url>\n' % (u, '1.0' if i == 0 else '0.8'))
        f.write('</urlset>\n')
    return made


if __name__ == '__main__':
    for slug, size in build():
        print('project/%s/index.html  %d KB' % (slug, size // 1024))
