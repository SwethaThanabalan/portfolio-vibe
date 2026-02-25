export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  thumbnail: string;
  description: string;
  role: string;
  duration: string;
  tools: string[];
  overview: string;
  challenge: string;
  solution: string;
  images: string[];
  
  // Strategic case study fields
  scope?: string;
  methods?: string;
  impact?: string;
  openingHook?: string;
  problem?: string;
  researchInsights?: Array<{
    activity: string;
    insight: string;
    why: string;
  }>;
  strategicDecision?: {
    title: string;
    context: string;
    options: string[];
    tradeoffs: string;
    decision: string;
    reasoning: string;
    impact: string;
  };
  additionalDecisions?: Array<{
    title: string;
    context: string;
    decision: string;
    impact: string;
  }>;
  designExecution?: {
    changes: Array<{
      title: string;
      before: string;
      after: string;
      rationale: string;
    }>;
    removed: string[];
  };
  outcome?: {
    metrics: string[];
    validation: string[];
    marketValidation: string;
    limitations: string;
  };
  reflection?: {
    learned: string;
  };
  figmaPrototype?: string;
  figmaFile?: string;
}
