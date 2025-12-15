"use client";

import { useContext } from "react";
import { FinancialCharts } from "./FinancialCharts";
import { BMCCalculationsContext } from "./BMCMetricsClient";
import type { FinanceData } from "@/helpers/financialCalculations";

interface FinancialChartsClientProps {
  finance: FinanceData;
}

export function FinancialChartsClient({ finance }: FinancialChartsClientProps) {
  const context = useContext(BMCCalculationsContext);

  if (!context || !context.breakEvenClients) {
    return null;
  }

  // Use breakEvenClients from context (single source of truth)
  // Convert to format expected by FinancialCharts component
  const breakEven = {
    clientsPerYear: context.breakEvenClients.clientsPerYear,
    clientsPerMonth: context.breakEvenClients.clientsPerMonth,
    monthlyCosts: context.breakEvenClients.monthlyCosts,
    annualCosts: context.breakEvenClients.annualCosts,
    annualPricePerClient: context.breakEvenClients.annualPricePerClient,
  };

  return <FinancialCharts finance={finance} breakEven={breakEven} />;
}










