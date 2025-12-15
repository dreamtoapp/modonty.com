"use client";

import { Button } from "@/components/ui/button";
import { Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type CanvasType = "bmc" | "lean";

interface CanvasToggleProps {
  activeCanvas: CanvasType;
  onCanvasChange: (canvas: CanvasType) => void;
  locale: string;
}

export function CanvasToggle({
  activeCanvas,
  onCanvasChange,
  locale,
}: CanvasToggleProps) {
  return (
    <div className="flex items-center gap-2 mb-4 p-1 bg-muted rounded-lg w-fit">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onCanvasChange("bmc")}
        className={cn(
          "flex items-center gap-2 transition-all",
          activeCanvas === "bmc"
            ? "bg-background text-foreground shadow-sm font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Target className="h-4 w-4" />
        <span className="text-sm">
          {locale === "ar" ? "نموذج العمل التجاري" : "Business Model Canvas"}
        </span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onCanvasChange("lean")}
        className={cn(
          "flex items-center gap-2 transition-all",
          activeCanvas === "lean"
            ? "bg-background text-foreground shadow-sm font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Zap className="h-4 w-4" />
        <span className="text-sm">
          {locale === "ar" ? "نموذج اللين" : "Lean Canvas"}
        </span>
      </Button>
    </div>
  );
}










