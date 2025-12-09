import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MetricsDisplayProps {
  business: {
    growth: Record<string, string>;
    financial: Record<string, string>;
    retention: Record<string, string>;
  };
  operational: {
    content: Record<string, string>;
    product: Record<string, string>;
    team: Record<string, string>;
  };
}

export function MetricsDisplay({ business, operational }: MetricsDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Business Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Business Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Growth</h4>
              {Object.entries(business.growth).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <Badge variant="outline">{value}</Badge>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Financial</h4>
              {Object.entries(business.financial).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <Badge variant="outline">{value}</Badge>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Retention</h4>
              {Object.entries(business.retention).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <Badge variant="outline">{value}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Operational Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Content</h4>
              {Object.entries(operational.content).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <Badge variant="outline">{value}</Badge>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Product</h4>
              {Object.entries(operational.product).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <Badge variant="outline">{value}</Badge>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Team</h4>
              {Object.entries(operational.team).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <Badge variant="outline">{value}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


