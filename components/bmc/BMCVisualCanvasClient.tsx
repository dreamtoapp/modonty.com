"use client";

import { useContext } from "react";
import { BMCVisualCanvas } from "./BMCVisualCanvas";
import { BMCCalculationsContext } from "./BMCMetricsClient";

interface BMCVisualCanvasClientProps {
  canvas: any;
}

export function BMCVisualCanvasClient({ canvas }: BMCVisualCanvasClientProps) {
  const context = useContext(BMCCalculationsContext);

  // Use calculated MRR from context, fallback to canvas default
  const monthlyRecognizedRevenue = context?.calculatedYear1MRR ||
    (canvas.revenueStreams?.targetMix?.totalMRR) || 0;

  return (
    <BMCVisualCanvas
      canvas={canvas}
      monthlyRecognizedRevenue={monthlyRecognizedRevenue}
    />
  );
}










