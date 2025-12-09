"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinanceData } from "@/helpers/financialCalculations";
import { formatCurrency } from "@/helpers/financialCalculations";

interface FinancialChartsProps {
  finance: FinanceData;
  breakEven: {
    clientsPerYear: number;
    clientsPerMonth: number;
    monthlyCosts: number;
    annualCosts: number;
    annualPricePerClient: number;
  } | null;
}

export function FinancialCharts({ finance, breakEven }: FinancialChartsProps) {
  const projections = finance.revenue.projections || [];
  
  const maxMRR = Math.max(
    ...projections.map((p) => {
      const mrr = typeof p.monthlyRecognizedRevenue === "string" 
        ? parseFloat(p.monthlyRecognizedRevenue.replace(/[^0-9.]/g, "")) 
        : (typeof p.monthlyRecognizedRevenue === "number" ? p.monthlyRecognizedRevenue : 0);
      return mrr || 0;
    })
  );

  return (
    <div className="space-y-8">
      {/* Revenue Projections Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Projections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chart Bars */}
            <div className="space-y-3">
              {projections.map((proj, idx) => {
                const mrr = typeof proj.monthlyRecognizedRevenue === "string" 
                  ? parseFloat(proj.monthlyRecognizedRevenue.replace(/[^0-9.]/g, "")) 
                  : (typeof proj.monthlyRecognizedRevenue === "number" ? proj.monthlyRecognizedRevenue : 0);
                const percentage = maxMRR > 0 ? (mrr / maxMRR) * 100 : 0;
                
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Month {proj.month}</span>
                      <span className="text-muted-foreground">{formatCurrency(mrr, finance.currency)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-xs text-primary-foreground font-medium">
                          {proj.clients} clients
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-sm font-semibold">Month</th>
                    <th className="text-right p-2 text-sm font-semibold">Clients</th>
                    <th className="text-right p-2 text-sm font-semibold">Avg Price</th>
                    <th className="text-right p-2 text-sm font-semibold">Total MRR</th>
                    <th className="text-right p-2 text-sm font-semibold">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((proj, idx) => {
                    const mrr = typeof proj.monthlyRecognizedRevenue === "string" 
                      ? parseFloat(proj.monthlyRecognizedRevenue.replace(/[^0-9.]/g, "")) 
                      : (typeof proj.monthlyRecognizedRevenue === "number" ? proj.monthlyRecognizedRevenue : 0);
                    const cumulative = typeof proj.cumulativeAnnualRevenue === "string"
                      ? parseFloat(proj.cumulativeAnnualRevenue.replace(/[^0-9.]/g, ""))
                      : (typeof proj.cumulativeAnnualRevenue === "number" ? proj.cumulativeAnnualRevenue : 0);
                    const avgPrice = finance.revenue.averageAnnualPrice;
                    
                    return (
                      <tr key={idx} className="border-b hover:bg-muted/50">
                        <td className="p-2 text-sm">{proj.month}</td>
                        <td className="p-2 text-sm text-right">{proj.clients}</td>
                        <td className="p-2 text-sm text-right">{formatCurrency(avgPrice, finance.currency)}</td>
                        <td className="p-2 text-sm text-right font-medium">{formatCurrency(mrr, finance.currency)}</td>
                        <td className="p-2 text-sm text-right">{formatCurrency(cumulative, finance.currency)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Break-Even Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Break-Even Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {breakEven ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Clients Needed Per Year</div>
                <div className="text-2xl font-bold">{breakEven.clientsPerYear}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {breakEven.clientsPerMonth.toFixed(1)} clients/M to acquire
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Monthly Costs</div>
                <div className="text-2xl font-bold">{formatCurrency(breakEven.monthlyCosts, finance.currency)}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Annual Costs</div>
                <div className="text-2xl font-bold">{formatCurrency(breakEven.annualCosts, finance.currency)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Price per client: {formatCurrency(breakEven.annualPricePerClient, finance.currency)}/year
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">Break-even data not available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


