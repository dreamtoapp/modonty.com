"use client";

import { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MetricDisplay } from "@/components/bmc/BMCSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { formatCurrency } from "@/helpers/financialCalculations";
import type { FinanceData } from "@/helpers/financialCalculations";
import { BMCCalculationsContext } from "./BMCMetricsClient";

interface BMCDynamicMetricsProps {
  finance: FinanceData;
  selectedPlan: any;
  locale: string;
  content: any;
}

export function BMCDynamicMetrics({
  finance,
  selectedPlan: _selectedPlan,
  locale,
  content,
}: BMCDynamicMetricsProps) {
  const context = useContext(BMCCalculationsContext);

  if (!context) {
    return null;
  }

  // Use all values from context (single source of truth)
  const {
    selectedPlan,
    monthlyRevenuePerClient,
    calculatedYear1MRR,
    breakEvenClients,
    year1TargetClients,
  } = context;


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 items-stretch">
      {/* Break-even */}
      <Card className="bg-success/5 h-full">
        <CardContent className="p-4 md:p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs md:text-sm text-muted-foreground break-words leading-tight min-h-[2.5rem] flex-1">
              {content.uiLabels.breakEven}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-1"
                    aria-label={locale === 'ar' ? 'شرح الحساب' : 'Calculation explanation'}
                  >
                    <Info className="h-4 w-4 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="max-w-sm text-xs bg-popover text-popover-foreground border border-border shadow-lg p-4"
                >
                  <div className="space-y-2">
                    <p className="font-semibold mb-2">
                      {locale === 'ar' ? 'كيف يتم حساب نقطة التعادل؟' : 'How is break-even calculated?'}
                    </p>
                    {breakEvenClients ? (
                      <>
                        <p className="whitespace-normal">
                          {locale === 'ar'
                            ? `التكاليف السنوية: ${formatCurrency(breakEvenClients.annualCosts, finance.currency)}`
                            : `Annual Costs: ${formatCurrency(breakEvenClients.annualCosts, finance.currency)}`}
                        </p>
                        <p className="whitespace-normal">
                          {locale === 'ar'
                            ? `${selectedPlan?.label || 'الباقة'} - السعر السنوي: ${formatCurrency(breakEvenClients.annualPricePerClient, finance.currency)}/سنة`
                            : `${selectedPlan?.label || 'Plan'} - Annual Price: ${formatCurrency(breakEvenClients.annualPricePerClient, finance.currency)}/year`}
                        </p>
                        <p className="whitespace-normal font-medium">
                          {locale === 'ar'
                            ? `العملاء المطلوبين سنوياً = ${formatCurrency(breakEvenClients.annualCosts, finance.currency)} ÷ ${formatCurrency(breakEvenClients.annualPricePerClient, finance.currency)} = ${breakEvenClients.clientsPerYear} عميل/سنة`
                            : `Clients Needed per Year = ${formatCurrency(breakEvenClients.annualCosts, finance.currency)} ÷ ${formatCurrency(breakEvenClients.annualPricePerClient, finance.currency)} = ${breakEvenClients.clientsPerYear} clients/year`}
                        </p>
                        <p className="whitespace-normal text-xs text-muted-foreground mt-1">
                          {locale === 'ar'
                            ? `المتوسط الشهري = ${breakEvenClients.clientsPerYear} ÷ 12 = ${breakEvenClients.clientsPerMonth} عميل/شهر`
                            : `Monthly Average = ${breakEvenClients.clientsPerYear} ÷ 12 = ${breakEvenClients.clientsPerMonth} clients/month`}
                        </p>
                        <p className="whitespace-normal text-xs text-muted-foreground mt-1 pl-2 border-l-2 border-border">
                          {locale === 'ar'
                            ? `ملاحظة: الإيراد الشهري = السعر السنوي ÷ 12 شهر (جميع الحسابات تستخدم ${selectedPlan?.label || 'الباقة المختارة'} من جدول SourceOfIncome)`
                            : `Note: Monthly Revenue = Annual Price ÷ 12 months (All calculations use ${selectedPlan?.label || 'selected plan'} from SourceOfIncome table)`}
                        </p>
                        <p className="whitespace-normal text-muted-foreground mt-2">
                          {locale === 'ar'
                            ? `هذا هو عدد العملاء المطلوبين شهرياً لتغطية التكاليف الشهرية والوصول إلى نقطة التعادل`
                            : `This is the number of clients needed monthly to cover monthly costs and reach break-even`}
                        </p>
                      </>
                    ) : (
                      <p className="whitespace-normal">
                        {locale === 'ar'
                          ? 'نقطة التعادل = التكاليف الشهرية ÷ متوسط الإيراد الشهري لكل عميل. عدد العملاء المطلوبين شهرياً لتغطية التكاليف.'
                          : 'Break-even = Monthly Costs ÷ Average Monthly Revenue per Client. Number of clients needed monthly to cover costs.'}
                      </p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-1 flex-1">
            {breakEvenClients ? (
              <>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-words leading-tight">
                  {breakEvenClients.clientsPerMonth} {locale === 'ar' ? 'عميل/شهر' : 'clients/M'}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {breakEvenClients.clientsPerYear} {locale === 'ar' ? 'عميل/سنة' : 'clients/year'}
                </div>
              </>
            ) : (
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-words leading-tight">
                —
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Year 1 Target Clients */}
      <Card className="bg-primary/5 h-full">
        <CardContent className="p-4 md:p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs md:text-sm text-muted-foreground break-words leading-tight min-h-[2.5rem] flex-1">
              {content.uiLabels.year1TargetClients}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-1"
                    aria-label={locale === 'ar' ? 'شرح الحساب' : 'Calculation explanation'}
                  >
                    <Info className="h-4 w-4 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="max-w-sm text-xs bg-popover text-popover-foreground border border-border shadow-lg p-4"
                >
                  <div className="space-y-2">
                    <p className="font-semibold mb-2">
                      {locale === 'ar' ? 'كيف يتم حساب الهدف السنوي؟' : 'How is the annual target calculated?'}
                    </p>
                    <p className="whitespace-normal">
                      {locale === 'ar'
                        ? `عدد العملاء المستهدفين: ${year1TargetClients} عميل`
                        : `Target Clients: ${year1TargetClients} clients`}
                    </p>
                    <p className="whitespace-normal">
                      {locale === 'ar'
                        ? `${selectedPlan?.label || 'الباقة'} - الإيراد الشهري المعترف به: ${formatCurrency(monthlyRevenuePerClient, finance.currency)}/شهر`
                        : `${selectedPlan?.label || 'Plan'} - Monthly Recognized Revenue: ${formatCurrency(monthlyRevenuePerClient, finance.currency)}/month`}
                    </p>
                    {selectedPlan && (
                      <>
                        <p className="whitespace-normal text-xs text-muted-foreground">
                          {locale === 'ar'
                            ? `(من جدول SourceOfIncome - key: ${selectedPlan.key})`
                            : `(From SourceOfIncome table - key: ${selectedPlan.key})`}
                        </p>
                        {selectedPlan.metadata?.annualPrice && (
                          <p className="whitespace-normal text-xs text-muted-foreground">
                            {locale === 'ar'
                              ? `الحساب: ${formatCurrency(selectedPlan.metadata.annualPrice, finance.currency)} ÷ 12 = ${formatCurrency(monthlyRevenuePerClient, finance.currency)}/شهر`
                              : `Calculation: ${formatCurrency(selectedPlan.metadata.annualPrice, finance.currency)} ÷ 12 = ${formatCurrency(monthlyRevenuePerClient, finance.currency)}/month`}
                          </p>
                        )}
                      </>
                    )}
                    <p className="whitespace-normal font-medium">
                      {locale === 'ar'
                        ? `الإيراد السنوي = ${formatCurrency(monthlyRevenuePerClient, finance.currency)} × 12 شهر = ${formatCurrency(monthlyRevenuePerClient * 12, finance.currency)}`
                        : `Annual Revenue = ${formatCurrency(monthlyRevenuePerClient, finance.currency)} × 12 months = ${formatCurrency(monthlyRevenuePerClient * 12, finance.currency)}`}
                    </p>
                    <p className="whitespace-normal text-muted-foreground mt-2">
                      {locale === 'ar'
                        ? `هذا هو الهدف المخطط للوصول إليه بحلول نهاية السنة الأولى من التشغيل`
                        : `This is the planned target to reach by the end of the first year of operation`}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-1 flex-1">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-words leading-tight">
              {Math.round(year1TargetClients / 12)} {locale === 'ar' ? 'عميل/شهر' : 'clients/M'}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              {year1TargetClients} {locale === 'ar' ? 'عميل/سنة' : 'clients/year'}
            </div>
            <div className="text-xs text-muted-foreground mt-1 pt-1 border-t">
              {formatCurrency(monthlyRevenuePerClient * 12, finance.currency)}/year
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Year 1 MRR Target */}
      <Card className="bg-success/5 h-full">
        <CardContent className="p-4 md:p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs md:text-sm text-muted-foreground break-words leading-tight min-h-[2.5rem] flex-1">
              {content.uiLabels.year1MRRTarget}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-1"
                    aria-label={locale === 'ar' ? 'شرح الحساب' : 'Calculation explanation'}
                  >
                    <Info className="h-4 w-4 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="max-w-sm text-xs bg-popover text-popover-foreground border border-border shadow-lg p-4"
                >
                  <div className="space-y-2">
                    <p className="font-semibold mb-2">
                      {locale === 'ar' ? 'كيف يتم حساب MRR المستهدف؟' : 'How is the target MRR calculated?'}
                    </p>
                    <p className="whitespace-normal">
                      {locale === 'ar'
                        ? `عدد العملاء المستهدفين: ${year1TargetClients} عميل`
                        : `Target Clients: ${year1TargetClients} clients`}
                    </p>
                    <p className="whitespace-normal">
                      {locale === 'ar'
                        ? `${selectedPlan?.label || 'الباقة'} - الإيراد الشهري المعترف به: ${formatCurrency(monthlyRevenuePerClient, finance.currency)}/شهر`
                        : `${selectedPlan?.label || 'Plan'} - Monthly Recognized Revenue: ${formatCurrency(monthlyRevenuePerClient, finance.currency)}/month`}
                    </p>
                    {selectedPlan && (
                      <>
                        <p className="whitespace-normal text-xs text-muted-foreground">
                          {locale === 'ar'
                            ? `(من جدول SourceOfIncome - key: ${selectedPlan.key})`
                            : `(From SourceOfIncome table - key: ${selectedPlan.key})`}
                        </p>
                        {selectedPlan.metadata?.annualPrice && (
                          <p className="whitespace-normal text-xs text-muted-foreground">
                            {locale === 'ar'
                              ? `الحساب: ${formatCurrency(selectedPlan.metadata.annualPrice, finance.currency)} ÷ 12 = ${formatCurrency(monthlyRevenuePerClient, finance.currency)}/شهر`
                              : `Calculation: ${formatCurrency(selectedPlan.metadata.annualPrice, finance.currency)} ÷ 12 = ${formatCurrency(monthlyRevenuePerClient, finance.currency)}/month`}
                          </p>
                        )}
                      </>
                    )}
                    <p className="whitespace-normal font-medium mt-2">
                      {locale === 'ar'
                        ? `MRR المستهدف = ${year1TargetClients} عميل × ${formatCurrency(monthlyRevenuePerClient, finance.currency)} = ${formatCurrency(calculatedYear1MRR, finance.currency)}/شهر`
                        : `Target MRR = ${year1TargetClients} clients × ${formatCurrency(monthlyRevenuePerClient, finance.currency)} = ${formatCurrency(calculatedYear1MRR, finance.currency)}/month`}
                    </p>
                    <p className="whitespace-normal text-muted-foreground mt-2">
                      {locale === 'ar'
                        ? `هذا هو الإيراد الشهري المعترف به (MRR) المتوقع عند الوصول إلى ${year1TargetClients} عميل`
                        : `This is the expected Monthly Recurring Revenue (MRR) when reaching ${year1TargetClients} clients`}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-1 flex-1">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-words leading-tight">
              {formatCurrency(calculatedYear1MRR, finance.currency)}/M
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              {formatCurrency(calculatedYear1MRR * 12, finance.currency)}/year
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}










