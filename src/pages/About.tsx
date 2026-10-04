import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import AnimatedSection from '../components/AnimatedSection'
import ImageStack from '../components/ImageStack'

/* ═══════════════════════════════════════════════════════════════
   ABOUT — editorial system matching case studies
═══════════════════════════════════════════════════════════════ */

const skills = [
  {
    label: 'Communication & Photography',
    status: 'BSc Communication · Advanced Photography, 2016–2020',
    text: 'Studied communication in Chennai, then advanced photography at Fanshawe. Photography taught me to look closely and to see how framing, light, and composition change what people notice.',
  },
  {
    label: 'Public Relations & Marketing',
    status: 'PR postgrad + marketing/SEO roles, 2021–2022',
    text: 'A PR postgrad, then marketing and SEO work at Big Brothers Big Sisters, Beauty First Spa, and RATESDOTCA. I learned how people find things, judge them, and make decisions, and how wording shapes first impressions.',
  },
  {
    label: 'Freelance Photography',
    status: 'Self-employed, 2021–2024 · still shooting',
    text: 'Ran my own photography business shooting corporate headshots, events, and product campaigns, working directly with clients and adapting to brand guidelines.',
  },
  {
    label: 'HCI at Drexel University',
    status: "Master's, 2024–present",
    text: 'My formal design training: research methods, problem framing, and validation. It also taught me that design is mostly about decisions rather than screens.',
  },
  {
    label: 'Product Design',
    status: 'Talofa, Adult You',
    text: 'At Talofa and Adult You I used all of it: research fed strategy, strategy shaped the interface, and my photography and marketing background helped along the way.',
  },
]

const faqs = [
  {
    q: 'What roles are you looking for?',
    a: 'Product Designer, UX Designer, or Visual Designer.',
  },
  {
    q: 'What tools do you use?',
    a: 'Figma is home base, with Figma Make for quick prototypes. When I build design systems I pair Figma with Claude MCP. GPT is where I work out prompts, and Kiro is what I use to build a product end to end. For testing and research I reach for Google Forms, Qualtrics, and Maze.',
  },
  {
    q: 'What design methods do you use?',
    a: 'Mostly user research, journey maps, personas, and user flows, then testing those flows with people. I lean on AI to iterate faster between rounds.',
  },
  {
    q: 'How do you work with AI?',
    a: 'I design products that use AI, and I use AI to build them. GPT helps me think through prompts, Kiro takes me from design to a working build, and Claude MCP inside Figma helps me stand up design systems. When a design needs another pass, AI helps me get there quicker.',
  },
  {
    q: 'What is your background?',
    a: 'A master\'s in Human-Computer Interaction from Drexel, and before that, years in photography, communication, and marketing.',
  },
]

// Photography: files live in /public/Photography (resized for web; originals kept offline).
// Alt text describes what is visible, for screen readers and search engines.
const photos: { file: string; alt: string }[] = [
  { file: 'DSC08218.jpg', alt: 'Green ridged mountains under a blue sky, landscape photography' },
  { file: 'DSC02825.jpg', alt: 'Studio headshot of a smiling woman against a teal backdrop' },
  { file: 'Portraits 20.jpg', alt: 'Studio portrait of a man in glasses and a dark suit, arms crossed' },
  { file: 'Thai curry final.jpg', alt: 'Thai curry served in a coconut shell, food photography' },
  { file: 'DSC08108.jpg', alt: 'Lawn and low building at the foot of green mountains, landscape photography' },
  { file: 'Abstract.jpg', alt: 'Abstract close-up of red and purple sandstone canyon walls' },
  { file: 'Portraits 4.jpg', alt: 'Studio portrait of a man in a black jacket and grey turtleneck' },
  { file: 'Grilled Provimi Veal Chop.jpg', alt: 'Grilled veal chop plated with sauce and garnish, food photography' },
  { file: 'DSC02188.jpg', alt: 'Professional headshot of a woman in a grey blazer' },
  { file: 'DSC08235.jpg', alt: 'Sunlit green mountain ridgeline with clouds, landscape photography' },
  { file: 'Best ohio.jpg', alt: 'Rolling green farmland with a wooden fence in Ohio, landscape photography' },
  { file: 'Paneer 06-022108.jpg', alt: 'Paneer curry in a silver bowl with naan, styled food photography' },
  { file: 'March12th1135 1.jpg', alt: 'Crispy fritters beside fresh green chilies on a dark surface, food photography' },
  { file: 'Ocean Wise Rainbow Trout Fillet 2.jpg', alt: 'Rainbow trout fillet plated in a golden sauce, food photography' },
  { file: 'food photo 2020.jpg', alt: 'Stack of jam-topped cookies beside a pitcher of milk, food photography' },
  { file: '947220-1 Sticky rice.jpg', alt: 'Sushi rolls on a wooden board with chopsticks, food photography' },
  { file: 'Hair dryer0389.jpg', alt: 'Black hair dryer on a dark background, product photography' },
]

// Graphic design: images live in /public/Graphic and render inline.
const graphics: { file: string; title: string }[] = [
  { file: 'Poster sahana.jpg', title: 'Yoga classes poster' },
  { file: 'welcome.jpg', title: 'Baby shower welcome sign' },
  { file: 'posterize and invert.jpg', title: 'Posterize and invert photo treatment of a vintage car' },
  { file: 'Thanabalan_editorial _Page_1.jpg', title: 'Editorial cover: Spring 2021 community events' },
  { file: 'Thanabalan_editorial _Page_2.jpg', title: 'Editorial spread: library events listing' },
  { file: 'Thanabalan_Newsads_Page_1.jpg', title: 'News ad: Invest in Canada\'s Future, donation appeal' },
  { file: 'Thanabalan_Newsads_Page_2.jpg', title: 'News ad: Invest in Canada\'s Future, alternate layout' },
  { file: 'Thanabalan_digitalmailpostcard_Page_1.jpg', title: 'Postcard front: COVID-19 vaccine' },
  { file: 'Thanabalan_digitalmailpostcard_Page_2.jpg', title: 'Postcard back: immunization clinic details' },
]

const principles = [
  {
    title: 'Structure before polish',
    text: 'I define the problem and test my assumptions before I polish the visuals.',
  },
  {
    title: 'Research is for making decisions',
    text: 'I do research to lower risk, test assumptions, and make recommendations I can defend.',
  },
  {
    title: 'AI speeds up the work; the thinking is mine',
    text: 'I use AI tools to explore faster. The judgment and the decisions stay with me.',
  },
  {
    title: 'Empathy takes practice',
    text: 'Understanding users means asking uncomfortable questions and questioning your own assumptions.',
  },
]

const About = () => {
  const [heroVisible, setHeroVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setHeroVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--bg)] overflow-x-hidden">
      <SEO
        title="About Swetha Thanabalan | Product Designer"
        description="Product Designer with an HCI background and a foundation in photography, communication, and marketing, working across user research, interaction design, prototyping, and AI-assisted product development."
        path="/about"
      />
      <Navbar />

      <main id="main-content" className="pt-32 pb-32">

        {/* HERO */}
        <section className="layout-content mb-20">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-3">
              <p className={`type-eyebrow mb-4 transition-all duration-700 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
                About Swetha Thanabalan
              </p>
              <h1
                className={`type-h1 mb-6 transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                A product designer who has worked on how products get noticed, understood, and chosen.
              </h1>
              <p className={`type-lead transition-all duration-1000 delay-200 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                I shoot professionally, worked in marketing and SEO, and trained in HCI, so I've worked on each step of how people find a product, understand it, and decide to use it.
              </p>
            </div>
            <div className={`md:col-span-2 transition-all duration-1000 delay-300 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <figure>
                <img
                  src="/PortfolioPictureswetha.jpg"
                  alt="Swetha Thanabalan"
                  className="w-full border border-[var(--border)]"
                  style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                  loading="eager"
                />
                <figcaption className="type-caption mt-3">Product designer, photographer, and marketer</figcaption>
              </figure>
            </div>
          </div>
        </section>


        {/* THE THROUGH-LINE */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-6">My background</h2>
            <div className="text-flow type-body-lg">
              <p>I shot professionally for paying clients, including corporate headshots, events, and product campaigns, working to brand guidelines and deadlines. That's where my visual design comes from.</p>
              <p>I also ran marketing and SEO at companies including RATESDOTCA and Beauty First Spa, so I know how people find a product, compare it with others, and decide. I keep adoption in mind alongside usability.</p>
              <p>My HCI master's at Drexel gave me research methods to test those instincts, and I've used them in product design work at Talofa and Adult You.</p>
            </div>
          </AnimatedSection>
        </section>


        {/* SKILLS THAT CONVERGE */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-3">Experience</h2>
            <p className="type-body-lg mb-8">Work I've done in each area, which I draw on as a product designer.</p>
          </AnimatedSection>

          <div className="space-y-6">
            {skills.map((s, i) => (
              <AnimatedSection key={s.label} animation="fade-up" delay={i * 80}>
                <div className="grid md:grid-cols-4 gap-4 md:gap-8 border-l-4 pl-6" style={{ borderLeftColor: i === skills.length - 1 ? 'var(--accent)' : 'var(--border)' }}>
                  <div className="md:col-span-1">
                    <p className="type-body font-medium mb-1">{s.label}</p>
                    <p className="type-meta-label">{s.status}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="type-body">{s.text}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>


        {/* PHOTOGRAPHY */}
        <section className="layout-content mb-20" aria-labelledby="photography-heading">
          <AnimatedSection animation="fade-up">
            <h2 id="photography-heading" className="type-h2 mb-3">Photography</h2>
            <p className="type-body-lg mb-8">
              Commercial and personal work. When I shoot, I ask what I ask of a product: does it have the effect I intended?
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={80}>
            <ImageStack
              label="Photography work"
              images={photos.map((p) => ({ src: `/Photography/${encodeURIComponent(p.file)}`, title: p.alt }))}
            />
          </AnimatedSection>
        </section>


        {/* GRAPHIC DESIGN */}
        <section className="layout-content mb-20" aria-labelledby="graphic-design-heading">
          <AnimatedSection animation="fade-up">
            <h2 id="graphic-design-heading" className="type-h2 mb-3">Graphic design</h2>
            <p className="type-body-lg mb-8">
              Posters, editorial layouts, ads, and brand assets from my communication and marketing work.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={80}>
            <ImageStack
              label="Graphic design work"
              images={graphics.map((g) => ({ src: `/Graphic/${encodeURIComponent(g.file)}`, title: g.title }))}
            />
          </AnimatedSection>
        </section>


        {/* HOW I THINK */}
        <section className="bg-surface py-14 mb-20">
          <div className="layout-content">
            <AnimatedSection animation="fade-up">
              <h2 className="type-h2 mb-6">How I think</h2>
              <div className="text-flow type-body-lg">
                <p>During an internship, my mentor encouraged me to talk about the rough patches, what failed, what changed, and why decisions were made, instead of focusing only on polished outcomes. That changed how I present my work.</p>
                <p>Empathy is one of my strengths as a designer. I ask a lot of follow-up questions, look for patterns in behavior, and try to find the cause of a problem.</p>
                <p>Having worked in India, Canada, and the United States, I'm interested in how people from different backgrounds experience the same product differently.</p>
              </div>
            </AnimatedSection>
          </div>
        </section>


        {/* WHAT I BELIEVE */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <h2 className="type-h2 mb-8">What I believe</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <AnimatedSection key={p.title} animation="fade-up" delay={i * 80}>
                <div className="border-l-4 border-indigo-300 pl-5 py-2">
                  <h3 className="type-h3 mb-2">{p.title}</h3>
                  <p className="type-body">{p.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>


        {/* TODAY */}
        <section className="layout-content mb-20">
          <AnimatedSection animation="fade-up">
            <blockquote className="type-quote">
              I can research a product, design it, make it look good, and think about how people will come to use it.
            </blockquote>
          </AnimatedSection>
        </section>


        {/* FAQ */}
        <section className="layout-content mb-20">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Left: heading */}
            <div className="md:col-span-2">
              <AnimatedSection animation="fade-up">
                <h2 className="type-h2 mb-3">Quick answers</h2>
                <p className="type-body">Short answers for recruiters and hiring managers. Tap a question to expand it.</p>
              </AnimatedSection>
            </div>

            {/* Right: click-to-expand accordion */}
            <div className="md:col-span-3">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i
                return (
                  <AnimatedSection key={f.q} animation="fade-up" delay={i * 60}>
                    <div className="border-t border-[var(--border)] last:border-b">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${i}`}
                          id={`faq-question-${i}`}
                          className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--accent)]"
                        >
                          <span className="type-h3">{f.q}</span>
                          <svg
                            className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </h3>
                      <div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{ maxHeight: isOpen ? '260px' : '0', opacity: isOpen ? 1 : 0 }}
                      >
                        <p className="type-body pb-5">{f.a}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="layout-content">
          <AnimatedSection animation="fade-up">
            <div className="border-t border-[var(--border)] pt-12">
              <p className="type-body-lg mb-8">
                If you're hiring a product designer, I'd like to hear from you.
              </p>
              <a
                href="mailto:tys.swetha@gmail.com"
                className="group inline-flex items-center gap-3 type-h3 text-[var(--text)] transition-colors duration-300 hover:text-[var(--accent)]"
              >
                <span>tys.swetha@gmail.com</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default About
