'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinanceData } from "@/helpers/financialCalculations";
import { calculateFinanceTotals } from "@/helpers/financialCalculations";

interface CostsChartsProps {
  finance: FinanceData;
}

export function CostsCharts({ finance }: CostsChartsProps) {
  const { total, byCategory } = calculateFinanceTotals(finance);

  const allCategories = [
    { key: "leadership", label: finance.costs.fixed.leadership.label, value: byCategory.leadership ?? 0 },
    { key: "technical", label: finance.costs.fixed.technical.label, value: byCategory.technical ?? 0 },
    { key: "content", label: finance.costs.fixed.content.label, value: byCategory.content ?? 0 },
    { key: "marketing-sales", label: finance.costs.fixed.marketingSales.label, value: byCategory["marketing-sales"] ?? 0 },
    { key: "operations", label: finance.costs.fixed.operations.label, value: byCategory.operations ?? 0 },
    { key: "infrastructure", label: finance.costs.fixed.infrastructure.label, value: byCategory.infrastructure ?? 0 },
    { key: "overhead", label: finance.costs.fixed.overhead.label, value: byCategory.overhead ?? 0 },
    { key: "marketing", label: finance.costs.variable.marketing.label, value: byCategory.marketing ?? 0 },
  ].filter(cat => cat.value > 0);

  const allItems = [
    ...finance.costs.fixed.leadership.items.map(item => ({ ...item, category: finance.costs.fixed.leadership.label })),
    ...finance.costs.fixed.technical.items.map(item => ({ ...item, category: finance.costs.fixed.technical.label })),
    ...finance.costs.fixed.content.items.map(item => ({ ...item, category: finance.costs.fixed.content.label })),
    ...finance.costs.fixed.marketingSales.items.map(item => ({ ...item, category: finance.costs.fixed.marketingSales.label })),
    ...finance.costs.fixed.operations.items.map(item => ({ ...item, category: finance.costs.fixed.operations.label })),
    ...finance.costs.fixed.infrastructure.items.map(item => ({ ...item, category: finance.costs.fixed.infrastructure.label })),
    ...finance.costs.fixed.overhead.items.map(item => ({ ...item, category: finance.costs.fixed.overhead.label })),
    ...finance.costs.variable.marketing.items.map(item => ({ ...item, category: finance.costs.variable.marketing.label })),
  ].filter(item => item.amount > 0);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">تفصيل التكاليف حسب الفئة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {allCategories.map((cat) => {
            const percent = total ? Math.round((cat.value / total) * 100) : 0;
            return (
              <div key={cat.key} className="space-y-1">
                <div className="flex justify-between text-sm font-medium text-foreground">
                  <span>{cat.label}</span>
                  <span className="text-muted-foreground">
                    {cat.value.toLocaleString()} {finance.currency}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">أهم البنود</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {allItems
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5)
            .map((item, idx) => (
              <div key={`${item.label}-${idx}`} className="flex justify-between text-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                </div>
                <span className="text-muted-foreground">{item.amount.toLocaleString()} {finance.currency}</span>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}

