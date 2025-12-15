"use client";

import { useState } from "react";
import { CanvasToggle } from "./CanvasToggle";
import { BMCVisualCanvasClient } from "./BMCVisualCanvasClient";
import { LeanCanvasVisualClient } from "./LeanCanvasVisualClient";
import type { BMCContent } from "@/lib/bmc-types";
import type { FinanceData } from "@/helpers/financialCalculations";

interface CanvasSectionClientProps {
  bmcContent: BMCContent;
  finance: FinanceData;
  locale: string;
}

export function CanvasSectionClient({
  bmcContent,
  finance,
  locale,
}: CanvasSectionClientProps) {
  const [activeCanvas, setActiveCanvas] = useState<"bmc" | "lean">("bmc");

  return (
    <>
      <CanvasToggle
        activeCanvas={activeCanvas}
        onCanvasChange={setActiveCanvas}
        locale={locale}
      />
      {activeCanvas === "bmc" ? (
        <BMCVisualCanvasClient canvas={bmcContent.bmcCanvas} />
      ) : (
        <LeanCanvasVisualClient bmcContent={bmcContent} finance={finance} />
      )}
    </>
  );
}










