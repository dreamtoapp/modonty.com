import type { BMCContent } from "@/lib/bmc-types";
import { BMCSidebar } from "@/components/bmc/BMCSidebar";
import { BMCVisualCanvas } from "@/components/bmc/BMCVisualCanvas";
import { BMCSection, BMCCard, MetricDisplay } from "@/components/bmc/BMCSection";
import { FinancialCharts } from "@/components/bmc/FinancialCharts";
import { MetricsDisplay } from "@/components/bmc/MetricsDisplay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GoToTop } from "@/components/go-to-top";
import { getFinanceData } from "@/lib/finance-data";
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
  AlertTriangle
} from "lucide-react";

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
  const finance = await getFinanceData(locale);

  // Calculate average monthly revenue per client from finance data (already unified)
  const avgMonthlyRevenuePerClient = finance.revenue.averageMonthlyPerClient;

  // Calculate break-even clients dynamically
  const {
    calculateFinanceTotals,
    calculateBreakEvenFromFinance,
  } = await import(
    "@/helpers/financialCalculations"
  );
  const totals = calculateFinanceTotals(finance);
  const breakEvenClients = calculateBreakEvenFromFinance(finance);

  return (
    <div className="min-h-screen">
      <BMCSidebar content={content} />
      <div className="lg:ml-80 p-4 lg:p-6">
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

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 items-stretch">
                <MetricDisplay
                  label={content.uiLabels.investmentRequired}
                  value={`${formatCurrency(finance.investment?.total.min || 0, finance.currency)} - ${formatCurrency(finance.investment?.total.max || 0, finance.currency)}`}
                  variant="primary"
                />
                <MetricDisplay
                  label={content.uiLabels.breakEven}
                  value={finance.breakEven?.point || (breakEvenClients ? (typeof breakEvenClients === 'object' ? `${breakEvenClients.clientsPerYear} ${locale === 'ar' ? 'عميل/سنة' : 'clients/year'}` : String(breakEvenClients)) : '—')}
                  variant="success"
                />
                <MetricDisplay
                  label={content.uiLabels.year1TargetClients}
                  value={finance.revenue.year1Target.clients}
                  variant="primary"
                />
                <MetricDisplay
                  label={content.uiLabels.year1MRRTarget}
                  value={`${formatCurrency(finance.revenue.year1Target.monthlyRecognizedRevenue, finance.currency)}/M`}
                  variant="success"
                />
              </div>

              {/* Costs (source of truth from admin costs page) */}
              <div className="mb-10">
                <Card className="border-2 border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      {locale === 'ar' ? 'التكاليف الشهرية (مصدر رئيسي)' : 'Monthly Costs (Source of Truth)'}
                    </CardTitle>
                    <CardDescription>
                      {locale === 'ar'
                        ? 'يتم عرض البيانات مباشرة من صفحة تكاليف الإدارة لضمان التوافق.'
                        : 'Data pulled directly from the admin Costs page to keep BMC in sync.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-primary/5 h-full">
                      <CardContent className="p-4 md:p-6 flex flex-col h-full">
                        <div className="text-xs md:text-sm text-muted-foreground mb-2 break-words leading-tight min-h-[2.5rem]">
                          {locale === 'ar' ? 'إجمالي التكاليف' : 'Total Costs'}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'شهرياً' : 'Monthly'}</p>
                            <p className="text-2xl font-bold text-foreground">{formatCurrency(totals.total, finance.currency)}</p>
                          </div>
                          <div className="border-t pt-2">
                            <p className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'سنوياً' : 'Yearly'}</p>
                            <p className="text-xl font-semibold text-foreground">{formatCurrency(totals.total * 12, finance.currency)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {breakEvenClients && typeof breakEvenClients === 'object' ? (
                      <Card className="bg-success/5 h-full">
                        <CardContent className="p-4 md:p-6 flex flex-col h-full">
                          <div className="text-xs md:text-sm text-muted-foreground mb-2 break-words leading-tight min-h-[2.5rem]">
                            {locale === 'ar' ? 'نقطة التعادل (عملاء)' : 'Break-even Clients'}
                          </div>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'يحتاج اكتساب شهرياً' : 'Clients per Month'}</p>
                              <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold text-foreground">{breakEvenClients.clientsPerMonth.toFixed(1)}</p>
                                <span className="text-xs text-muted-foreground">{locale === 'ar' ? 'عميل/شهر' : 'clients/M'}</span>
                              </div>
                            </div>
                            <div className="border-t pt-2">
                              <p className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'إجمالي العملاء المطلوبين سنوياً' : 'Total Clients per Year'}</p>
                              <div className="flex items-center gap-2">
                                <p className="text-xl font-semibold text-foreground">{breakEvenClients.clientsPerYear}</p>
                                <span className="text-xs text-muted-foreground">{locale === 'ar' ? 'عميل/سنة' : 'clients/year'}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <MetricDisplay
                        label={locale === 'ar' ? 'نقطة التعادل (عملاء)' : 'Break-even Clients'}
                        value="—"
                        variant="success"
                      />
                    )}
                  </CardContent>
                </Card>
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

        {/* BMC Canvas Visual */}
        <section id="canvas" className="mb-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {content.uiLabels.badge}
              </h2>
              <BMCVisualCanvas 
              canvas={content.bmcCanvas} 
              monthlyRecognizedRevenue={finance.revenue.year1Target.monthlyRecognizedRevenue}
            />
            </div>
          </div>
        </section>

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
                  <div className="text-xs font-semibold text-muted-foreground mb-2">قيمة الشراكة:</div>
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

        {/* Cost Structure */}
        <BMCSection id="cost-structure" title={content.costStructure.title}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{content.uiLabels.fixedCosts}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Team Salaries</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        calculateCategoryTotal(finance.costs.fixed.leadership.items) +
                        calculateCategoryTotal(finance.costs.fixed.technical.items) +
                        calculateCategoryTotal(finance.costs.fixed.content.items) +
                        calculateCategoryTotal(finance.costs.fixed.marketingSales.items) +
                        calculateCategoryTotal(finance.costs.fixed.operations.items),
                        finance.currency
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">per month</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Infrastructure</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(totals.byCategory.infrastructure || 0, finance.currency)}
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Overhead</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(totals.byCategory.overhead || 0, finance.currency)}
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
                  <div className="text-lg font-semibold text-primary">
                    {content.uiLabels.totalFixedCosts}: {formatCurrency(totals.total, finance.currency)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Structure by Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'launch', phase: finance.costs.byPhase.launch },
                    { key: 'growth', phase: finance.costs.byPhase.growth },
                    { key: 'scale', phase: finance.costs.byPhase.scale },
                  ].map(({ key, phase }) => (
                    <div key={key} className="p-4 bg-muted rounded-lg">
                      <div className="font-semibold mb-3">{phase.months}</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Team:</span>
                          <span className="font-medium">
                            {formatCurrency(
                              (phase.leadership || 0) +
                              (phase.technical || 0) +
                              (phase.content || 0) +
                              (phase.marketingSales || 0) +
                              (phase.operations || 0),
                              finance.currency
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Marketing:</span>
                          <span className="font-medium">
                            {formatCurrency(phase.marketing, finance.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Infrastructure:</span>
                          <span className="font-medium">
                            {formatCurrency(phase.infrastructure, finance.currency)}
                          </span>
                        </div>
                        <div className="pt-2 border-t mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>{formatCurrency(phase.total, finance.currency)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </BMCSection>

        {/* Revenue Streams */}
        <BMCSection id="revenue-streams" title={content.revenueStreams.title}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-primary/5 border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                  <Badge variant="outline">Annual Payment - 18 Months Content</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {finance.revenue.pricingPlans.map((plan, idx) => (
                      <div key={idx} className="p-3 bg-background rounded-lg">
                        <div className="font-semibold">{plan.name}</div>
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(plan.annualPrice, plan.currency)}/year
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {plan.articlesPerMonth} articles/M for {plan.contentDuration} months
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Monthly recognized: {formatCurrency(plan.monthlyRecognizedRevenue || 0, plan.currency)}
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t">
                      <div className="text-sm text-muted-foreground">Average Annual Price:</div>
                      <div className="text-xl font-bold text-primary">
                        {formatCurrency(finance.revenue.averageAnnualPrice, finance.currency)}/year
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Average Monthly Recognized Revenue:</div>
                      <div className="text-lg font-semibold text-primary">
                        {formatCurrency(finance.revenue.averageMonthlyPerClient, finance.currency)}/M
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                  <CardTitle className="text-2xl text-success">نموذج مالي فريد: ادفع 12، احصل على 18</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-success mb-2">المفهوم:</div>
                      <div className="text-sm text-foreground">
                        الاشتراك السنوي يوفر 18 شهراً من تسليم المحتوى (6 أشهر مجانية = 50% قيمة إضافية)
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-success mb-2">الفوائد المالية:</div>
                      <ul className="space-y-1 text-sm text-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>تدفق نقدي إيجابي فوري (دفع سنوي مقدماً)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>استرداد CAC فوري (لا انتظار لاسترداد التكلفة)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>تقليل مخاطر الانقطاع (18 شهر تعطي وقت لظهور نتائج SEO)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>الإيرادات معترف بها على 18 شهر (نموذج محاسبي مستدام)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-success mb-2">مثال عملي:</div>
                      <div className="p-4 bg-background rounded-lg space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">دفع العميل:</span>
                          <span className="font-bold text-success">{formatCurrency(3999, finance.currency)}/سنة</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">محتوى يحصل عليه:</span>
                          <span className="font-bold">18 شهر</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-muted-foreground">القيمة الإضافية:</span>
                          <span className="font-bold text-success">6 أشهر مجانية (50%)</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-muted-foreground">الإيراد المعترف به شهرياً:</span>
                          <span className="font-bold">{formatCurrency(222, finance.currency)}/M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{content.uiLabels.investmentRequired}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary/20 mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatCurrency(finance.investment?.total.min || 0, finance.currency)} - {formatCurrency(finance.investment?.total.max || 0, finance.currency)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Initial Investment</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {finance.investment?.breakdown.map((item, idx) => (
                    <div key={idx} className="p-4 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">{item.phase}</div>
                      <div className="text-lg font-bold">{formatCurrency(item.amount, item.currency || finance.currency)}</div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competitive Advantages */}
            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  المزايا التنافسية الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-background rounded-lg border-2 border-success/20">
                    <div className="text-xs text-muted-foreground mb-1">توفير التكلفة</div>
                    <div className="text-2xl font-bold text-success">90%</div>
                    <div className="text-xs text-muted-foreground mt-1">أرخص من الوكالات التقليدية</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border-2 border-primary/20">
                    <div className="text-xs text-muted-foreground mb-1">نسبة LTV:CAC</div>
                    <div className="text-2xl font-bold text-primary">{finance.metrics?.ltvCacRatio?.value || "16:1"}</div>
                    <div className="text-xs text-muted-foreground mt-1">{finance.metrics?.ltvCacRatio?.note || "نسبة ممتازة للاستدامة"}</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border-2 border-chart-3/20">
                    <div className="text-xs text-muted-foreground mb-1">أصل مركب</div>
                    <div className="text-2xl font-bold text-chart-3">∞</div>
                    <div className="text-xs text-muted-foreground mt-1">مدونة السلطة تنمو مع الوقت</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border-2 border-warning/20">
                    <div className="text-xs text-muted-foreground mb-1">استرداد CAC</div>
                    <div className="text-2xl font-bold text-warning">فوري</div>
                    <div className="text-xs text-muted-foreground mt-1">{finance.metrics?.cac?.note || "دفع سنوي مقدماً"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <FinancialCharts 
              finance={finance}
              breakEven={breakEvenClients}
            />
          </div>
        </BMCSection>

        {/* Key Metrics */}
        <BMCSection id="key-metrics" title={content.keyMetrics.title}>
          <MetricsDisplay 
            business={content.keyMetrics.business}
            operational={content.keyMetrics.operational}
          />
        </BMCSection>

        {/* Competitive Advantages */}
        <BMCSection id="competitive-advantages" title={content.competitiveAdvantages.title}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Unique Value Propositions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.competitiveAdvantages.uniqueValuePropositions.map((prop, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="text-sm text-foreground">{prop}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BMCCard title="Technology Moat" variant="primary">
                <ul className="space-y-2">
                  {content.competitiveAdvantages.moats.technology.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>

              <BMCCard title="Content Moat" variant="success">
                <ul className="space-y-2">
                  {content.competitiveAdvantages.moats.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>

              <BMCCard title="Network Effects" variant="warning">
                <ul className="space-y-2">
                  {content.competitiveAdvantages.moats.networkEffects.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>

              <BMCCard title="Brand Moat">
                <ul className="space-y-2">
                  {content.competitiveAdvantages.moats.brand.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </BMCCard>
            </div>
          </div>
        </BMCSection>

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
  );
}

