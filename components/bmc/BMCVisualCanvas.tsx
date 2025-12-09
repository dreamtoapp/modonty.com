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
      <div className="min-w-[800px]">
        {/* BMC Canvas Grid */}
        <div className="grid grid-cols-4 gap-2 text-xs">
          {/* Top Row */}
          <div className="col-span-1">
            <Card className="h-full bg-primary/5 border-2 border-primary/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-primary">KEY PARTNERS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.keyPartners.slice(0, 6).map((partner, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {partner}</div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Card className="h-full bg-chart-2/5 border-2 border-chart-2/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-chart-2">KEY ACTIVITIES</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.keyActivities.slice(0, 6).map((activity, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {activity}</div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Card className="h-full bg-chart-3/5 border-2 border-chart-3/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-chart-3">KEY RESOURCES</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.keyResources.slice(0, 6).map((resource, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {resource}</div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Card className="h-full bg-chart-4/5 border-2 border-chart-4/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-chart-4">VALUE PROPOSITIONS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.valuePropositions.slice(0, 6).map((prop, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {prop}</div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Middle Row */}
          <div className="col-span-2">
            <Card className="h-full bg-success/5 border-2 border-success/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-success">CUSTOMER RELATIONSHIPS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.customerRelationships.slice(0, 5).map((rel, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {rel}</div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-2">
            <Card className="h-full bg-accent/5 border-2 border-accent/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-accent">CHANNELS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.channels.slice(0, 5).map((channel, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {channel}</div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="col-span-2">
            <Card className="h-full bg-warning/5 border-2 border-warning/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-warning">CUSTOMER SEGMENTS</CardTitle>
              </CardHeader>
              <CardContent className="p-3 space-y-1">
                {canvas.customerSegments.slice(0, 5).map((segment, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">• {segment}</div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Card className="h-full bg-destructive/5 border-2 border-destructive/20">
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

          <div className="col-span-1">
            <Card className="h-full bg-primary/5 border-2 border-primary/20">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-bold text-primary">REVENUE STREAMS</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Annual Subscriptions</div>
                  <div>• 18-Month Content</div>
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

