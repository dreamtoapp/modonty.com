"use client";

import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BMCCalculationsContext } from "./BMCMetricsClient";
import type { FinanceData } from "@/helpers/financialCalculations";
import { formatCurrency } from "@/helpers/financialCalculations";

interface RevenueStreamsClientProps {
  finance: FinanceData;
  locale: string;
  content: any;
}

export function RevenueStreamsClient({ finance, locale, content }: RevenueStreamsClientProps) {
  const context = useContext(BMCCalculationsContext);

  // Use monthly revenue from selected plan
  const avgMonthlyRevenuePerClient = context?.monthlyRevenuePerClient || finance.revenue.averageMonthlyPerClient || 0;

  return (
    <Card className="bg-primary/5 border-2 border-primary/20">
      <CardHeader>
        <CardTitle>Subscription Plans</CardTitle>
        <Badge variant="outline">
          {locale === 'ar'
            ? `دفع سنوي - ${finance.revenue.recognitionModel?.recognitionPeriod || 18} شهر محتوى`
            : `Annual Payment - ${finance.revenue.recognitionModel?.recognitionPeriod || 18} Months Content`}
        </Badge>
        {context?.selectedPlan && (
          <div className="text-xs text-muted-foreground mt-2">
            {locale === 'ar'
              ? `الباقة المختارة: ${context.selectedPlan.label}`
              : `Selected Plan: ${context.selectedPlan.label}`}
          </div>
        )}
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
              {formatCurrency(avgMonthlyRevenuePerClient, finance.currency)}/M
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}










