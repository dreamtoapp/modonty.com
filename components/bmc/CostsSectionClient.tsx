"use client";

import { useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricDisplay } from "@/components/bmc/BMCSection";
import { DollarSign } from "lucide-react";
import { BMCCalculationsContext } from "./BMCMetricsClient";
import type { FinanceData } from "@/helpers/financialCalculations";
import { formatCurrency, calculateCategoryTotal } from "@/helpers/financialCalculations";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface CostsSectionClientProps {
  finance: FinanceData;
  locale: string;
}

export function CostsSectionClient({ finance, locale }: CostsSectionClientProps) {
  const context = useContext(BMCCalculationsContext);

  if (!context) {
    return null;
  }

  // Use values from context (single source of truth)
  const { totals, breakEvenClients } = context;

  return (
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
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-primary/5 h-full">
              <CardContent className="p-4 md:p-6 flex flex-col h-full">
                <div className="text-xs md:text-sm text-muted-foreground mb-2 break-words leading-tight min-h-[2.5rem]">
                  {locale === 'ar' ? 'إجمالي التكاليف' : 'Total Costs'}
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'شهرياً' : 'Monthly'}</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(totals.total, finance.currency)}</p>
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      <p>{locale === 'ar' ? `ثابت: ${formatCurrency(totals.fixed, finance.currency)}` : `Fixed: ${formatCurrency(totals.fixed, finance.currency)}`}</p>
                      <p>{locale === 'ar' ? `متغير: ${formatCurrency(totals.variable, finance.currency)}` : `Variable: ${formatCurrency(totals.variable, finance.currency)}`}</p>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-xs text-muted-foreground mb-1">{locale === 'ar' ? 'سنوياً' : 'Yearly'}</p>
                    <p className="text-xl font-semibold text-foreground">{formatCurrency(totals.total * 12, finance.currency)}</p>
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      <p>{locale === 'ar' ? `ثابت: ${formatCurrency(totals.fixed * 12, finance.currency)}` : `Fixed: ${formatCurrency(totals.fixed * 12, finance.currency)}`}</p>
                      <p>{locale === 'ar' ? `متغير: ${formatCurrency(totals.variable * 12, finance.currency)}` : `Variable: ${formatCurrency(totals.variable * 12, finance.currency)}`}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {breakEvenClients ? (
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
          </div>
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                {locale === 'ar' ? 'تفصيل التكاليف حسب الفئة' : 'Cost Breakdown by Category'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'ar' ? 'القيادة' : 'Leadership'}</p>
                  <p className="font-semibold">{formatCurrency(totals.byCategory.leadership, finance.currency)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'ar' ? 'تقني' : 'Technical'}</p>
                  <p className="font-semibold">{formatCurrency(totals.byCategory.technical, finance.currency)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'ar' ? 'محتوى' : 'Content'}</p>
                  <p className="font-semibold">{formatCurrency(totals.byCategory.content, finance.currency)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'ar' ? 'تسويق ومبيعات' : 'Marketing & Sales'}</p>
                  <p className="font-semibold">{formatCurrency(totals.byCategory.marketingSales, finance.currency)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'ar' ? 'عمليات' : 'Operations'}</p>
                  <p className="font-semibold">{formatCurrency(totals.byCategory.operations, finance.currency)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'ar' ? 'بنية تحتية' : 'Infrastructure'}</p>
                  <p className="font-semibold">{formatCurrency(totals.byCategory.infrastructure, finance.currency)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'ar' ? 'مصاريف عامة' : 'Overhead'}</p>
                  <p className="font-semibold">{formatCurrency(totals.byCategory.overhead, finance.currency)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'ar' ? 'تسويق (متغير)' : 'Marketing (Variable)'}</p>
                  <p className="font-semibold">{formatCurrency(totals.byCategory.marketing, finance.currency)}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">{locale === 'ar' ? 'المجموع' : 'Total'}</span>
                  <span className="text-lg font-bold">{formatCurrency(totals.total, finance.currency)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fixed Costs Breakdown */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                {locale === 'ar' ? 'تفصيل التكاليف الثابتة' : 'Fixed Costs Breakdown'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'رواتب الفريق' : 'Team Salaries'}</div>
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
                  <div className="text-xs text-muted-foreground mt-1">{locale === 'ar' ? 'شهرياً' : 'per month'}</div>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'البنية التحتية' : 'Infrastructure'}</div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(totals.byCategory.infrastructure || 0, finance.currency)}
                  </div>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'المصاريف العامة' : 'Overhead'}</div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(totals.byCategory.overhead || 0, finance.currency)}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
                <div className="text-lg font-semibold text-primary">
                  {locale === 'ar' ? 'إجمالي التكاليف الثابتة' : 'Total Fixed Costs'}: {formatCurrency(totals.fixed, finance.currency)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost by Phase (if available) */}
          {finance.costs?.byPhase && (finance.costs.byPhase.launch || finance.costs.byPhase.growth || finance.costs.byPhase.scale) && (
            <Collapsible>
              <Card className="bg-muted/30">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-sm font-semibold">
                      {locale === 'ar' ? 'هيكل التكاليف حسب المرحلة' : 'Cost Structure by Phase'}
                    </CardTitle>
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { key: 'launch', phase: finance.costs.byPhase.launch, label: locale === 'ar' ? 'الإطلاق' : 'Launch' },
                        { key: 'growth', phase: finance.costs.byPhase.growth, label: locale === 'ar' ? 'النمو' : 'Growth' },
                        { key: 'scale', phase: finance.costs.byPhase.scale, label: locale === 'ar' ? 'التوسع' : 'Scale' },
                      ].filter(({ phase }) => phase).map(({ key, phase, label }) => (
                        <div key={key} className="p-4 bg-background rounded-lg border">
                          <div className="font-semibold mb-3">{phase?.months || label}</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>{locale === 'ar' ? 'الفريق' : 'Team'}:</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  (phase?.leadership || 0) +
                                  (phase?.technical || 0) +
                                  (phase?.content || 0) +
                                  (phase?.marketingSales || 0) +
                                  (phase?.operations || 0),
                                  finance.currency
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>{locale === 'ar' ? 'التسويق' : 'Marketing'}:</span>
                              <span className="font-medium">
                                {formatCurrency(phase?.marketing || 0, finance.currency)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>{locale === 'ar' ? 'البنية التحتية' : 'Infrastructure'}:</span>
                              <span className="font-medium">
                                {formatCurrency(phase?.infrastructure || 0, finance.currency)}
                              </span>
                            </div>
                            <div className="pt-2 border-t mt-2">
                              <div className="flex justify-between font-bold">
                                <span>{locale === 'ar' ? 'المجموع' : 'Total'}:</span>
                                <span>{formatCurrency(phase?.total || 0, finance.currency)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}
        </CardContent>
      </Card>
    </div>
  );
}










