"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/financialCalculations";

interface Plan {
  id: string;
  key: string;
  label: string;
  description: string | null;
  type: string;
  isActive: boolean;
  metadata: any;
}

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlanKey: string;
  onPlanChange: (planKey: string) => void;
  locale: string;
  currency: string;
}

export function PlanSelector({
  plans,
  selectedPlanKey,
  onPlanChange,
  locale,
  currency,
}: PlanSelectorProps) {
  const selectedPlan = plans.find((p) => p.key === selectedPlanKey);
  const annualPrice = selectedPlan?.metadata?.annualPrice as number | undefined;
  // Calculate monthly revenue: annualPrice / 12 months
  const monthlyRevenue = annualPrice && annualPrice > 0 ? annualPrice / 12 : undefined;

  return (
    <Card className="mb-6 border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{locale === 'ar' ? 'اختر باقة الاشتراك' : 'Select Subscription Plan'}</span>
        </CardTitle>
        <CardDescription>
          {locale === 'ar'
            ? 'اختر الباقة لرؤية الحسابات بناءً على بياناتها من قاعدة البيانات'
            : 'Select a plan to see calculations based on its data from the database'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plan-select">
            {locale === 'ar' ? 'الباقة' : 'Plan'}
          </Label>
          <Select value={selectedPlanKey} onValueChange={onPlanChange}>
            <SelectTrigger id="plan-select" className="w-full">
              <SelectValue placeholder={locale === 'ar' ? 'اختر الباقة' : 'Select plan'} />
            </SelectTrigger>
            <SelectContent>
              {plans.map((plan) => {
                const planAnnualPrice = plan.metadata?.annualPrice as number | undefined;
                const planMonthlyRevenue = planAnnualPrice && planAnnualPrice > 0 ? planAnnualPrice / 12 : undefined;
                return (
                  <SelectItem key={plan.key} value={plan.key}>
                    <div className="flex flex-col">
                      <span className="font-medium">{plan.label}</span>
                      {planMonthlyRevenue && (
                        <span className="text-xs text-muted-foreground">
                          {formatCurrency(planMonthlyRevenue, currency)}/month
                        </span>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {selectedPlan && monthlyRevenue && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-primary/5 rounded-lg">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {locale === 'ar' ? 'الباقة المختارة' : 'Selected Plan'}
              </div>
              <div className="font-semibold">{selectedPlan.label}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {locale === 'ar' ? 'الإيراد الشهري المعترف به' : 'Monthly Recognized Revenue'}
              </div>
              <div className="font-semibold text-primary">
                {formatCurrency(monthlyRevenue, currency)}/M
              </div>
            </div>
            {annualPrice && (
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  {locale === 'ar' ? 'السعر السنوي' : 'Annual Price'}
                </div>
                <div className="font-semibold">
                  {formatCurrency(annualPrice, currency)}/year
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}










