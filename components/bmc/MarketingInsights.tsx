"use client";

import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  Target,
  X,
} from "lucide-react";
import { formatCurrency } from "@/helpers/financialCalculations";
import type { FinanceData } from "@/helpers/financialCalculations";
import { BMCCalculationsContext } from "./BMCMetricsClient";
import { useState } from "react";

interface MarketingInsightsProps {
  finance: FinanceData;
  locale: string;
}

interface Insight {
  id: string;
  type: "success" | "warning" | "info" | "critical";
  title: string;
  description: string;
  action?: string;
  dismissible?: boolean;
}

export function MarketingInsights({
  finance,
  locale,
}: MarketingInsightsProps) {
  const context = useContext(BMCCalculationsContext);
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(
    new Set()
  );

  const metrics = finance.metrics;
  const isRTL = locale === "ar";

  // Calculate metrics
  const marketingCosts = finance.costs.variable.marketing.items.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const year1TargetClients = finance.revenue.year1Target.clients;
  const cac = year1TargetClients > 0 ? marketingCosts / year1TargetClients : 0;
  const ltv = metrics?.ltv?.value || finance.revenue.averageAnnualPrice || 0;
  const ltvCacRatio = cac > 0 ? ltv / cac : 0;

  // Generate insights
  const insights: Insight[] = [];

  // LTV:CAC Ratio Insight
  if (ltvCacRatio >= 3) {
    insights.push({
      id: "ltv-cac-excellent",
      type: "success",
      title: isRTL
        ? "نسبة LTV:CAC ممتازة"
        : "Excellent LTV:CAC Ratio",
      description: isRTL
        ? `نسبة ${ltvCacRatio.toFixed(1)}:1 تعني أن كل ريال مستثمر في التسويق يعود بقيمة عالية. هذا مؤشر قوي على نموذج عمل مستدام.`
        : `A ratio of ${ltvCacRatio.toFixed(1)}:1 means every dollar invested in marketing returns high value. This is a strong indicator of a sustainable business model.`,
      action: isRTL
        ? "فكر في زيادة ميزانية التسويق لتعظيم النمو"
        : "Consider increasing marketing budget to maximize growth",
    });
  } else if (ltvCacRatio < 2) {
    insights.push({
      id: "ltv-cac-low",
      type: "critical",
      title: isRTL ? "نسبة LTV:CAC منخفضة" : "Low LTV:CAC Ratio",
      description: isRTL
        ? `نسبة ${ltvCacRatio.toFixed(1)}:1 أقل من المستوى المثالي (3:1). قد تحتاج إلى تحسين استراتيجية الاكتساب أو زيادة القيمة الدائمة.`
        : `A ratio of ${ltvCacRatio.toFixed(1)}:1 is below the ideal level (3:1). You may need to improve acquisition strategy or increase lifetime value.`,
      action: isRTL
        ? "راجع استراتيجية التسويق وطرق تحسين القيمة الدائمة"
        : "Review marketing strategy and ways to improve lifetime value",
    });
  }

  // CAC Target Insight
  if (metrics?.cac?.target && cac > metrics.cac.target * 1.2) {
    insights.push({
      id: "cac-above-target",
      type: "warning",
      title: isRTL ? "CAC أعلى من الهدف" : "CAC Above Target",
      description: isRTL
        ? `تكلفة الاكتساب الحالية ${formatCurrency(cac, finance.currency)} أعلى من الهدف ${formatCurrency(metrics.cac.target, finance.currency)}.`
        : `Current acquisition cost ${formatCurrency(cac, finance.currency)} is above target ${formatCurrency(metrics.cac.target, finance.currency)}.`,
      action: isRTL
        ? "حسّن استهداف الحملات وقلل التكاليف غير الضرورية"
        : "Improve campaign targeting and reduce unnecessary costs",
    });
  }

  // Churn Rate Insight
  const churnData = (metrics as any)?.churn;
  if (churnData?.target) {
    const churnTarget = parseFloat(churnData.target.replace(/[<%]/g, ""));
    insights.push({
      id: "churn-strategy",
      type: "info",
      title: isRTL ? "استراتيجية تقليل الفقد" : "Churn Reduction Strategy",
      description: isRTL
        ? `هدف معدل الفقد ${churnData.target} أقل من متوسط الصناعة ${churnData.industryBenchmark || "10-15%"}. استراتيجية الاحتفاظ بالعملاء تعتمد على ${churnData.retentionStrategy || "18-month package"}.`
        : `Target churn rate ${churnData.target} is below industry average ${churnData.industryBenchmark || "10-15%"}. Retention strategy focuses on ${churnData.retentionStrategy || "18-month package"}.`,
      action: isRTL
        ? "ركز على تحسين تجربة العملاء ونتائج المحتوى"
        : "Focus on improving customer experience and content results",
    });
  }

  // Growth Opportunity Insight
  if (context?.breakEvenClients && context.year1TargetClients) {
    const growthPotential =
      ((context.year1TargetClients - context.breakEvenClients.clientsPerYear) /
        context.breakEvenClients.clientsPerYear) *
      100;
    if (growthPotential > 50) {
      insights.push({
        id: "growth-opportunity",
        type: "success",
        title: isRTL ? "فرصة نمو كبيرة" : "Significant Growth Opportunity",
        description: isRTL
          ? `الهدف السنوي ${context.year1TargetClients} عميل أعلى بكثير من نقطة التعادل ${context.breakEvenClients.clientsPerYear} عميل. هذا يترك مجالاً كبيراً للنمو والربحية.`
          : `Annual target of ${context.year1TargetClients} clients is significantly higher than break-even ${context.breakEvenClients.clientsPerYear} clients. This leaves significant room for growth and profitability.`,
        action: isRTL
          ? "استثمر في توسيع الفريق وقدرات التسويق"
          : "Invest in team expansion and marketing capabilities",
      });
    }
  }

  // Filter out dismissed insights
  const visibleInsights = insights.filter(
    (insight) => !dismissedInsights.has(insight.id)
  );

  const dismissInsight = (id: string) => {
    setDismissedInsights((prev) => new Set([...prev, id]));
  };

  const getAlertVariant = (type: Insight["type"]) => {
    switch (type) {
      case "success":
        return "default";
      case "warning":
        return "default";
      case "critical":
        return "destructive";
      default:
        return "default";
    }
  };

  const getIcon = (type: Insight["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return <Lightbulb className="h-5 w-5 text-primary" />;
    }
  };

  if (visibleInsights.length === 0) {
    return null;
  }

  return (
    <section id="marketing-insights" className="mb-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {isRTL ? "رؤى وتوصيات التسويق" : "Marketing Insights & Recommendations"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isRTL
                ? "تحليلات تلقائية وتوصيات قابلة للتنفيذ لتحسين أداء التسويق"
                : "Automated analysis and actionable recommendations to improve marketing performance"}
            </p>
          </div>

          <div className="space-y-4">
            {visibleInsights.map((insight) => (
              <Alert
                key={insight.id}
                variant={getAlertVariant(insight.type)}
                className="relative"
              >
                <div className="flex items-start gap-3">
                  {getIcon(insight.type)}
                  <div className="flex-1 space-y-2">
                    <AlertTitle className="flex items-center justify-between">
                      <span>{insight.title}</span>
                      {insight.dismissible !== false && (
                        <button
                          onClick={() => dismissInsight(insight.id)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </AlertTitle>
                    <AlertDescription>{insight.description}</AlertDescription>
                    {insight.action && (
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          {insight.action}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}










