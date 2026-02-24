import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'septa-mobile-redesign',
    title: 'SEPTA Mobile App Revamp',
    category: 'Product Design',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
    description: 'Complete redesign of SEPTA\'s mobile app focusing on user experience and accessibility',
    role: 'Product Designer',
    duration: '3 months',
    tools: ['Figma', 'Miro', 'Notion'],
    
    scope: 'Mobile app redesign, map integration, authentication flow',
    methods: 'User interviews, heuristic evaluation, usability testing',
    impact: 'Map-first navigation, biometric login, accessible design system',
    
    openingHook: `I used SEPTA when I lived in Philadelphia. I remember the frustration of being logged out at the exact moment I needed directions.

When we were asked to redesign a real app, this felt personal. Not because it was broken, but because it mattered. Public transit is how people get to work, get home, and get to medical appointments. When the app fails, the consequences are real.

This project clarified what product design means to me: building systems that work for the people who rely on them.`,
    
    problem: `**The Trust Gap**

Through user interviews and testing, we uncovered something deeper than usability issues. People didn't just find the app frustrating—they didn't trust it.

**Login loops:**

Users stuck in endless authentication cycles, getting logged out mid-trip.

**Broken real-time tracking:**

"Real-time" tracking wasn't real-time. Buses showed up late or not at all, with no explanation.

**Confusing navigation:**

Finding a route required hunting through nested menus with unclear labels.

**Accessibility gaps:**

No font controls, poor contrast, no consideration for users with disabilities.

The insight that hit hardest: *every single user* used Google Maps alongside SEPTA. Not by choice—by necessity. The app didn't have an integrated map, so planning a trip meant bouncing between two apps.

This wasn't just a missing feature. It was a signal that the app wasn't designed around how people actually plan trips.`,
    
    researchInsights: [
      {
        activity: 'User interviews with 8 daily commuters',
        insight: '100% of users kept Google Maps open while using SEPTA',
        why: 'The app treated maps as optional, but users think spatially when planning trips'
      },
      {
        activity: 'Heuristic evaluation + usability testing',
        insight: 'Login failures happened in 6 out of 8 test sessions',
        why: 'Authentication wasn\'t just annoying—it was breaking trust in the app\'s reliability'
      },
      {
        activity: 'Affinity mapping of pain points',
        insight: 'Schedule search required 4+ taps and users still couldn\'t find their route',
        why: 'Navigation reflected internal org structure, not user mental models'
      }
    ],
    
    strategicDecision: {
      title: 'Decision 01: Re-centering the Map',
      context: 'Users were bouncing between SEPTA and Google Maps because the app didn\'t support visual trip planning. This wasn\'t just friction—it was a fundamental mismatch between how the app worked and how people think about getting from A to B.',
      options: [
        'Keep current structure, improve UI polish',
        'Add map as a secondary tab or feature',
        'Make the map the primary interaction layer'
      ],
      tradeoffs: 'Making the map primary meant rethinking the entire information architecture. It risked overwhelming users who just wanted a quick schedule lookup. But testing showed that even "quick lookup" users thought spatially first—they wanted to see where they were going, not just read a list.',
      decision: 'Map becomes the core interaction model. Users can search visually or type a destination. Routes, stops, and real-time updates are overlaid on the map, not buried in separate tabs.',
      reasoning: 'People don\'t plan trips by feature category. They think: "I\'m here, I need to get there, what\'s the fastest way?" The map answers that question immediately. Everything else—schedules, alerts, saved routes—supports that primary goal.',
      impact: 'Reduced app-switching behavior. Users could plan, track, and adjust trips without leaving the app. The map wasn\'t just a feature—it became the foundation.'
    },
    
    additionalDecisions: [
      {
        title: 'Decision 02: Fixing Authentication to Restore Trust',
        context: 'Login loops weren\'t just annoying—they were breaking trust. When you\'re rushing to catch a train and the app logs you out, you stop relying on it. This was an infrastructure reliability issue, not a UI problem.',
        decision: 'Implemented biometric login (Face ID/Touch ID) and persistent login toggle. Users stay logged in by default unless they explicitly log out.',
        impact: 'Authentication became invisible. Users could open the app and immediately see their next departure—no friction, no loops, no lost trust.'
      },
      {
        title: 'Decision 03: Simplifying Schedule Navigation',
        context: 'Finding a route required navigating nested menus with labels like "Schedules," "Trip Planner," and "Routes"—terms that meant nothing to users in the moment. Commuters don\'t have time to decode organizational logic.',
        decision: 'Consolidated schedule search into one screen with smart filters (destination, stop, route number) and clearly labeled options. Added predictive search so users could type "City Hall" instead of hunting for route codes.',
        impact: 'Reduced cognitive load during high-stress moments. Users could find their route in 2 taps instead of 4+. The interface matched their urgency.'
      },
      {
        title: 'Accessibility as System, Not Feature',
        context: 'Accessibility was treated as an afterthought—something to "add" if there was time. But designing for edge cases improves the core experience for everyone. High contrast helps in bright sunlight. Larger text helps when you\'re moving. Clear labels help when you\'re distracted.',
        decision: 'Built accessibility into the design system from the start: font size controls, high-contrast modes, simplified icons, and clear visual hierarchy.',
        impact: 'The app became more usable for everyone, not just users with disabilities. Accessibility wasn\'t a checkbox—it was a design principle.'
      }
    ],
    
    designExecution: {
      changes: [
        {
          title: 'Map-first navigation',
          before: 'Map buried in secondary tab, users forced to use Google Maps',
          after: 'Interactive map as primary screen with route overlay and real-time updates',
          rationale: 'Matched how users actually think about trip planning—spatially, not categorically'
        },
        {
          title: 'Authentication flow',
          before: 'Frequent logouts, no biometric option, manual re-entry required',
          after: 'Face ID/Touch ID login, persistent session, optional stay-logged-in toggle',
          rationale: 'Removed friction at the moment users needed the app most—when they were rushing'
        },
        {
          title: 'Schedule search',
          before: '4+ taps through nested menus, unclear labels, no search',
          after: 'Single search screen with filters, predictive text, and clear route labels',
          rationale: 'Reduced cognitive load and matched commuter urgency'
        }
      ],
      removed: [
        'Nested menu structure that reflected org chart, not user needs',
        'Separate "Schedules" vs "Trip Planner" distinction (users saw them as one task)',
        'Manual route code entry (replaced with predictive search)'
      ]
    },
    
    outcome: {
      metrics: [
        'Map integration: Primary interaction layer vs. buried secondary tab',
        'Authentication: Biometric login + persistent session vs. manual re-entry',
        'Schedule search: 2 taps vs. 4+ taps through nested menus',
        'Accessibility: Built-in system vs. afterthought features'
      ],
      validation: [
        'Team selected my wireframe as foundation for final prototype',
        'Usability testing: Users could plan trips without leaving the app',
        'Design decisions aligned with real user mental models, not organizational structure'
      ],
      marketValidation: `Shortly after our project, SEPTA launched a revamped mobile app with the exact features we identified: biometric authentication, map integration, predictive search, and improved accessibility controls.

This wasn't coincidence. It was confirmation that our research uncovered real needs.`,
      limitations: 'This was a student project without access to SEPTA\'s backend systems or usage analytics. In a real-world rollout, I\'d prioritize inclusive research from day one—especially with users who have disabilities.'
    },
    
    reflection: {
      title: 'What This Project Changed About How I Design',
      worked: 'Challenging my own assumptions. If users miss something, that\'s on the design, not them. That mindset shift changed everything.',
      improve: 'I wish we\'d included more diverse users, especially people with disabilities. Accessibility has to be baked in from the start.',
      learned: `**Trust is infrastructure.**

Good design isn't about making things look cool—it's about making systems dependable. Public transit apps aren't just interfaces. They're promises.

I learned that:
- **Trust is built through reliability, not features.** Biometric login mattered more than any visual redesign.
- **Infrastructure UX is invisible until it breaks.** Authentication, real-time data, and map integration aren't "nice-to-haves"—they're the foundation.
- **Designing under constraints forces clarity.** We couldn't rebuild SEPTA's backend, so we focused on what we could control: the interface, the flow, and the mental model.
- **Empathy isn't enough—you have to challenge assumptions.** Including your own.

Seeing SEPTA launch similar features confirmed everything we worked on. It reminded me that listening to users and designing with empathy really do matter.`
    },
    
    overview: 'Led the complete redesign of SEPTA\'s mobile app, focusing on the core rider journey: planning trips and tracking transit in real-time.',
    challenge: 'Users were forced to use Google Maps alongside SEPTA because the app didn\'t support visual trip planning. Authentication loops, confusing navigation, and broken real-time tracking eroded trust.',
    solution: 'Made the map the primary interaction layer, implemented biometric authentication, simplified schedule search, and built accessibility into the design system from the start.',
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop'
    ],
    
    figmaPrototype: 'https://www.figma.com/proto/FaA1DS79ODBfK107gFoTdr/SEPTA?node-id=72-1720&t=aILOa7a9VXODYsvr-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=72%3A1720&embed-host=share',
    figmaFile: 'https://www.figma.com/design/FaA1DS79ODBfK107gFoTdr/SEPTA?node-id=0-1&t=aILOa7a9VXODYsvr-1'
  },
  {
    id: 'ecommerce-redesign',
    title: 'E-Commerce Platform Redesign',
    category: 'Product Design',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    description: 'Complete redesign of a major e-commerce platform focusing on user experience and conversion optimization',
    role: 'Lead Product Designer',
    duration: '6 months',
    tools: ['Figma', 'Protopie', 'Maze', 'Analytics'],
    overview: 'Led the complete redesign of an e-commerce platform serving 2M+ users.',
    challenge: 'The existing platform had a 68% cart abandonment rate and users struggled with product discovery.',
    solution: 'Implemented a card-based design system, simplified checkout flow from 5 steps to 3, and introduced smart product recommendations.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop'
    ]
  },
  {
    id: 'health-app',
    title: 'Mental Health Companion App',
    category: 'UX Design',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    description: 'Mobile app designed to help users track mood, practice mindfulness, and connect with mental health professionals',
    role: 'UX Designer',
    duration: '4 months',
    tools: ['Figma', 'Principle', 'UserTesting', 'Miro'],
    overview: 'Designed a compassionate mental health app that makes therapy accessible and removes stigma.',
    challenge: 'Mental health apps often feel clinical or overwhelming. Users needed something that felt safe, private, and genuinely helpful.',
    solution: 'Created a warm, approachable interface with gentle colors and micro-interactions. Implemented progressive disclosure to avoid overwhelming users.',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576091160501-bbe57469c5c1?w=1200&h=800&fit=crop'
    ]
  },
  {
    id: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    category: 'Product Design',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    description: 'Enterprise dashboard for financial analysts to monitor market trends and portfolio performance',
    role: 'Senior Product Designer',
    duration: '8 months',
    tools: ['Figma', 'D3.js', 'Optimal Workshop', 'Hotjar'],
    overview: 'Built a comprehensive analytics platform for financial professionals managing portfolios worth $500M+.',
    challenge: 'Financial analysts needed to monitor hundreds of data points simultaneously.',
    solution: 'Designed a customizable dashboard with real-time data visualization, smart alerts, and AI-powered insights.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop'
    ]
  },
  {
    id: 'education-platform',
    title: 'Online Learning Platform',
    category: 'UX Design',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    description: 'Interactive learning platform connecting students with educators through live and recorded sessions',
    role: 'UX Designer',
    duration: '5 months',
    tools: ['Sketch', 'InVision', 'Lookback', 'Dovetail'],
    overview: 'Created an engaging online learning experience for K-12 students.',
    challenge: 'Students struggled with engagement in virtual learning. Teachers needed better tools to assess understanding.',
    solution: 'Designed interactive lesson formats with gamification elements, real-time collaboration tools, and adaptive learning paths.',
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop'
    ]
  }
];
