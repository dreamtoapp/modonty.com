"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Info, ChevronDown } from "lucide-react";
import type { FinanceData } from "@/helpers/financialCalculations";
import {
  calculateFinanceTotals,
  calculateCategoryTotal,
  formatCurrency,
  calculateBreakEvenFromFinance,
} from "@/helpers/financialCalculations";

interface CostsDashboardProps {
  finance: FinanceData;
}

export function CostsDashboard({
  finance,
}: CostsDashboardProps) {
  const totals = calculateFinanceTotals(finance);
  const breakEven = calculateBreakEvenFromFinance(finance);

  return (
    <TooltipProvider>
      <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">إجمالي التكاليف</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">شهرياً</p>
                <p className="text-2xl font-bold">{formatCurrency(totals.total, finance.currency)}</p>
              </div>
              <div className="border-t pt-2">
                <p className="text-xs text-muted-foreground mb-1">سنوياً</p>
                <p className="text-xl font-semibold">{formatCurrency(totals.total * 12, finance.currency)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">نقطة التعادل (عملاء)</CardTitle>
          </CardHeader>
          <CardContent>
            {breakEven ? (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">يحتاج اكتساب شهرياً</p>
                  <div className="flex items-center gap-2 text-xl font-semibold">
                    {breakEven.clientsPerMonth.toFixed(1)}
                    <Badge variant="secondary">عميل/شهر</Badge>
                  </div>
                </div>
                <div className="border-t pt-2">
                  <p className="text-xs text-muted-foreground mb-1">إجمالي العملاء المطلوبين سنوياً</p>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    {breakEven.clientsPerYear}
                    <Badge variant="outline">عميل/سنة</Badge>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">حساب نقطة التعادل</CardTitle>
          </CardHeader>
          <CardContent>
            {breakEven ? (
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  محسوبة: التكاليف السنوية ({formatCurrency(breakEven.annualCosts, finance.currency)}) ÷ سعر الباقة القياسية ({formatCurrency(breakEven.annualPricePerClient, finance.currency)}/سنة) = {breakEven.clientsPerYear} عميل/سنة
                </p>
                <p className="text-xs text-muted-foreground/70 pt-2 border-t">
                  العملاء يدفعون سنوياً مقدماً ({formatCurrency(breakEven.annualPricePerClient, finance.currency)})، لذا نحسب على أساس سنوي
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">تفصيل التكاليف</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fixed Costs */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground border-b pb-2">التكاليف الثابتة</h4>
            {[
              { key: "leadership", data: finance.costs.fixed.leadership },
              { key: "technical", data: finance.costs.fixed.technical },
              { key: "content", data: finance.costs.fixed.content },
              { key: "marketing-sales", data: finance.costs.fixed.marketingSales },
              { key: "operations", data: finance.costs.fixed.operations },
              { key: "infrastructure", data: finance.costs.fixed.infrastructure },
              { key: "overhead", data: finance.costs.fixed.overhead },
            ].map(({ key, data }) => {
              // Calculate category total dynamically from items (never use hardcoded total)
              const categoryTotal = calculateCategoryTotal(data.items);
              return (
                <Collapsible key={key} defaultOpen={true}>
                  <div className="border rounded-lg">
                    <CollapsibleTrigger className="w-full flex justify-between items-center p-3 hover:bg-muted/50 transition-colors rounded-t-lg">
                      <div className="flex items-center gap-2">
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                        <div className="text-sm font-semibold text-foreground">{data.label}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(categoryTotal, finance.currency)}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="space-y-1 p-3 pt-0 border-t">
                        {data.items.map((item, idx) => (
                          <div key={`${key}-${idx}`} className="flex justify-between items-center text-sm text-muted-foreground py-1">
                            <div className="flex items-center gap-2">
                              <span>{item.label}</span>
                              {item.details && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                      aria-label="معلومات إضافية"
                                    >
                                      <Info className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="left"
                                    className="max-w-xs text-xs bg-popover text-popover-foreground border border-border shadow-lg"
                                  >
                                    <p className="whitespace-normal">{item.details}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                            <span className="text-foreground">{formatCurrency(item.amount, finance.currency)}</span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>

          {/* Variable Costs */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground border-b pb-2">التكاليف المتغيرة</h4>
            {[
              { key: "marketing", data: finance.costs.variable.marketing },
            ].map(({ key, data }) => {
              // Calculate category total dynamically from items (never use hardcoded total)
              const categoryTotal = calculateCategoryTotal(data.items);
              return (
                <Collapsible key={key} defaultOpen={true}>
                  <div className="border rounded-lg">
                    <CollapsibleTrigger className="w-full flex justify-between items-center p-3 hover:bg-muted/50 transition-colors rounded-t-lg">
                      <div className="flex items-center gap-2">
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                        <div className="text-sm font-semibold text-foreground">{data.label}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(categoryTotal, finance.currency)}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="space-y-1 p-3 pt-0 border-t">
                        {data.items.map((item, idx) => (
                          <div key={`${key}-${idx}`} className="flex justify-between items-center text-sm text-muted-foreground py-1">
                            <div className="flex items-center gap-2">
                              <span>
                                {item.label}
                                {item.note && <span className="text-xs text-muted-foreground/70"> ({item.note})</span>}
                              </span>
                              {item.details && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                      aria-label="معلومات إضافية"
                                    >
                                      <Info className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="left"
                                    className="max-w-xs text-xs bg-popover text-popover-foreground border border-border shadow-lg"
                                  >
                                    <p className="whitespace-normal">{item.details}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                            <span className="text-foreground">
                              {item.amount > 0 ? formatCurrency(item.amount, finance.currency) : "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </CardContent>
      </Card>


      {finance.notes && finance.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ملاحظات</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pr-4">
              {finance.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      </div>
    </TooltipProvider>
  );
}

