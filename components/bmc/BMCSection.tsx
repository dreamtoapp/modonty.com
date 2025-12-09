import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface BMCSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  description?: string;
}

export function BMCSection({ id, title, children, description }: BMCSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 mb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

interface BMCCardProps {
  title: string;
  items?: string[];
  children?: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning";
}

export function BMCCard({ title, items, children, variant = "default" }: BMCCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    primary: "bg-primary/5 border-primary/20",
    success: "bg-success/5 border-success/20",
    warning: "bg-warning/5 border-warning/20",
  };

  return (
    <Card className={`${variantStyles[variant]} border-2 shadow-lg`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items && (
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

interface MetricDisplayProps {
  label: string;
  value: string | number;
  description?: string;
  variant?: "default" | "primary" | "success";
}

export function MetricDisplay({ label, value, description, variant = "default" }: MetricDisplayProps) {
  const variantStyles = {
    default: "bg-card",
    primary: "bg-primary/5",
    success: "bg-success/5",
  };

  return (
    <Card className={variantStyles[variant]}>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </CardContent>
    </Card>
  );
}


