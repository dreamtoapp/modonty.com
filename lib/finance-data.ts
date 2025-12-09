import type { FinanceData } from "@/helpers/financialCalculations";

export async function getFinanceData(locale: string): Promise<FinanceData> {
  if (locale === "ar") {
    const data = await import("./finance-data-ar.json");
    // Fix type assertion for metrics.cac.range tuple
    const finance = data.default as any;
    if (finance.metrics?.cac?.range && Array.isArray(finance.metrics.cac.range)) {
      finance.metrics.cac.range = finance.metrics.cac.range as [number, number];
    }
    return finance as FinanceData;
  }
  const data = await import("./finance-data.json");
  // Fix type assertion for metrics.cac.range tuple
  const finance = data.default as any;
  if (finance.metrics?.cac?.range && Array.isArray(finance.metrics.cac.range)) {
    finance.metrics.cac.range = finance.metrics.cac.range as [number, number];
  }
  return finance as FinanceData;
}

