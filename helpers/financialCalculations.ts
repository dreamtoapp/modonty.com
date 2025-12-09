export interface CostItem {
  label: string;
  amount: number;
  category?: string;
  details?: string;
  note?: string;
}

export interface CostCategory {
  key: string;
  label: string;
  items: CostItem[];
}

export interface CostsData {
  currency: string;
  period: string;
  categories: CostCategory[];
  notes?: string[];
}

export interface CostsTotals {
  total: number;
  byCategory: Record<string, number>;
}

export interface PricingPlan {
  name: string;
  annualPrice: number;
  currency: string;
  articlesPerMonth?: number;
}

export interface FinanceData {
  currency: string;
  period: string;
  lastUpdated?: string;
  version?: string;
  costs: {
    fixed: {
      leadership: CostCategory & { total?: number; note?: string };
      technical: CostCategory & { total?: number; note?: string };
      content: CostCategory & { total?: number; note?: string };
      marketingSales: CostCategory & { total?: number; note?: string };
      operations: CostCategory & { total?: number; note?: string };
      infrastructure: CostCategory & { total?: number; note?: string };
      overhead: CostCategory & { total?: number; note?: string };
    };
    variable: {
      marketing: CostCategory & { total?: number; note?: string };
    };
    totalMonthly: {
      fixed: number;
      variable: number;
      base: number;
      note?: string;
    };
    byPhase: {
      launch: { 
        months: string; 
        leadership?: number; 
        technical?: number; 
        content?: number; 
        marketingSales?: number; 
        operations?: number; 
        team?: number; 
        marketingTeam?: number; 
        infrastructure: number; 
        marketing: number; 
        overhead: number; 
        total: number; 
        note?: string 
      };
      growth: { 
        months: string; 
        leadership?: number; 
        technical?: number; 
        content?: number; 
        marketingSales?: number; 
        operations?: number; 
        team?: number; 
        marketingTeam?: number; 
        infrastructure: number; 
        marketing: number; 
        overhead: number; 
        total: number; 
        note?: string 
      };
      scale: { 
        months: string; 
        leadership?: number; 
        technical?: number; 
        content?: number; 
        marketingSales?: number; 
        operations?: number; 
        team?: number; 
        marketingTeam?: number; 
        infrastructure: number; 
        marketing: number; 
        overhead: number; 
        total: number; 
        note?: string 
      };
    };
  };
  revenue: {
    pricingPlans: Array<PricingPlan & { contentDuration?: number; monthlyRecognizedRevenue?: number; description?: string }>;
    clientDistribution: {
      basic: { percentage: number; annualPrice: number; monthlyRecognizedRevenue: number };
      standard: { percentage: number; annualPrice: number; monthlyRecognizedRevenue: number };
      pro: { percentage: number; annualPrice: number; monthlyRecognizedRevenue: number };
      premium: { percentage: number; annualPrice: number; monthlyRecognizedRevenue: number };
    };
    averageMonthlyPerClient: number; // Recognized revenue (over 18 months)
    averageMonthlyCashFlowPerClient?: number; // Cash flow (annual price ÷ 12 months)
    averageAnnualPrice: number;
    recognitionModel?: {
      paymentPeriod: number;
      recognitionPeriod: number;
      monthlyRecognitionRate: number;
      description?: string;
    };
    year1Target: {
      clients: number;
      monthlyRecognizedRevenue: number;
      annualRevenue?: number;
      profitMargins?: number;
      currency?: string;
    };
    projections?: Array<{
      month: string | number;
      clients: string | number;
      avgMonthlyRecognizedRevenue?: number;
      monthlyRecognizedRevenue: string | number;
      annualRevenueCollected?: string | number;
      cumulativeAnnualRevenue?: string | number;
      note?: string;
    }>;
    addOns?: {
      potentialServices?: Array<{ name: string; price: number; currency: string; note?: string }>;
      adoptionRate?: number;
      note?: string;
    };
  };
  metrics?: {
    cac?: { target: number; range: [number, number]; currency?: string; paybackPeriod?: string; note?: string };
    ltv?: { value: number; currency?: string; avgLifetime?: string; calculation?: string; note?: string };
    ltvCacRatio?: { value: string; range?: string; calculation?: string; note?: string };
    margins?: {
      gross?: { contentProduction?: string; platformSaaS?: string; blended?: string; note?: string };
      net?: { month12?: string; year2?: string; note?: string };
    };
    churn?: { target?: string; monthly?: string; industryBenchmark?: string; retentionStrategy?: string; note?: string };
    growth?: {
      monthlyRecognizedRevenueGrowth?: { months1to3?: string; months4to6?: string; months7to12?: string };
      newClientsPerWeek?: string;
      clientCountMonth12?: number;
    };
  };
  investment?: {
    total: { min: number; max: number; currency?: string };
    breakdown: Array<{ phase: string; amount: number; description?: string; currency?: string }>;
    useOfFunds?: Record<string, string>;
  };
  breakEven?: {
    monthlyCosts?: number; // Optional - calculated dynamically
    avgRevenuePerClient?: number; // Optional - from revenue.averageMonthlyPerClient
    clientsNeeded?: number; // Optional - calculated dynamically
    calculation?: string; // Optional - for reference only
    point?: string;
    achievedBy?: string;
    note?: string;
  };
  profitability?: {
    timeline?: Array<{ phase: string; status: string; cashFlow: string; margins?: string; note?: string }>;
    milestones?: Array<{ month: number; milestone: string; mrr: string; note?: string }>;
  };
  cashFlow?: {
    model?: string;
    description?: string;
    advantages?: string[];
    deferredRevenue?: { description?: string; recognitionRate?: string; note?: string };
  };
  notes?: string[];
}

export function calculateTotals(costs: CostsData): CostsTotals {
  const byCategory: Record<string, number> = {};
  let total = 0;

  for (const category of costs.categories) {
    const catTotal = category.items.reduce((sum, item) => sum + item.amount, 0);
    byCategory[category.key] = catTotal;
    total += catTotal;
  }

  return { total, byCategory };
}

export function formatCurrency(amount: number, currency: string): string {
  // If currency is SAR (default), return formatted number without currency symbol
  if (currency === "SAR") {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  // For other currencies, include currency symbol
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateBreakEvenClients(
  costs: CostsData,
  averageMonthlyRevenuePerClient: number
): number | null {
  const { total } = calculateTotals(costs);
  if (!averageMonthlyRevenuePerClient) return null;
  return Math.ceil(total / averageMonthlyRevenuePerClient);
}

export function calculateCategoryTotal(items: Array<{ amount: number }>): number {
  return items.reduce((sum, item) => sum + (item.amount || 0), 0);
}

export function calculateFinanceTotals(finance: FinanceData): CostsTotals {
  const byCategory: Record<string, number> = {};
  let total = 0;

  // Calculate fixed costs - always from items, never from hardcoded total
  const fixedCategories = [
    { key: "leadership", data: finance.costs.fixed.leadership },
    { key: "technical", data: finance.costs.fixed.technical },
    { key: "content", data: finance.costs.fixed.content },
    { key: "marketing-sales", data: finance.costs.fixed.marketingSales },
    { key: "operations", data: finance.costs.fixed.operations },
    { key: "infrastructure", data: finance.costs.fixed.infrastructure },
    { key: "overhead", data: finance.costs.fixed.overhead },
  ];

  for (const { key, data } of fixedCategories) {
    // Always calculate from items dynamically
    const catTotal = calculateCategoryTotal(data.items);
    byCategory[key] = catTotal;
    total += catTotal;
  }

  // Calculate variable costs (base amounts only, not percentage-based)
  const variableCategories = [
    { key: "marketing", data: finance.costs.variable.marketing },
  ];

  for (const { key, data } of variableCategories) {
    // Always calculate from items dynamically
    const catTotal = calculateCategoryTotal(data.items);
    byCategory[key] = catTotal;
    total += catTotal;
  }

  return { total, byCategory };
}

export function calculateBreakEvenFromFinance(finance: FinanceData): {
  clientsPerYear: number;
  clientsPerMonth: number;
  monthlyCosts: number;
  annualCosts: number;
  annualPricePerClient: number;
} | null {
  // Always calculate dynamically from actual costs (ignore hardcoded JSON values)
  // Break-even calculation for ANNUAL subscription model:
  // Clients pay annually upfront (3,999 SAR), so we calculate:
  // 1. Annual expenses = Monthly expenses × 12
  // 2. Clients needed per YEAR = Annual expenses ÷ Annual subscription price
  // 3. Clients needed per MONTH (to acquire) = Clients per year ÷ 12
  // Uses STANDARD plan price (3,999 SAR) for break-even calculation
  const totals = calculateFinanceTotals(finance);
  const monthlyCosts = totals.total; // Total monthly costs (fixed + variable)
  const annualCosts = monthlyCosts * 12; // Annual expenses
  
  // Use STANDARD plan price (3,999 SAR) - clients pay this annually upfront
  const standardPlanPrice = finance.revenue.clientDistribution?.standard?.annualPrice || 3999;
  
  if (!standardPlanPrice || !monthlyCosts) return null;
  
  // Calculate: Annual Expenses ÷ Annual Subscription Price = Clients Needed Per Year
  const clientsPerYear = Math.ceil(annualCosts / standardPlanPrice);
  
  // Clients needed per month (to acquire) = Clients per year ÷ 12
  const clientsPerMonth = clientsPerYear / 12;
  
  return {
    clientsPerYear,
    clientsPerMonth,
    monthlyCosts,
    annualCosts,
    annualPricePerClient: standardPlanPrice,
  };
}

