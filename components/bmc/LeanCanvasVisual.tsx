"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LeanCanvasData } from "@/helpers/leanCanvasMapper";

interface LeanCanvasVisualProps {
  canvas: LeanCanvasData;
  monthlyRecognizedRevenue?: number;
}

export function LeanCanvasVisual({
  canvas,
  monthlyRecognizedRevenue,
}: LeanCanvasVisualProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] lg:min-w-0">
        {/* Official Lean Canvas - 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
          {/* Left Column - Problem, Customer Segments, Solution */}
          <div className="flex flex-col gap-3 order-1 lg:order-none">
            {/* Problem */}
            <Card className="bg-destructive/5 border-2 border-destructive/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-destructive">
                  PROBLEM
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.problem.map((problem, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    {idx + 1}. {problem}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Customer Segments */}
            <Card className="bg-warning/5 border-2 border-warning/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-warning">
                  CUSTOMER SEGMENTS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.customerSegments.slice(0, 6).map((segment, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    • {segment}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="bg-success/5 border-2 border-success/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-success">
                  SOLUTION
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.solution.map((solution, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    {idx + 1}. {solution}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Unique Value Proposition */}
          <div className="flex order-2 lg:order-none self-stretch">
            <Card className="w-full h-full bg-gradient-to-br from-chart-4/15 via-chart-4/10 to-chart-4/5 border-2 border-chart-4/40 shadow-md">
              <CardHeader className="p-3 border-b border-chart-4/20 bg-chart-4/5">
                <CardTitle className="text-sm font-bold text-chart-4 text-center">
                  UNIQUE VALUE PROPOSITION
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-2">
                {canvas.uniqueValueProposition.length > 0 && (
                  <div className="text-xs font-bold text-chart-4 mb-2 text-center px-2 py-1.5 bg-chart-4/10 rounded border border-chart-4/30">
                    ★ {canvas.uniqueValueProposition[0]}
                  </div>
                )}
                <div className="space-y-1">
                  {canvas.uniqueValueProposition.slice(1, 8).map((prop, idx) => (
                    <div key={idx} className="text-xs text-foreground">
                      • {prop}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Channels, Revenue, Cost, Metrics, Advantage */}
          <div className="flex flex-col gap-3 order-3 lg:order-none">
            {/* Channels */}
            <Card className="bg-accent/5 border-2 border-accent/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-accent">
                  CHANNELS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.channels.slice(0, 5).map((channel, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    • {channel}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Revenue Streams */}
            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-primary">
                  REVENUE STREAMS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="font-bold text-primary">• Pay 12, Get 18</div>
                  <div>• Annual Subscriptions</div>
                  <div>• Upfront Payment</div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {(monthlyRecognizedRevenue
                        ? (monthlyRecognizedRevenue / 1000).toFixed(0)
                        : canvas.revenueStreams.targetMix?.totalMRR
                          ? (canvas.revenueStreams.targetMix.totalMRR / 1000).toFixed(0)
                          : "0")}
                      K SAR/mo
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Structure */}
            <Card className="bg-destructive/5 border-2 border-destructive/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-destructive">
                  COST STRUCTURE
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• {canvas.costStructure.total}</div>
                  <div className="mt-2 text-xs font-semibold text-destructive">
                    Fixed + Variable
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="bg-chart-2/5 border-2 border-chart-2/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-chart-2">
                  KEY METRICS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.keyMetrics.cac && (
                  <div className="text-xs text-muted-foreground">
                    CAC: <span className="font-semibold">{canvas.keyMetrics.cac}</span>
                  </div>
                )}
                {canvas.keyMetrics.ltv && (
                  <div className="text-xs text-muted-foreground">
                    LTV: <span className="font-semibold">{canvas.keyMetrics.ltv}</span>
                  </div>
                )}
                {canvas.keyMetrics.ltvCacRatio && (
                  <div className="text-xs text-muted-foreground">
                    LTV:CAC: <span className="font-semibold">{canvas.keyMetrics.ltvCacRatio}</span>
                  </div>
                )}
                {canvas.keyMetrics.churnRate && (
                  <div className="text-xs text-muted-foreground">
                    Churn: <span className="font-semibold">{canvas.keyMetrics.churnRate}</span>
                  </div>
                )}
                {canvas.keyMetrics.paybackPeriod && (
                  <div className="text-xs text-muted-foreground">
                    Payback: <span className="font-semibold">{canvas.keyMetrics.paybackPeriod}</span>
                  </div>
                )}
                {!canvas.keyMetrics.cac && !canvas.keyMetrics.ltv && (
                  <div className="text-xs text-muted-foreground">—</div>
                )}
              </CardContent>
            </Card>

            {/* Unfair Advantage */}
            <Card className="bg-chart-3/5 border-2 border-chart-3/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-chart-3">
                  UNFAIR ADVANTAGE
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.unfairAdvantage.length > 0 ? (
                  canvas.unfairAdvantage.map((advantage, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground">
                      • {advantage}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground">—</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}










