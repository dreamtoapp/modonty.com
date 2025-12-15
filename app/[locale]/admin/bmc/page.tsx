import type { BMCContent } from "@/lib/bmc-types";
import "./print.css";
import { CanvasSectionClient } from "@/components/bmc/CanvasSectionClient";
import { BMCSection, BMCCard, MetricDisplay } from "@/components/bmc/BMCSection";
import { FinancialChartsClient } from "@/components/bmc/FinancialChartsClient";
import { MetricsDisplay } from "@/components/bmc/MetricsDisplay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GoToTop } from "@/components/common/go-to-top";
import { NoFinanceDataAlert } from "@/components/admin/NoFinanceDataAlert";
import { NoBMCDataAlert } from "@/components/admin/NoBMCDataAlert";
import { getFinanceData } from "@/lib/finance-data";
import { getSourceOfIncome, getSourcesOfIncome } from "@/actions/sourceOfIncome";
import { SourceOfIncomeType } from "@prisma/client";
import { BMCMetricsClient } from "@/components/bmc/BMCMetricsClient";
import { BMCDynamicMetrics } from "@/components/bmc/BMCDynamicMetrics";
import { CostsSectionClient } from "@/components/bmc/CostsSectionClient";
import { RevenueStreamsClient } from "@/components/bmc/RevenueStreamsClient";
import { InvestmentSectionClient } from "@/components/bmc/InvestmentSectionClient";
import {
  calculateFinanceTotals,
  calculateCategoryTotal,
  formatCurrency,
} from "@/helpers/financialCalculations";
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MarketingKPIDashboard } from "@/components/bmc/MarketingKPIDashboard";
import { MarketingInsights } from "@/components/bmc/MarketingInsights";

async function getBMCContent(locale: string): Promise<BMCContent> {
  if (locale === 'ar') {
    const arContent = await import("@/lib/bmc-content-ar.json");
    return arContent.default as unknown as BMCContent;
  } else {
    const enContent = await import("@/lib/bmc-content.json");
    return enContent.default as unknown as BMCContent;
  }
}

export default async function BMCPresentationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getBMCContent(locale);
  const finance = await getFinanceData();

  if (!finance) {
    return <NoFinanceDataAlert />;
  }

  // Fetch all subscription plans from SourceOfIncome table
  const subscriptionPlansResult = await getSourcesOfIncome(SourceOfIncomeType.SUBSCRIPTION);
  const subscriptionPlans = subscriptionPlansResult.success && subscriptionPlansResult.sources
    ? subscriptionPlansResult.sources
    : [];

  // Fetch Standard plan as default
  const standardPlanResult = await getSourceOfIncome('subscription-standard');
  const standardPlan = standardPlanResult.success ? standardPlanResult.source : null;

  // Check for missing required data
  const missingData: string[] = [];

  // Check Standard plan data
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

  // Collect missing data messages
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

  // If any required data is missing, show alert
  if (missingData.length > 0) {
    return <NoBMCDataAlert locale={locale} missingData={missingData} />;
  }

  // All data is available, proceed with calculations
  const extraMonths = recognitionPeriod! - paymentPeriod!;

  // Calculate extra value percentage dynamically
  const extraValuePercentage = Math.round((extraMonths / paymentPeriod!) * 100);

  // Calculate totals for server-side rendering (used in static sections)
  const {
    calculateFinanceTotals,
    calculateInvestmentFromCosts,
  } = await import(
    "@/helpers/financialCalculations"
  );

  // Initial calculations for server-side rendering
  // Dynamic calculations will be done in client components based on selected plan
  const totals = calculateFinanceTotals(finance);
  const investment = calculateInvestmentFromCosts(finance);

  const availablePlans = subscriptionPlans.map((plan) => ({
    key: plan.key,
    label: plan.label,
  }));

  return (
    <BMCMetricsClient
      finance={finance}
      plans={subscriptionPlans}
      locale={locale}
      content={content}
      defaultPlanKey="subscription-standard"
    >
      <div className="min-h-screen">
        <div className="p-4 lg:p-6">
          {/* Hero Section */}
          <section id="hero" className="mb-16 scroll-mt-20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                  <Badge className="mb-4">{content.uiLabels.badge}</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {content.meta.title}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
                    {content.executiveSummary.description}
                  </p>
                </div>

                {/* Executive Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        {content.uiLabels.businessModel}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {content.executiveSummary.businessModelType}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        {content.uiLabels.targetMarket}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {content.executiveSummary.targetMarket}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        {content.uiLabels.revenueModel}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {content.executiveSummary.revenueModel}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Core Financial Metrics */}
          <section id="core-metrics" className="mb-16 scroll-mt-20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {locale === "ar" ? "المقاييس المالية الأساسية" : "Core Financial Metrics"}
                </h2>
                <BMCDynamicMetrics
                  finance={finance}
                  selectedPlan={null}
                  locale={locale}
                  content={content}
                />
                {/* Costs (source of truth from admin costs page) */}
                <CostsSectionClient
                  finance={finance}
                  locale={locale}
                />
              </div>
            </div>
          </section>

          {/* Marketing KPIs Dashboard */}
          <MarketingKPIDashboard finance={finance} locale={locale} />

          {/* Canvas Visual - BMC or Lean Canvas */}
          <section id="canvas" className="mb-16 scroll-mt-20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {content.uiLabels.badge}
                </h2>
                <div className="mb-6">
                  <CanvasSectionClient
                    bmcContent={content}
                    finance={finance}
                    locale={locale}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Revenue Streams */}
          <BMCSection id="revenue-streams" title={content.revenueStreams.title}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RevenueStreamsClient
                  finance={finance}
                  locale={locale}
                  content={content}
                />
              </div>
            </div>
          </BMCSection>

          {/* Marketing Insights */}
          <MarketingInsights finance={finance} locale={locale} />

          {/* BMC Building Blocks */}
          {/* Key Partners */}
          <BMCSection id="key-partners" title={content.keyPartners.title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BMCCard title={content.keyPartners.marketingAgencies.title} variant="success">
                <ul className="space-y-2">
                  {content.keyPartners.marketingAgencies.partners.map((partner, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{partner}</span>
                    </li>
                  ))}
                </ul>
                {content.keyPartners.marketingAgencies.value && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">{locale === "ar" ? "قيمة الشراكة:" : "Partnership Value:"}</div>
                    <ul className="space-y-1">
                      {content.keyPartners.marketingAgencies.value.map((val, idx) => (
                        <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                          <TrendingUp className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                          <span>{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </BMCCard>

              <BMCCard title={content.keyPartners.contentPartners.title} variant="warning">
                <ul className="space-y-2">
                  {content.keyPartners.contentPartners.partners.map((partner, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{partner}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>

              <BMCCard title={content.keyPartners.technologyPartners.title}>
                <ul className="space-y-2">
                  {content.keyPartners.technologyPartners.partners.map((partner, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{partner}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>
            </div>

            <Card className="mt-6 bg-primary/5 border-2 border-primary/20">
              <CardHeader>
                <CardTitle>{content.uiLabels.partnershipBenefits}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.keyPartners.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BMCSection>

          {/* Key Activities */}
          <BMCSection id="key-activities" title={content.keyActivities.title}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.keyActivities.activities.map((activity, idx) => (
                <BMCCard key={idx} title={activity.title} variant={idx % 2 === 0 ? "primary" : "default"}>
                  <ul className="space-y-2">
                    {activity.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </BMCCard>
              ))}
            </div>
          </BMCSection>

          {/* Key Resources */}
          <BMCSection id="key-resources" title={content.keyResources.title}>
            <div className="space-y-6">
              <Card className="bg-primary/5 border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>{locale === 'ar' ? 'الموارد البشرية' : 'Human Resources'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'فريق القيادة' : 'Leadership Team'}</div>
                      <div className="text-2xl font-bold text-primary">
                        {finance.costs.fixed.leadership.items.length}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(calculateCategoryTotal(finance.costs.fixed.leadership.items), finance.currency)}/M
                      </div>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'الفريق التقني' : 'Technical Team'}</div>
                      <div className="text-2xl font-bold text-primary">
                        {finance.costs.fixed.technical.items.length}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(calculateCategoryTotal(finance.costs.fixed.technical.items), finance.currency)}/M
                      </div>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'فريق المحتوى' : 'Content Team'}</div>
                      <div className="text-2xl font-bold text-primary">
                        {finance.costs.fixed.content.items.length}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(calculateCategoryTotal(finance.costs.fixed.content.items), finance.currency)}/M
                      </div>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'التسويق والمبيعات' : 'Marketing & Sales'}</div>
                      <div className="text-2xl font-bold text-primary">
                        {finance.costs.fixed.marketingSales.items.length}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(calculateCategoryTotal(finance.costs.fixed.marketingSales.items), finance.currency)}/M
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'إجمالي الفريق' : 'Total Team Size'}</div>
                        <div className="text-2xl font-bold text-primary">
                          {finance.costs.fixed.leadership.items.length +
                            finance.costs.fixed.technical.items.length +
                            finance.costs.fixed.content.items.length +
                            finance.costs.fixed.marketingSales.items.length +
                            finance.costs.fixed.operations.items.length} {locale === 'ar' ? 'شخص' : 'people'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'إجمالي الرواتب الشهرية' : 'Total Monthly Payroll'}</div>
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(
                            calculateCategoryTotal(finance.costs.fixed.leadership.items) +
                            calculateCategoryTotal(finance.costs.fixed.technical.items) +
                            calculateCategoryTotal(finance.costs.fixed.content.items) +
                            calculateCategoryTotal(finance.costs.fixed.marketingSales.items) +
                            calculateCategoryTotal(finance.costs.fixed.operations.items),
                            finance.currency
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BMCCard title={content.keyResources.intellectualResources.authorityBlog.title} variant="primary">
                  <ul className="space-y-2">
                    {content.keyResources.intellectualResources.authorityBlog.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </BMCCard>

                <BMCCard title={content.keyResources.intellectualResources.technology.title} variant="success">
                  <ul className="space-y-2">
                    {content.keyResources.intellectualResources.technology.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </BMCCard>
              </div>
            </div>
          </BMCSection>

          {/* Value Propositions */}
          <BMCSection id="value-propositions" title={content.valuePropositions.title}>
            {/* Authority Blog - Primary Value Proposition (Highlighted) */}
            {content.valuePropositions.primary[0] && (
              <Card className="mb-6 bg-gradient-to-br from-primary/20 to-primary/5 border-4 border-primary shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">#1</Badge>
                    <CardTitle className="text-2xl text-primary">{content.valuePropositions.primary[0].title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">What:</div>
                      <div className="text-sm font-medium text-foreground">{content.valuePropositions.primary[0].what}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Value:</div>
                      <div className="text-sm font-medium text-foreground">{content.valuePropositions.primary[0].value}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Benefit:</div>
                      <div className="text-sm font-medium text-foreground">{content.valuePropositions.primary[0].benefit}</div>
                    </div>
                  </div>
                  {content.valuePropositions.primary[0].uniqueFactor && (
                    <div className="pt-3 border-t border-primary/30">
                      <div className="text-xs font-semibold text-primary mb-1">Unique Factor:</div>
                      <div className="text-sm font-semibold text-primary">{content.valuePropositions.primary[0].uniqueFactor}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Other Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.valuePropositions.primary.slice(1).map((prop, idx) => (
                <Card key={idx} className="bg-card border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{prop.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">What:</div>
                      <div className="text-sm text-foreground">{prop.what}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Value:</div>
                      <div className="text-sm text-foreground">{prop.value}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-1">Benefit:</div>
                      <div className="text-sm text-foreground">{prop.benefit}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <BMCCard title={content.valuePropositions.summary.smallStores.title} variant="primary">
                <ul className="space-y-2">
                  {content.valuePropositions.summary.smallStores.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>

              <BMCCard title={content.valuePropositions.summary.mediumStores.title} variant="success">
                <ul className="space-y-2">
                  {content.valuePropositions.summary.mediumStores.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>

              <BMCCard title={content.valuePropositions.summary.agenciesEnterprise.title} variant="warning">
                <ul className="space-y-2">
                  {content.valuePropositions.summary.agenciesEnterprise.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>
            </div>
          </BMCSection>

          {/* Customer Relationships */}
          <BMCSection id="customer-relationships" title={content.customerRelationships.title}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.customerRelationships.models.map((model, idx) => (
                <Card key={idx} className="bg-card border-2 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{model.type}</CardTitle>
                      <Badge variant="outline">{model.percentage}%</Badge>
                    </div>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-2">Touchpoints:</div>
                      <ul className="space-y-1">
                        {model.touchpoints.map((touchpoint, tIdx) => (
                          <li key={tIdx} className="text-sm text-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0 mt-1" />
                            {touchpoint}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="text-xs font-semibold text-muted-foreground">Target:</div>
                      <div className="text-sm text-foreground">{model.target}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </BMCSection>

          {/* Channels */}
          <BMCSection id="channels" title={content.channels.title}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BMCCard title={content.channels.direct.website.title} variant="primary">
                  <ul className="space-y-2">
                    {content.channels.direct.website.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </BMCCard>

              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{content.uiLabels.channelMixByStage}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { phase: content.channels.channelMix.months0to3, label: "Months 0-3 (Launch)" },
                      { phase: content.channels.channelMix.months4to6, label: "Months 4-6 (Growth)" },
                      { phase: content.channels.channelMix.months7to12, label: "Months 7-12 (Scale)" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-muted rounded-lg">
                        <div className="font-semibold mb-3">{item.label}</div>
                        <div className="space-y-2">
                          {Object.entries(item.phase.breakdown).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
                              <Badge variant="outline">{value}%</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </BMCSection>

          {/* Customer Segments */}
          <BMCSection id="customer-segments" title={content.customerSegments.title}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.customerSegments.primary.map((segment) => (
                  <Card key={segment.id} className="border-2 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{segment.name}</CardTitle>
                        <Badge variant="outline">{segment.target}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Characteristics:</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(segment.characteristics).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-muted-foreground">{key}:</span>{" "}
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Pain Points:</div>
                        <ul className="space-y-1">
                          {segment.painPoints.map((point, idx) => (
                            <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 text-warning flex-shrink-0 mt-1" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Solution:</div>
                        <div className="text-sm font-medium text-primary mb-1">{segment.solution.tier}</div>
                        <ul className="space-y-1">
                          {segment.solution.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                              <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0 mt-1" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </BMCSection>

          {/* Financial Summary */}
          <BMCSection id="financial-summary" title={content.financialSummary.title}>
            <div className="space-y-6">
              {/* 18-Month Financial Model Explanation */}
              <Card className="bg-gradient-to-br from-success/20 to-success/5 border-4 border-success shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-success text-success-foreground text-lg px-4 py-2">💰</Badge>
                    <CardTitle className="text-2xl text-success">
                      {locale === "ar"
                        ? `نموذج مالي فريد: ادفع ${paymentPeriod}، احصل على ${recognitionPeriod}`
                        : `Unique Financial Model: Pay ${paymentPeriod}, Get ${recognitionPeriod}`}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-success mb-2">
                          {locale === "ar" ? "المفهوم:" : "Concept:"}
                        </div>
                        <div className="text-sm text-foreground">
                          {locale === "ar"
                            ? `الاشتراك السنوي يوفر ${recognitionPeriod!} شهراً من تسليم المحتوى (${extraMonths} أشهر مجانية = ${extraValuePercentage}% قيمة إضافية)`
                            : `Annual subscription provides ${recognitionPeriod!} months of content delivery (${extraMonths} free months = ${extraValuePercentage}% extra value)`}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-success mb-2">
                          {locale === "ar" ? "الفوائد المالية:" : "Financial Benefits:"}
                        </div>
                        <ul className="space-y-1 text-sm text-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            <span>
                              {locale === "ar"
                                ? "تدفق نقدي إيجابي فوري (دفع سنوي مقدماً)"
                                : "Immediate positive cash flow (annual upfront payment)"}
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            <span>
                              {locale === "ar"
                                ? "استرداد CAC فوري (لا انتظار لاسترداد التكلفة)"
                                : "Immediate CAC payback (no waiting for cost recovery)"}
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            <span>
                              {locale === "ar"
                                ? `تقليل مخاطر الانقطاع (${recognitionPeriod!} شهر تعطي وقت لظهور نتائج SEO)`
                                : `Reduced churn risk (${recognitionPeriod!} months give time for SEO results)`}
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            <span>
                              {locale === "ar"
                                ? `الإيرادات معترف بها على ${recognitionPeriod!} شهر (نموذج محاسبي مستدام)`
                                : `Revenue recognized over ${recognitionPeriod!} months (sustainable accounting model)`}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-success mb-2">
                          {locale === "ar" ? "مثال عملي:" : "Practical Example:"}
                        </div>
                        <div className="p-4 bg-background rounded-lg space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {locale === "ar" ? "دفع العميل:" : "Client Payment:"}
                            </span>
                            <span className="font-bold text-success">
                              {formatCurrency(standardAnnualPrice!, finance.currency)}/{locale === "ar" ? "سنة" : "year"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {locale === "ar" ? "محتوى يحصل عليه:" : "Content Received:"}
                            </span>
                            <span className="font-bold">
                              {recognitionPeriod!} {locale === "ar" ? "شهر" : "months"}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-muted-foreground">
                              {locale === "ar" ? "القيمة الإضافية:" : "Extra Value:"}
                            </span>
                            <span className="font-bold text-success">
                              {extraMonths} {locale === "ar" ? "أشهر مجانية" : "free months"} ({extraValuePercentage}%)
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-muted-foreground">
                              {locale === "ar" ? "الإيراد المعترف به شهرياً:" : "Monthly Recognized Revenue:"}
                            </span>
                            <span className="font-bold">
                              {formatCurrency(standardMonthlyRevenue!, finance.currency)}/M
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <InvestmentSectionClient
                finance={finance}
                locale={locale}
                content={content}
              />

              {/* Competitive Advantages - Metrics removed (shown in MarketingKPIDashboard) */}
              <Card className="bg-primary/5 border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {locale === "ar" ? "المزايا التنافسية الرئيسية" : "Key Competitive Advantages"}
                  </CardTitle>
                  <CardDescription>
                    {locale === "ar"
                      ? "للاطلاع على المقاييس التفصيلية (LTV:CAC، CAC، إلخ)، راجع لوحة مؤشرات التسويق أعلاه"
                      : "For detailed metrics (LTV:CAC, CAC, etc.), see Marketing KPIs Dashboard above"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-lg border-2 border-success/20">
                      <div className="text-xs text-muted-foreground mb-1">{locale === "ar" ? "توفير التكلفة" : "Cost Savings"}</div>
                      <div className="text-2xl font-bold text-success">
                        {finance.metrics?.costSavings?.percentage
                          ? String(finance.metrics.costSavings.percentage)
                          : (finance.metrics?.margins?.gross?.blended ?
                            `${Math.round((1 - parseFloat(finance.metrics.margins.gross.blended.replace('%', '')) / 100) * 100)}%` :
                            '—')}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{locale === "ar" ? "أرخص من الوكالات التقليدية" : "Cheaper than traditional agencies"}</div>
                    </div>
                    <div className="p-4 bg-background rounded-lg border-2 border-chart-3/20">
                      <div className="text-xs text-muted-foreground mb-1">{locale === "ar" ? "أصل مركب" : "Compound Asset"}</div>
                      <div className="text-2xl font-bold text-chart-3">∞</div>
                      <div className="text-xs text-muted-foreground mt-1">{locale === "ar" ? "مدونة السلطة تنمو مع الوقت" : "Authority blog grows over time"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <FinancialChartsClient
                finance={finance}
              />
            </div>
          </BMCSection>

          {/* Strategy & Growth */}
          {/* Growth Strategy */}
          <BMCSection id="growth-strategy" title={content.growthStrategy.title}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.growthStrategy.phases.map((phase) => (
                  <Card key={phase.phase} className="bg-card border-2 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Phase {phase.phase}</Badge>
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{phase.name}</CardTitle>
                      <CardDescription>{phase.timeline}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.goals.map((goal, idx) => (
                          <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/5 border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>Year 2 Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.entries(content.growthStrategy.year2Vision).map(([key, value]) => (
                      <div key={key} className="p-4 bg-background rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="text-lg font-bold text-foreground">{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </BMCSection>

          {/* Risks & Mitigation */}
          <BMCSection id="risks" title={content.risks.title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.risks.risks.map((risk) => (
                <Card key={risk.id} className="border-2 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      <CardTitle className="text-lg">{risk.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-warning mb-1">Risk:</div>
                      <div className="text-sm text-foreground">{risk.risk}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-success mb-1">Mitigation:</div>
                      <div className="text-sm text-foreground">{risk.mitigation}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </BMCSection>

          {/* Conclusion */}
          <BMCSection id="conclusion" title={content.conclusion.title}>
            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardHeader>
                <CardTitle>{content.conclusion.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-foreground">{content.conclusion.description}</p>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Key Strengths:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {content.conclusion.keyStrengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">Success Factors:</h3>
                  <ul className="space-y-2">
                    {content.conclusion.successFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-background rounded-lg border-2 border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Expected Outcome:</h3>
                  <p className="text-lg text-foreground">{content.conclusion.expectedOutcome}</p>
                </div>
              </CardContent>
            </Card>
          </BMCSection>

          {/* Footer */}
          <footer className="mt-16 py-8 border-t">
            <div className="container mx-auto px-4 text-center">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Document Version:</strong> {content.meta.version} |{" "}
                  <strong>Date:</strong> {content.meta.date} |{" "}
                  <strong>Status:</strong> {content.meta.status}
                </p>
                <p>© 2025 Modonty. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </div>
        <GoToTop />
      </div>
    </BMCMetricsClient>
  );
}

