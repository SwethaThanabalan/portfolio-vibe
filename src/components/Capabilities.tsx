const capabilities = [
  {
    label: 'Research',
    items: ['User Interviews', 'Usability Testing', 'Competitive Analysis', 'Research Synthesis', 'Qualitative Research'],
  },
  {
    label: 'Product Design',
    items: ['Product Strategy', 'User Flows', 'Information Architecture', 'Interaction Design', 'Prototyping'],
  },
  {
    label: 'Systems',
    items: ['Design Systems', 'Accessibility', 'Responsive Design', 'Design Handoff'],
  },
  {
    label: 'AI & Prototyping',
    items: ['AI-Assisted Design', 'Rapid Prototyping', 'Vibe Coding', 'Multi-Agent Workflows'],
  },
]

const Capabilities = () => {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="py-16 md:py-24 px-6 md:px-8"
      style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
    >
      <h2
        id="capabilities-heading"
        className="text-2xl md:text-3xl font-semibold mb-10"
        style={{ color: 'var(--text)' }}
      >
        Capabilities
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        {capabilities.map((group) => (
          <div key={group.label}>
            <h3
              className="text-xs font-semibold uppercase tracking-wide mb-4"
              style={{ color: 'var(--muted)' }}
            >
              {group.label}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Capabilities
