import type { Project } from '../types';

export const projects: Project[] = [
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
    overview: 'Led the complete redesign of an e-commerce platform serving 2M+ users. The project aimed to modernize the interface, improve navigation, and increase conversion rates.',
    challenge: 'The existing platform had a 68% cart abandonment rate and users struggled with product discovery. Mobile experience was particularly poor with only 12% of traffic converting.',
    solution: 'Implemented a card-based design system, simplified checkout flow from 5 steps to 3, and introduced smart product recommendations. Added persistent cart and one-click checkout for returning users.',
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
    overview: 'Designed a compassionate mental health app that makes therapy accessible and removes stigma. The app combines mood tracking, guided meditation, and professional support.',
    challenge: 'Mental health apps often feel clinical or overwhelming. Users needed something that felt safe, private, and genuinely helpful without adding to their stress.',
    solution: 'Created a warm, approachable interface with gentle colors and micro-interactions. Implemented progressive disclosure to avoid overwhelming users. Added anonymous community features and crisis support.',
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
    overview: 'Built a comprehensive analytics platform for financial professionals managing portfolios worth $500M+. The dashboard needed to display complex data clearly while enabling quick decision-making.',
    challenge: 'Financial analysts needed to monitor hundreds of data points simultaneously. The existing system required multiple screens and manual data correlation, leading to missed opportunities.',
    solution: 'Designed a customizable dashboard with real-time data visualization, smart alerts, and AI-powered insights. Implemented drag-and-drop widgets and saved views for different use cases.',
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
    overview: 'Created an engaging online learning experience for K-12 students. The platform needed to work seamlessly for both live classes and self-paced learning.',
    challenge: 'Students struggled with engagement in virtual learning. Teachers needed better tools to assess understanding and provide personalized feedback at scale.',
    solution: 'Designed interactive lesson formats with gamification elements, real-time collaboration tools, and adaptive learning paths. Added parent dashboard for progress monitoring.',
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop'
    ]
  }
];
