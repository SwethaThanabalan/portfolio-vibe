#!/usr/bin/env python3
"""Give every page of the portfolio its own real, indexable address.

new-site/index.html is one file with every page inside it, shown by a hash route
(/#sahay). Search engines treat that as the home page, so a page there can't rank
on its own. This script writes one real page per section:

    /project/sahay/  /project/monster-walk/  /project/septa/  /project/adult-you/
    /about/  /photography/  /graphic-design/

Each is the same site with its own address, title, description, canonical link,
social tags and structured data, and with that page visible from the start.
It also writes sitemap.xml (with the gallery images listed for image search).

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
NAME = 'Swetha Thanabalan'

# section id -> where it lives. Projects are read from their own headers; the rest are described here.
PAGES = {
    'sahay': {'path': '/project/sahay/', 'kind': 'project', 'image': '/assets/sahay/cover.jpg'},
    'monster-walk': {'path': '/project/monster-walk/', 'kind': 'project', 'image': '/assets/monster-walk/cover.jpg'},
    'septa': {'path': '/project/septa/', 'kind': 'project', 'image': '/assets/septa/cover.jpg'},
    'adult-you': {'path': '/project/adult-you/', 'kind': 'project', 'image': '/assets/adult-you/cover.jpg'},
    'about': {'path': '/about/', 'kind': 'about', 'title': 'About %s | Product Designer & UX Designer' % NAME,
              'image': '/assets/about/me-grad.jpg'},
    'photography': {'path': '/photography/', 'kind': 'gallery', 'title': 'Photography | %s' % NAME,
                    'lead': 'Commercial and personal photography: landscapes, food, portraits and product work.',
                    'image': '/assets/photography/ridge-sunlit.jpg'},
    'graphic-design': {'path': '/graphic-design/', 'kind': 'gallery', 'title': 'Graphic design | %s' % NAME,
                       'lead': '', 'image': '/assets/graphic/editorial-spread.jpg'},
}


def section_span(text, sec_id):
    """Start and end of <section id="sec_id" ...> ... </section>, counting nested sections."""
    start = text.index('<section id="%s"' % sec_id)
    depth = 0
    for m in re.finditer(r'<section\b|</section>', text[start:]):
        depth += 1 if m.group(0) == '<section' else -1
        if depth == 0:
            return start, start + m.end()
    raise ValueError('unclosed section ' + sec_id)


def text_of(fragment):
    # block tags separate words; inline tags (em, a, span) sit inside a sentence
    fragment = re.sub(r'</?(p|div|li|ul|ol|h[1-6]|dd|dt|dl|header|section|figure|figcaption|br)\b[^>]*>', ' ', fragment)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', fragment))).strip()


def attr(s):
    return html.escape(s, quote=True)


def facts(sec_id, cfg, block):
    """Title, description and (for galleries) the images, read from the page itself."""
    h1 = text_of(re.search(r'<h1[^>]*>(.*?)</h1>', block, re.S).group(1))
    images = []
    if cfg['kind'] == 'project':
        title = '%s | %s' % (h1, NAME)
        desc = text_of(re.search(r'<p class="cs-lede">(.*?)</p>', block, re.S).group(1))
        name = h1
    elif cfg['kind'] == 'about':
        title = cfg['title']
        story = text_of(re.search(r'<div class="sb-story">\s*<p>(.*?)</p>', block, re.S).group(1))
        first = re.split(r'(?<=[.!?])\s', story)[0]
        desc = ('%s %s' % (h1, first)).strip()
        name = 'About ' + NAME
    else:
        title = cfg['title']
        intro = text_of(re.search(r'<p class="g-intro">(.*?)</p>', block, re.S).group(1))
        desc = ('%s %s' % (cfg['lead'], intro)).strip()
        name = title.split(' | ')[0]
        for full, alt in re.findall(r'data-full="([^"]+)" data-alt="([^"]*)"', block):
            images.append((SITE + '/' + full, html.unescape(alt)))
    return title, desc, name, images


def build():
    src = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    made, gallery_images = [], {}
    for sec_id, cfg in PAGES.items():
        t = src
        s, e = section_span(t, sec_id)
        title, desc, name, images = facts(sec_id, cfg, t[s:e])
        url, image = SITE + cfg['path'], SITE + cfg['image']
        if images:
            gallery_images[cfg['path']] = images

        # drop every other page so this one carries only its own content
        for other in [p for p in PAGES if p != sec_id]:
            a, b = section_span(t, other)
            t = t[:a] + t[b:]
        # show this page in the raw HTML, not only after scripts run
        t = re.sub(r'(<section id="%s"[^>]*?) hidden' % sec_id, r'\1', t, count=1)

        # head: base for relative paths, page marker, own title, description, canonical, social tags
        t = t.replace('<meta charset="utf-8">',
                      '<meta charset="utf-8">\n<base href="/">\n<script>window.__PAGE__ = %s;</script>' % json.dumps(sec_id), 1)
        t = re.sub(r'<title>.*?</title>', '<title>%s</title>' % attr(title), t, count=1, flags=re.S)
        t = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + attr(desc) + m.group(2), t, count=1)
        t = re.sub(r'(<link rel="canonical" href=")[^"]*(")', lambda m: m.group(1) + url + m.group(2), t, count=1)
        for prop, val in (('og:title', title), ('og:description', desc), ('og:url', url), ('og:image', image)):
            t = re.sub(r'(<meta property="%s" content=")[^"]*(")' % prop, lambda m, v=val: m.group(1) + attr(v) + m.group(2), t, count=1)
        for nm, val in (('twitter:title', title), ('twitter:description', desc), ('twitter:image', image)):
            t = re.sub(r'(<meta name="%s" content=")[^"]*(")' % nm, lambda m, v=val: m.group(1) + attr(v) + m.group(2), t, count=1)

        # structured data: the person and the site (already there), plus this page
        ld = re.search(r'<script type="application/ld\+json">(.*?)</script>', t, re.S)
        graph = json.loads(ld.group(1))
        author = {'@type': 'Person', 'name': NAME, 'url': SITE}
        part_of = {'@type': 'WebSite', 'url': SITE}
        if cfg['kind'] == 'project':
            node = {'@type': 'CreativeWork', 'name': name, 'description': desc, 'url': url, 'image': image, 'author': author, 'isPartOf': part_of}
        elif cfg['kind'] == 'about':
            node = {'@type': 'AboutPage', 'name': title, 'description': desc, 'url': url, 'image': image,
                    'mainEntity': {'@type': 'Person', 'name': NAME, 'url': SITE}, 'isPartOf': part_of}
        else:
            node = {'@type': 'ImageGallery', 'name': name, 'description': desc, 'url': url, 'author': author, 'isPartOf': part_of,
                    'image': [{'@type': 'ImageObject', 'contentUrl': u, 'name': a, 'creator': author, 'copyrightHolder': author,
                               'copyrightNotice': '© %s' % NAME, 'creditText': NAME} for u, a in images]}
        graph['@graph'].append(node)
        graph['@graph'].append({'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE + '/'},
            {'@type': 'ListItem', 'position': 2, 'name': name, 'item': url}]})
        # ASCII-only, like the rest of the file
        t = t.replace(ld.group(0), '<script type="application/ld+json">\n%s\n</script>' % json.dumps(graph, indent=2, ensure_ascii=True), 1)

        # links to the other pages become real addresses
        for other_id, other in PAGES.items():
            t = t.replace('href="#%s"' % other_id, 'href="%s"' % other['path'])

        # router: a page shows itself without a hash and keeps its own title;
        # "back" links do a normal page load to the home page instead of switching sections
        t = t.replace("var id = location.hash.slice(1), match = null;",
                      "var id = location.hash.slice(1) || window.__PAGE__ || '', match = null;", 1)
        t = t.replace("    document.title = match ? (titles[id] || id) + ' | Swetha Thanabalan, Product Designer' : baseTitle;",
                      "    if (!(match && id === window.__PAGE__)) document.title = match ? (titles[id] || id) + ' | Swetha Thanabalan, Product Designer' : baseTitle;", 1)
        t = t.replace("if (!a || !document.body.classList.contains('on-about')) return;",
                      "if (!a || window.__PAGE__ || !document.body.classList.contains('on-about')) return;", 1)
        t = t.encode('ascii', 'xmlcharrefreplace').decode('ascii')

        out_dir = os.path.join(ROOT, *cfg['path'].strip('/').split('/'))
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, 'index.html'), 'w', encoding='ascii') as f:
            f.write(t)
        made.append((cfg['path'], len(t)))

    # sitemap: the home page and every page, with the gallery images listed for image search
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
                'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n')
        entries = [('/', '1.0', [])] + [(c['path'], '0.8', gallery_images.get(c['path'], [])) for c in PAGES.values()]
        for path, prio, imgs in entries:
            f.write('  <url>\n    <loc>%s%s</loc>\n    <changefreq>monthly</changefreq>\n    <priority>%s</priority>\n' % (SITE, path, prio))
            for u, alt in imgs:
                f.write('    <image:image>\n      <image:loc>%s</image:loc>\n      <image:caption>%s</image:caption>\n    </image:image>\n' % (u, html.escape(alt)))
            f.write('  </url>\n')
        f.write('</urlset>\n')
    return made


if __name__ == '__main__':
    for path, size in build():
        print('%-24s %d KB' % (path, size // 1024))
