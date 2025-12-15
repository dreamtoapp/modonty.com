import type { BMCContent } from "@/lib/bmc-types";
import "../print.css";
import { CanvasSectionClient } from "@/components/bmc/CanvasSectionClient";
import { NoFinanceDataAlert } from "@/components/admin/NoFinanceDataAlert";
import { NoBMCDataAlert } from "@/components/admin/NoBMCDataAlert";
import { getFinanceData } from "@/lib/finance-data";
import { getSourceOfIncome, getSourcesOfIncome } from "@/actions/sourceOfIncome";
import { SourceOfIncomeType } from "@prisma/client";
import { BMCMetricsClient } from "@/components/bmc/BMCMetricsClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBMCCanvas } from "@/actions/bmcCanvas";

// Force dynamic rendering to ensure fresh data from database
export const dynamic = 'force-dynamic';

async function getBMCContent(locale: string): Promise<BMCContent> {
  if (locale === 'ar') {
    const arContent = await import("@/lib/bmc-content-ar.json");
    return arContent.default as unknown as BMCContent;
  } else {
    const enContent = await import("@/lib/bmc-content.json");
    return enContent.default as unknown as BMCContent;
  }
}

export default async function BMCCanvasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const finance = await getFinanceData();

  // Load content from JSON (for other content like meta, uiLabels, etc.)
  const content = await getBMCContent(locale);

  // Get canvas from database first (prioritize database over JSON)
  const dbCanvas = await getBMCCanvas();

  // Always use database canvas if available, otherwise use JSON fallback
  if (dbCanvas) {
    // Use database canvas (this is the source of truth)
    console.log('[BMC Canvas Page] Using canvas from database');
    console.log('[BMC Canvas Page] Database keyPartners count:', Array.isArray(dbCanvas.keyPartners) ? dbCanvas.keyPartners.length : 'N/A');
    content.bmcCanvas = dbCanvas;
  } else {
    // Fallback to JSON canvas only if database has no data
    console.log('[BMC Canvas Page] Using canvas from JSON file (fallback - no database data)');
    console.log('[BMC Canvas Page] JSON keyPartners count:', Array.isArray(content.bmcCanvas?.keyPartners) ? content.bmcCanvas.keyPartners.length : 'N/A');
  }

  if (!finance) {
    return <NoFinanceDataAlert />;
  }

  // Fetch Standard plan for data validation
  const standardPlanResult = await getSourceOfIncome('subscription-standard');
  const standardPlan = standardPlanResult.success ? standardPlanResult.source : null;

  // Check for missing required data
  const missingData: string[] = [];

  const standardAnnualPrice =
    (standardPlan?.metadata?.annualPrice as number | undefined) ||
    finance.revenue?.clientDistribution?.standard?.annualPrice ||
    finance.revenue?.pricingPlans?.find((p) =>
      p.name.toLowerCase().includes("standard")
    )?.annualPrice;

  const standardMonthlyRevenue =
    (standardPlan?.metadata?.monthlyRecognizedRevenue as number | undefined) ||
    finance.revenue?.clientDistribution?.standard?.monthlyRecognizedRevenue ||
    finance.revenue?.pricingPlans?.find((p) =>
      p.name.toLowerCase().includes("standard")
    )?.monthlyRecognizedRevenue;

  const recognitionPeriod =
    (standardPlan?.metadata?.duration as number | undefined) ||
    finance.revenue?.recognitionModel?.recognitionPeriod ||
    finance.revenue?.pricingPlans?.[0]?.contentDuration;

  const paymentPeriod = finance.revenue?.recognitionModel?.paymentPeriod;

  if (!standardAnnualPrice) {
    missingData.push(locale === 'ar'
      ? 'باقة Standard - annualPrice (السعر السنوي)'
      : 'Standard plan - annualPrice');
  }
  if (!standardMonthlyRevenue) {
    missingData.push(locale === 'ar'
      ? 'باقة Standard - monthlyRecognizedRevenue (الإيراد الشهري المعترف به)'
      : 'Standard plan - monthlyRecognizedRevenue');
  }
  if (!recognitionPeriod) {
    missingData.push(locale === 'ar'
      ? 'نموذج الاعتراف - recognitionPeriod (فترة الاعتراف بالأشهر)'
      : 'Recognition model - recognitionPeriod (in months)');
  }
  if (!paymentPeriod) {
    missingData.push(locale === 'ar'
      ? 'نموذج الاعتراف - paymentPeriod (فترة الدفع بالأشهر)'
      : 'Recognition model - paymentPeriod (in months)');
  }

  if (missingData.length > 0) {
    return <NoBMCDataAlert locale={locale} missingData={missingData} />;
  }

  // Fetch subscription plans for BMCMetricsClient
  const subscriptionPlansResult = await getSourcesOfIncome(SourceOfIncomeType.SUBSCRIPTION);
  const subscriptionPlans = subscriptionPlansResult.success && subscriptionPlansResult.sources
    ? subscriptionPlansResult.sources
    : [];

  return (
    <BMCMetricsClient
      finance={finance}
      plans={subscriptionPlans}
      locale={locale}
      content={content}
      defaultPlanKey="subscription-standard"
    >
      <div className="min-h-screen p-4 lg:p-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                {content.uiLabels.badge}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CanvasSectionClient
                bmcContent={content}
                finance={finance}
                locale={locale}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </BMCMetricsClient>
  );
}









