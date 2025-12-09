"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueProjection {
  month: string | number;
  clients: string | number;
  avgPrice: number;
  subscriptionMRR: string | number;
  addOnsMRR: number;
  totalMRR: string | number;
  cumulativeRevenue: string | number;
}

interface FinancialChartsProps {
  projections: RevenueProjection[];
  breakEven: {
    point: string;
    monthlyCosts: string;
    mrrNeeded: number;
  };
}

export function FinancialCharts({ projections, breakEven }: FinancialChartsProps) {
  const formatCurrency = (value: string | number) => {
    if (typeof value === "string") {
      return value;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const maxMRR = Math.max(
    ...projections.map((p) => {
      const mrr = typeof p.totalMRR === "string" ? parseFloat(p.totalMRR.replace(/[^0-9.]/g, "")) : p.totalMRR;
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
                const mrr = typeof proj.totalMRR === "string" 
                  ? parseFloat(proj.totalMRR.replace(/[^0-9.]/g, "")) 
                  : proj.totalMRR;
                const percentage = maxMRR > 0 ? (mrr / maxMRR) * 100 : 0;
                
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Month {proj.month}</span>
                      <span className="text-muted-foreground">{formatCurrency(proj.totalMRR)}</span>
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
                  {projections.map((proj, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/50">
                      <td className="p-2 text-sm">{proj.month}</td>
                      <td className="p-2 text-sm text-right">{proj.clients}</td>
                      <td className="p-2 text-sm text-right">{formatCurrency(proj.avgPrice)}</td>
                      <td className="p-2 text-sm text-right font-medium">{formatCurrency(proj.totalMRR)}</td>
                      <td className="p-2 text-sm text-right">{formatCurrency(proj.cumulativeRevenue)}</td>
                    </tr>
                  ))}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Break-Even Point</div>
              <div className="text-2xl font-bold">{breakEven.point}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Monthly Costs</div>
              <div className="text-2xl font-bold">{breakEven.monthlyCosts}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">MRR Needed</div>
              <div className="text-2xl font-bold">{formatCurrency(breakEven.mrrNeeded)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


