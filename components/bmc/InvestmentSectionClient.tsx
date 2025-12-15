"use client";

import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BMCCalculationsContext } from "./BMCMetricsClient";
import type { FinanceData } from "@/helpers/financialCalculations";
import { formatCurrency } from "@/helpers/financialCalculations";

interface InvestmentSectionClientProps {
  finance: FinanceData;
  locale: string;
  content: any;
}

export function InvestmentSectionClient({ finance, locale, content }: InvestmentSectionClientProps) {
  const context = useContext(BMCCalculationsContext);

  if (!context) {
    return null;
  }

  // Use investment from context (single source of truth)
  const { investment } = context;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.uiLabels.investmentRequired}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary/20 mb-6">
          <div className="text-3xl font-bold text-primary mb-2">
            {formatCurrency(investment.min, investment.currency)}
          </div>
          <div className="text-sm text-muted-foreground">
            {locale === 'ar'
              ? 'إجمالي الاستثمار الأولي (محسوب من جدول التكاليف)'
              : 'Total Initial Investment (Calculated from Cost Table)'}
          </div>
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
  );
}










