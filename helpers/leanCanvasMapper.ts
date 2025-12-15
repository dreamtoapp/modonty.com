import type { BMCContent } from "@/lib/bmc-types";
import type { FinanceData } from "@/helpers/financialCalculations";

export interface LeanCanvasData {
  problem: string[];
  customerSegments: string[];
  uniqueValueProposition: string[];
  solution: string[];
  channels: string[];
  revenueStreams: {
    pricingModel?: string;
    plans?: Array<{
      name: string;
      price: number;
      priceType?: string;
      currency?: string;
    }>;
    targetMix?: {
      totalMRR: number;
    };
  };
  costStructure: {
    total: string;
  };
  keyMetrics: {
    cac?: string;
    ltv?: string;
    ltvCacRatio?: string;
    churnRate?: string;
    paybackPeriod?: string;
  };
  unfairAdvantage: string[];
}

export function mapBMCToLeanCanvas(
  bmcContent: BMCContent,
  finance: FinanceData
): LeanCanvasData {
  // Extract top 3 problems from customer segments pain points
  const allPainPoints: string[] = [];
  bmcContent.customerSegments.primary.forEach((segment) => {
    allPainPoints.push(...segment.painPoints);
  });
  const problem = [...new Set(allPainPoints)].slice(0, 3);

  // Customer Segments - same as BMC
  const customerSegments = bmcContent.bmcCanvas.customerSegments;

  // Unique Value Proposition - from value propositions
  const uniqueValueProposition = bmcContent.bmcCanvas.valuePropositions;

  // Solution - top 3 from value propositions or key activities
  const solution = bmcContent.valuePropositions.primary
    .slice(0, 3)
    .map((vp) => vp.title);

  // Channels - same as BMC
  const channels = bmcContent.bmcCanvas.channels;

  // Revenue Streams - same as BMC
  const revenueStreams = bmcContent.bmcCanvas.revenueStreams;

  // Cost Structure - same as BMC
  const costStructure = bmcContent.bmcCanvas.costStructure;

  // Key Metrics - from finance data
  const metrics = finance.metrics as any;
  const keyMetrics = {
    cac: metrics?.cac?.value
      ? `${metrics.cac.value} ${metrics.cac.currency || finance.currency || "SAR"}`
      : undefined,
    ltv: metrics?.ltv?.value
      ? `${metrics.ltv.value} ${metrics.ltv.currency || finance.currency || "SAR"}`
      : undefined,
    ltvCacRatio: metrics?.ltvCacRatio?.value || undefined,
    churnRate: metrics?.churn?.rate
      ? `${(metrics.churn.rate * 100).toFixed(1)}%`
      : undefined,
    paybackPeriod: metrics?.cac?.paybackPeriod
      ? `${metrics.cac.paybackPeriod}`
      : undefined,
  };

  // Unfair Advantage - from competitive advantages moats
  const unfairAdvantage: string[] = [];
  if (bmcContent.competitiveAdvantages.moats.technology.length > 0) {
    unfairAdvantage.push(
      `Technology: ${bmcContent.competitiveAdvantages.moats.technology[0]}`
    );
  }
  if (bmcContent.competitiveAdvantages.moats.content.length > 0) {
    unfairAdvantage.push(
      `Content: ${bmcContent.competitiveAdvantages.moats.content[0]}`
    );
  }
  if (bmcContent.competitiveAdvantages.moats.networkEffects.length > 0) {
    unfairAdvantage.push(
      `Network Effects: ${bmcContent.competitiveAdvantages.moats.networkEffects[0]}`
    );
  }
  if (bmcContent.competitiveAdvantages.moats.brand.length > 0) {
    unfairAdvantage.push(
      `Brand: ${bmcContent.competitiveAdvantages.moats.brand[0]}`
    );
  }

  return {
    problem,
    customerSegments,
    uniqueValueProposition,
    solution,
    channels,
    revenueStreams,
    costStructure,
    keyMetrics,
    unfairAdvantage,
  };
}










