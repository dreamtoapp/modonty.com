"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BMCVisualCanvasProps {
  canvas: {
    keyPartners: string[];
    keyActivities: string[];
    keyResources: string[];
    valuePropositions: string[];
    customerRelationships: string[];
    channels: string[];
    customerSegments: string[];
    costStructure: {
      total: string;
    };
    revenueStreams: {
      pricingModel?: string;
      plans?: Array<{
        name: string;
        price: number;
        priceType?: string;
        currency?: string;
      }>;
      targetMix?: {
        totalMRR: number;
      };
    };
  };
  monthlyRecognizedRevenue?: number;
}

export function BMCVisualCanvas({ canvas, monthlyRecognizedRevenue }: BMCVisualCanvasProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] lg:min-w-0">
        {/* Official BMC Canvas - 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
          {/* Left Column - Infrastructure (4 blocks) */}
          <div className="flex flex-col gap-3 order-1 lg:order-none">
            {/* Key Partners */}
            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-primary">KEY PARTNERS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.keyPartners.map((partner, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {partner}</div>
                ))}
              </CardContent>
            </Card>

            {/* Key Activities */}
            <Card className="bg-chart-2/5 border-2 border-chart-2/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-chart-2">KEY ACTIVITIES</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.keyActivities.map((activity, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {activity}</div>
                ))}
              </CardContent>
            </Card>

            {/* Key Resources */}
            <Card className="bg-chart-3/5 border-2 border-chart-3/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-chart-3">KEY RESOURCES</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.keyResources.length > 0 && (
                  <div className="text-xs font-bold text-chart-3 mb-1">★ {canvas.keyResources[0]}</div>
                )}
                {canvas.keyResources.slice(1).map((resource, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {resource}</div>
                ))}
              </CardContent>
            </Card>

            {/* Cost Structure */}
            <Card className="bg-destructive/5 border-2 border-destructive/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-destructive">COST STRUCTURE</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• {canvas.costStructure.total}</div>
                  <div className="mt-2 text-xs font-semibold text-destructive">Fixed + Variable</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Value Propositions (1 large block spanning full height) */}
          <div className="flex order-2 lg:order-none self-stretch">
            <Card className="w-full h-full bg-gradient-to-br from-chart-4/15 via-chart-4/10 to-chart-4/5 border-2 border-chart-4/40 shadow-md">
              <CardHeader className="p-3 border-b border-chart-4/20 bg-chart-4/5">
                <CardTitle className="text-sm font-bold text-chart-4 text-center">
                  VALUE PROPOSITIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-2">
                {canvas.valuePropositions.length > 0 && (
                  <div className="text-xs font-bold text-chart-4 mb-2 text-center px-2 py-1.5 bg-chart-4/10 rounded border border-chart-4/30">
                    ★ {canvas.valuePropositions[0]}
                  </div>
                )}
                <div className="space-y-1">
                  {canvas.valuePropositions.slice(1).map((prop, idx) => (
                    <div key={idx} className="text-xs text-foreground">• {prop}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Customer (4 blocks) */}
          <div className="flex flex-col gap-3 order-3 lg:order-none">
            {/* Customer Relationships */}
            <Card className="bg-success/5 border-2 border-success/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-success">CUSTOMER RELATIONSHIPS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.customerRelationships.map((rel, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {rel}</div>
                ))}
              </CardContent>
            </Card>

            {/* Channels */}
            <Card className="bg-accent/5 border-2 border-accent/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-accent">CHANNELS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.channels.map((channel, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {channel}</div>
                ))}
              </CardContent>
            </Card>

            {/* Customer Segments */}
            <Card className="bg-warning/5 border-2 border-warning/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-warning">CUSTOMER SEGMENTS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.customerSegments.map((segment, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {segment}</div>
                ))}
              </CardContent>
            </Card>

            {/* Revenue Streams */}
            <Card className="bg-primary/5 border-2 border-primary/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-primary">REVENUE STREAMS</CardTitle>
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
                          : '0')}K SAR/mo
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

