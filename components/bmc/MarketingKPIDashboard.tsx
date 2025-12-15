"use client";

import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  BarChart3,
  Info,
  ArrowRight,
} from "lucide-react";
import { formatCurrency } from "@/helpers/financialCalculations";
import type { FinanceData } from "@/helpers/financialCalculations";
import { BMCCalculationsContext } from "./BMCMetricsClient";

interface MarketingKPIDashboardProps {
  finance: FinanceData;
  locale: string;
}

export function MarketingKPIDashboard({
  finance,
  locale,
}: MarketingKPIDashboardProps) {
  const context = useContext(BMCCalculationsContext);

  const metrics = finance.metrics;
  const isRTL = locale === "ar";

  // Calculate CAC from marketing costs
  const marketingCosts = finance.costs.variable.marketing.items.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const year1TargetClients = finance.revenue.year1Target.clients;
  const cac = year1TargetClients > 0 ? marketingCosts / year1TargetClients : 0;

  // Get LTV from metrics or calculate
  const ltv = metrics?.ltv?.value || finance.revenue.averageAnnualPrice || 0;
  const ltvCacRatio = cac > 0 ? ltv / cac : 0;

  // Funnel metrics (mockup - can be enhanced with real data)
  const funnelMetrics = {
    awareness: { value: 10000, label: isRTL ? "الوعي" : "Awareness" },
    interest: { value: 2000, label: isRTL ? "الاهتمام" : "Interest" },
    consideration: { value: 500, label: isRTL ? "الاعتبار" : "Consideration" },
    purchase: { value: year1TargetClients, label: isRTL ? "الشراء" : "Purchase" },
  };

  const conversionRates = {
    awarenessToInterest: (funnelMetrics.interest.value / funnelMetrics.awareness.value) * 100,
    interestToConsideration: (funnelMetrics.consideration.value / funnelMetrics.interest.value) * 100,
    considerationToPurchase: (funnelMetrics.purchase.value / funnelMetrics.consideration.value) * 100,
  };

  // Channel performance (mockup - can be enhanced)
  const channels = [
    {
      name: isRTL ? "الموقع الإلكتروني" : "Website",
      roas: 4.2,
      cpa: cac * 0.8,
      percentage: 40,
    },
    {
      name: isRTL ? "وسائل التواصل الاجتماعي" : "Social Media",
      roas: 3.5,
      cpa: cac * 1.2,
      percentage: 30,
    },
    {
      name: isRTL ? "البحث المدفوع" : "Paid Search",
      roas: 5.1,
      cpa: cac * 0.6,
      percentage: 20,
    },
    {
      name: isRTL ? "المحتوى" : "Content",
      roas: 6.8,
      cpa: cac * 0.4,
      percentage: 10,
    },
  ];

  const getTrendColor = (value: number, target: number) => {
    if (value >= target) return "text-success";
    if (value >= target * 0.8) return "text-warning";
    return "text-destructive";
  };

  return (
    <section id="marketing-kpis" className="mb-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {isRTL ? "لوحة تحكم مؤشرات التسويق" : "Marketing KPIs Dashboard"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isRTL
                ? "مؤشرات الأداء الرئيسية لتتبع فعالية استراتيجية التسويق"
                : "Key performance indicators to track marketing strategy effectiveness"}
            </p>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* CAC */}
            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    {isRTL ? "تكلفة اكتساب العميل" : "CAC"}
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          {isRTL
                            ? "متوسط التكلفة لاكتساب عميل جديد"
                            : "Average cost to acquire a new customer"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-foreground">
                    {formatCurrency(cac, finance.currency)}
                  </div>
                  {metrics?.cac?.target && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          cac <= metrics.cac.target
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {isRTL ? "الهدف" : "Target"}:{" "}
                        {formatCurrency(metrics.cac.target, finance.currency)}
                      </Badge>
                    </div>
                  )}
                  {metrics?.cac && 'paybackPeriod' in metrics.cac && (
                    <div className="text-xs text-muted-foreground">
                      {isRTL ? "فترة الاسترداد" : "Payback"}:{" "}
                      {(metrics.cac as any).paybackPeriod}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* LTV */}
            <Card className="bg-success/5 border-2 border-success/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    {isRTL ? "القيمة الدائمة للعميل" : "LTV"}
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          {isRTL
                            ? "متوسط القيمة الإجمالية للعميل على مدى حياته"
                            : "Average total value of a customer over their lifetime"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-success">
                    {formatCurrency(ltv, finance.currency)}
                  </div>
                  {metrics?.ltv && 'avgLifetime' in metrics.ltv && (
                    <div className="text-xs text-muted-foreground">
                      {(metrics.ltv as any).avgLifetime}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* LTV:CAC Ratio */}
            <Card className="bg-chart-3/5 border-2 border-chart-3/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    {isRTL ? "نسبة LTV:CAC" : "LTV:CAC Ratio"}
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          {isRTL
                            ? "نسبة القيمة الدائمة إلى تكلفة الاكتساب"
                            : "Lifetime value to customer acquisition cost ratio"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-chart-3">
                    {ltvCacRatio.toFixed(1)}:1
                  </div>
                  {metrics?.ltvCacRatio?.value && (
                    <Badge
                      variant={
                        ltvCacRatio >= 3 ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {metrics.ltvCacRatio.note || ""}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Churn Rate */}
            <Card className="bg-warning/5 border-2 border-warning/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">
                    {isRTL ? "معدل الفقد" : "Churn Rate"}
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          {isRTL
                            ? "نسبة العملاء الذين يتركون الخدمة شهرياً"
                            : "Percentage of customers who leave the service monthly"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-warning">
                    {(metrics as any)?.churn?.target || "<8%"}
                  </div>
                  {(metrics as any)?.churn?.industryBenchmark && (
                    <div className="text-xs text-muted-foreground">
                      {isRTL ? "متوسط الصناعة" : "Industry"}:{" "}
                      {(metrics as any).churn.industryBenchmark}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Funnel */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {isRTL ? "مسار التحويل" : "Conversion Funnel"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(funnelMetrics).map(([key, metric], idx) => {
                  const prevMetric =
                    idx > 0
                      ? Object.values(funnelMetrics)[idx - 1]
                      : null;
                  const conversionRate = prevMetric
                    ? ((metric.value / prevMetric.value) * 100).toFixed(1)
                    : null;

                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                            {idx + 1}
                          </div>
                          <span className="font-medium">{metric.label}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold">
                            {metric.value.toLocaleString()}
                          </span>
                          {conversionRate && (
                            <Badge variant="outline">
                              {conversionRate}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      {idx < Object.keys(funnelMetrics).length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowRight
                            className={`h-4 w-4 text-muted-foreground ${isRTL ? "rotate-180" : ""
                              }`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Channel Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {isRTL ? "أداء القنوات" : "Channel Performance"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {channels.map((channel, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{channel.name}</span>
                      <Badge variant="outline">{channel.percentage}%</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {isRTL ? "ROAS" : "ROAS"}
                        </span>
                        <span className="font-medium">{channel.roas.toFixed(1)}x</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {isRTL ? "CPA" : "CPA"}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(channel.cpa, finance.currency)}
                        </span>
                      </div>
                      <Progress value={channel.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}










