export interface BMCMeta {
  version: string;
  date: string;
  status: string;
  title: string;
}

export interface InvestmentRange {
  min: number;
  max: number;
  currency: string;
}

export interface Year1Target {
  clients: number;
  mrr: number;
  profitMargins: number;
  currency: string;
}

export interface ExecutiveSummary {
  description: string;
  businessModelType: string;
  targetMarket: string;
  revenueModel: string;
  investmentRequired: InvestmentRange;
  breakEvenPoint: string;
  year1Target: Year1Target;
}

export interface BMCCanvas {
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: {
    teamSalaries: string;
    contentProduction: string;
    technicalTeam: string;
    leadership: string;
    marketing: string;
    infrastructure: string;
    officeOverhead: string;
    total: string;
  };
  revenueStreams: {
    tier1: {
      name: string;
      priceRange: string;
    };
    tier2: {
      name: string;
      priceRange: string;
    };
    tier3: {
      name: string;
      priceRange: string;
    };
    addOns: string[];
    targetMix: {
      tier1: {
        clients: number;
        avgPrice: number;
        mrr: number;
      };
      tier2: {
        clients: number;
        avgPrice: number;
        mrr: number;
      };
      tier3: {
        clients: number;
        avgPrice: number;
        mrr: number;
      };
      totalMRR: number;
    };
  };
}

export interface Partner {
  name: string;
  description: string;
}

export interface KeyPartners {
  title: string;
  ecommercePlatforms: {
    title: string;
    partners: Partner[];
    role: string;
  };
  marketingAgencies: {
    title: string;
    partners: string[];
  };
  contentPartners: {
    title: string;
    partners: string[];
  };
  technologyPartners: {
    title: string;
    partners: string[];
  };
  benefits: string[];
}

export interface KeyActivity {
  title: string;
  items: string[];
}

export interface KeyActivities {
  title: string;
  activities: KeyActivity[];
}

export interface TeamMember {
  role: string;
  responsibilities: string;
  salaryRange: string;
}

export interface KeyResources {
  title: string;
  humanResources: {
    title: string;
    leadershipTeam: {
      title: string;
      members: TeamMember[];
    };
    technicalTeam: {
      title: string;
      members: string[];
    };
    contentTeam: {
      title: string;
      members: string[];
    };
    salesMarketingTeam: {
      title: string;
      members: string[];
    };
    operationsTeam: {
      title: string;
      members: string[];
    };
    totals: {
      teamSize: string;
      monthlyPayroll: string;
    };
  };
  intellectualResources: {
    title: string;
    authorityBlog: {
      title: string;
      features: string[];
    };
    contentLibrary: {
      title: string;
      features: string[];
    };
    technology: {
      title: string;
      features: string[];
    };
    brandAssets: {
      title: string;
      features: string[];
    };
    proprietarySystems: {
      title: string;
      features: string[];
    };
  };
}

export interface ValueProposition {
  title: string;
  what: string;
  value: string;
  benefit: string;
  uniqueFactor?: string;
  efficiency?: string;
  psychology?: string;
  comparison?: string;
  differentiation?: string;
  target?: string;
  marketFit?: string;
  result?: string;
  reliability?: string;
  addOn?: string;
}

export interface ValuePropositions {
  title: string;
  primary: ValueProposition[];
  summary: {
    smallStores: {
      title: string;
      benefits: string[];
    };
    mediumStores: {
      title: string;
      benefits: string[];
    };
    agenciesEnterprise: {
      title: string;
      benefits: string[];
    };
  };
}

export interface CustomerRelationship {
  type: string;
  percentage: number;
  description: string;
  touchpoints: string[];
  effort: string;
  target: string;
}

export interface CustomerRelationships {
  title: string;
  models: CustomerRelationship[];
  buildingActivities: {
    onboarding: string[];
    ongoingEngagement: string[];
    retention: string[];
    supportChannels: string[];
  };
}

export interface Channels {
  title: string;
  direct: {
    website: {
      title: string;
      features: string[];
    };
    salesTeam: {
      title: string;
      features: string[];
    };
  };
  partner: {
    ecommercePlatforms: {
      title: string;
      features: string[];
    };
    agenciesConsultants: {
      title: string;
      features: string[];
    };
  };
  marketing: {
    paidAdvertising: {
      title: string;
      features: string[];
    };
    contentMarketing: {
      title: string;
      features: string[];
    };
  };
  community: {
    eventsWebinars: {
      title: string;
      features: string[];
    };
    socialMedia: {
      title: string;
      features: string[];
    };
  };
  retention: {
    referralProgram: {
      title: string;
      features: string[];
    };
    upselling: {
      title: string;
      features: string[];
    };
  };
  channelMix: {
    months0to3: {
      phase: string;
      breakdown: Record<string, number>;
    };
    months4to6: {
      phase: string;
      breakdown: Record<string, number>;
    };
    months7to12: {
      phase: string;
      breakdown: Record<string, number>;
    };
  };
}

export interface CustomerSegment {
  id: number;
  name: string;
  characteristics: Record<string, string>;
  painPoints: string[];
  solution: {
    tier: string;
    features: string[];
  };
  target: string;
  examples: string[];
}

export interface CustomerSegments {
  title: string;
  primary: CustomerSegment[];
  secondary: Array<{
    name: string;
    needs?: string;
    requirements?: string;
    focus?: string;
    stage?: string;
    challenges?: string;
    target: string;
  }>;
  prioritization: {
    phase1: {
      months: string;
      focus: string;
      reasons: string[];
    };
    phase2: {
      months: string;
      focus: string;
      reasons: string[];
    };
    phase3: {
      months: string;
      focus: string;
      reasons: string[];
    };
  };
}

export interface CostStructure {
  title: string;
  fixedCosts: {
    teamSalaries: Record<string, any>;
    infrastructure: Record<string, string>;
    overhead: Record<string, string>;
    totalFixed: string;
  };
  variableCosts: {
    marketing: Record<string, string>;
    contentProduction: {
      perArticle: Record<string, string>;
      atScale: Record<string, string | number>;
    };
    salesCommissions: {
      rate: string;
      estimated: string;
    };
    cac: {
      target: string;
      includes: string;
      at20ClientsPerMonth: string;
    };
  };
  totalByPhase: Record<string, any>;
  optimization: {
    efficiency: string[];
    economiesOfScale: string[];
    targetMargins: Record<string, string>;
  };
}

export interface PricingPlan {
  name: string;
  price: number;
  priceUSD?: number;
  currency: string;
  articlesPerMonth: number;
  duration: number;
  features?: string[];
}

export interface RevenueStream {
  name: string;
  price: number;
  features: string[];
  targetPercentage: number;
  targetClients: number;
  targetMRR: number;
}

export interface RevenueStreams {
  title: string;
  subscription: {
    tier1: {
      name: string;
      percentage: number;
      plans: PricingPlan[];
      average: number;
      targetClients: number;
      targetMRR: number;
    };
    tier2: {
      name: string;
      percentage: number;
      plans: PricingPlan[];
      average: number;
      targetClients: number;
      targetMRR: number;
    };
    tier3: {
      name: string;
      percentage: number;
      plans: Array<{
        name: string;
        priceRange: string;
      }>;
      average: number;
      targetClients: number;
      targetMRR: number;
    };
    totalMRR: number;
  };
  addOns: RevenueStream[];
  totalAddOnsMRR: number;
  projections: Record<string, any>;
  characteristics: Record<string, any>;
  financialMetrics: Record<string, any>;
}

export interface FinancialSummary {
  title: string;
  investment: {
    total: InvestmentRange;
    breakdown: Array<{
      phase: string;
      amount: string;
    }>;
  };
  revenueProjections: Array<{
    month: string | number;
    clients: string | number;
    avgPrice: number;
    subscriptionMRR: string | number;
    addOnsMRR: number;
    totalMRR: string | number;
    cumulativeRevenue: string | number;
  }>;
  breakEven: {
    point: string;
    monthlyCosts: string;
    mrrNeeded: number;
    clientsNeeded: string;
    achievedBy: string;
  };
  profitabilityTimeline: Record<string, string>;
}

export interface KeyMetrics {
  title: string;
  business: {
    growth: Record<string, string>;
    financial: Record<string, string>;
    retention: Record<string, string>;
  };
  operational: {
    content: Record<string, string>;
    product: Record<string, string>;
    team: Record<string, string>;
  };
}

export interface CompetitiveAdvantages {
  title: string;
  uniqueValuePropositions: string[];
  moats: {
    technology: string[];
    content: string[];
    networkEffects: string[];
    brand: string[];
  };
}

export interface GrowthPhase {
  phase: number;
  name: string;
  timeline: string;
  goals: string[];
}

export interface GrowthStrategy {
  title: string;
  phases: GrowthPhase[];
  year2Vision: Record<string, string | number>;
}

export interface Risk {
  id: number;
  name: string;
  risk: string;
  mitigation: string;
}

export interface Risks {
  title: string;
  risks: Risk[];
}

export interface Conclusion {
  title: string;
  description: string;
  keyStrengths: string[];
  successFactors: string[];
  expectedOutcome: string;
}

export interface UILabels {
  badge: string;
  printButton: string;
  investmentRequired: string;
  breakEven: string;
  year1TargetClients: string;
  year1MRRTarget: string;
  businessModel: string;
  targetMarket: string;
  revenueModel: string;
  partnershipBenefits: string;
  fixedCosts: string;
  channelMixByStage: string;
  totalFixedCosts: string;
  totalInitialInvestment: string;
  overview: string;
  executiveSummary: string;
  bmcBuildingBlocks: string;
  financialStrategy: string;
}

export interface BMCContent {
  meta: BMCMeta;
  executiveSummary: ExecutiveSummary;
  bmcCanvas: BMCCanvas;
  keyPartners: KeyPartners;
  keyActivities: KeyActivities;
  keyResources: KeyResources;
  valuePropositions: ValuePropositions;
  customerRelationships: CustomerRelationships;
  channels: Channels;
  customerSegments: CustomerSegments;
  costStructure: CostStructure;
  revenueStreams: RevenueStreams;
  financialSummary: FinancialSummary;
  keyMetrics: KeyMetrics;
  competitiveAdvantages: CompetitiveAdvantages;
  growthStrategy: GrowthStrategy;
  risks: Risks;
  conclusion: Conclusion;
  uiLabels: UILabels;
}

