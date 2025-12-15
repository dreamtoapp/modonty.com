"use client";

import { useState, useMemo, createContext, useContext } from "react";
import { PlanSelector } from "./PlanSelector";
import { BMCDynamicMetrics } from "./BMCDynamicMetrics";
import { BMCVisualCanvasClient } from "./BMCVisualCanvasClient";
import type { FinanceData } from "@/helpers/financialCalculations";
import {
  calculateFinanceTotals,
  calculateInvestmentFromCosts,
  calculateBreakEvenUnified,
} from "@/helpers/financialCalculations";

interface Plan {
  id: string;
  key: string;
  label: string;
  description: string | null;
  type: string;
  isActive: boolean;
  metadata: any;
}

interface BMCMetricsClientProps {
  finance: FinanceData;
  plans: Plan[];
  locale: string;
  content: any;
  defaultPlanKey?: string;
  showCanvas?: boolean;
  canvas?: any;
  children?: React.ReactNode;
}

// Context to share selected plan and all calculated values
export const BMCCalculationsContext = createContext<{
  selectedPlan: Plan | null;
  monthlyRevenuePerClient: number;
  calculatedYear1MRR: number;
  totals: ReturnType<typeof calculateFinanceTotals>;
  investment: ReturnType<typeof calculateInvestmentFromCosts>;
  breakEvenClients: ReturnType<typeof calculateBreakEvenUnified> | null;
  year1TargetClients: number;
} | null>(null);

export function useBMCCalculations() {
  const context = useContext(BMCCalculationsContext);
  if (!context) {
    throw new Error('useBMCCalculations must be used within BMCMetricsClient');
  }
  return context;
}

export function BMCMetricsClient({
  finance,
  plans,
  locale,
  content,
  defaultPlanKey = 'subscription-standard',
  showCanvas = false,
  canvas,
  children,
}: BMCMetricsClientProps) {
  const [selectedPlanKey, setSelectedPlanKey] = useState(defaultPlanKey);

  const selectedPlan = plans.find((p) => p.key === selectedPlanKey) || plans.find((p) => p.key === defaultPlanKey) || null;

  // Centralized calculations using useMemo
  const calculations = useMemo(() => {
    // Calculate monthly revenue from selected plan: annualPrice / 12 months
    const annualPrice = selectedPlan?.metadata?.annualPrice as number | undefined;
    const monthlyRevenuePerClient = annualPrice && annualPrice > 0
      ? annualPrice / 12
      : (finance.revenue.averageMonthlyPerClient || 0);

    // Calculate all financial metrics
    const totals = calculateFinanceTotals(finance);
    const investment = calculateInvestmentFromCosts(finance);

    // Calculate break-even using correct accounting method: Annual Costs ÷ Annual Price
    const breakEvenClients = annualPrice && annualPrice > 0
      ? calculateBreakEvenUnified(finance, annualPrice)
      : null;

    // Year 1 calculations
    const year1TargetClients = finance.revenue.year1Target.clients;
    const calculatedYear1MRR = year1TargetClients * monthlyRevenuePerClient;

    return {
      selectedPlan,
      monthlyRevenuePerClient,
      calculatedYear1MRR,
      totals,
      investment,
      breakEvenClients,
      year1TargetClients,
    };
  }, [finance, selectedPlan]);

  return (
    <BMCCalculationsContext.Provider value={calculations}>
      <PlanSelector
        plans={plans}
        selectedPlanKey={selectedPlanKey}
        onPlanChange={setSelectedPlanKey}
        locale={locale}
        currency={finance.currency || 'SAR'}
      />

      <BMCDynamicMetrics
        finance={finance}
        selectedPlan={selectedPlan}
        locale={locale}
        content={content}
      />

      {showCanvas && canvas && (
        <BMCVisualCanvasClient canvas={canvas} />
      )}

      {children}
    </BMCCalculationsContext.Provider>
  );
}











