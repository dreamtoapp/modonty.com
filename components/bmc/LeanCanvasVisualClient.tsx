"use client";

import { useContext } from "react";
import { LeanCanvasVisual } from "./LeanCanvasVisual";
import { BMCCalculationsContext } from "./BMCMetricsClient";
import { mapBMCToLeanCanvas } from "@/helpers/leanCanvasMapper";
import type { BMCContent } from "@/lib/bmc-types";
import type { FinanceData } from "@/helpers/financialCalculations";

interface LeanCanvasVisualClientProps {
  bmcContent: BMCContent;
  finance: FinanceData;
}

export function LeanCanvasVisualClient({
  bmcContent,
  finance,
}: LeanCanvasVisualClientProps) {
  const context = useContext(BMCCalculationsContext);

  // Map BMC data to Lean Canvas structure
  const leanCanvasData = mapBMCToLeanCanvas(bmcContent, finance);

  // Use calculated MRR from context, fallback to finance data
  const monthlyRecognizedRevenue =
    context?.calculatedYear1MRR ||
    leanCanvasData.revenueStreams.targetMix?.totalMRR ||
    0;

  return (
    <LeanCanvasVisual
      canvas={leanCanvasData}
      monthlyRecognizedRevenue={monthlyRecognizedRevenue}
    />
  );
}









