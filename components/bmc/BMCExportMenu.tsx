"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet, Printer, Share2, Check } from "lucide-react";

interface BMCExportMenuProps {
  locale: string;
}

export function BMCExportMenu({ locale }: BMCExportMenuProps) {
  const [copied, setCopied] = useState(false);

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const financeData = extractFinanceData();
    const csv = convertToCSV(financeData);
    downloadFile(csv, "bmc-data.csv", "text/csv");
  };

  const handleShareLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const extractFinanceData = () => {
    const data: Record<string, any> = {};

    // Extract key metrics from the page
    const cards = document.querySelectorAll("[class*='Card']");
    cards.forEach((card) => {
      const title = card.querySelector("h2, h3, [class*='CardTitle']")?.textContent?.trim();
      const value = card.querySelector("[class*='text-2xl'], [class*='text-xl']")?.textContent?.trim();
      if (title && value) {
        data[title] = value;
      }
    });

    // Extract from metric displays
    const metrics = document.querySelectorAll("[data-metric]");
    metrics.forEach((el) => {
      const key = el.getAttribute("data-metric");
      const value = el.textContent?.trim();
      if (key && value) {
        data[key] = value;
      }
    });

    return data;
  };

  const convertToCSV = (data: Record<string, any>): string => {
    const headers = Object.keys(data);
    const values = Object.values(data);
    return [headers.join(","), values.join(",")].join("\n");
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isRTL = locale === "ar";

  return (
    <div className="fixed top-4 right-4 z-50 lg:top-20 lg:right-6" data-print-hide>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-background/80 backdrop-blur-sm shadow-lg"
          >
            <Download className="h-4 w-4 ml-2" />
            {locale === "ar" ? "تصدير" : "Export"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
          <DropdownMenuLabel>
            {locale === "ar" ? "خيارات التصدير" : "Export Options"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportPDF}>
            <FileText className="h-4 w-4 ml-2" />
            {locale === "ar" ? "تصدير PDF" : "Export PDF"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportExcel}>
            <FileSpreadsheet className="h-4 w-4 ml-2" />
            {locale === "ar" ? "تصدير Excel" : "Export Excel"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.print()}>
            <Printer className="h-4 w-4 ml-2" />
            {locale === "ar" ? "طباعة" : "Print"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleShareLink}>
            {copied ? (
              <>
                <Check className="h-4 w-4 ml-2" />
                {locale === "ar" ? "تم النسخ!" : "Copied!"}
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 ml-2" />
                {locale === "ar" ? "مشاركة الرابط" : "Share Link"}
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}










