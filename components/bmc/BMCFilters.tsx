"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterState {
  period: "monthly" | "quarterly" | "yearly" | "custom";
  comparePlans: string[];
  channels: string[];
  costCategories: string[];
  revenueStreams: string[];
}

interface BMCFiltersContextType {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const BMCFiltersContext = createContext<BMCFiltersContextType | null>(null);

export function useBMCFilters() {
  const context = useContext(BMCFiltersContext);
  if (!context) {
    throw new Error("useBMCFilters must be used within BMCFiltersProvider");
  }
  return context;
}

const defaultFilters: FilterState = {
  period: "monthly",
  comparePlans: [],
  channels: [],
  costCategories: [],
  revenueStreams: [],
};

interface BMCFiltersProviderProps {
  children: ReactNode;
  locale: string;
}

export function BMCFiltersProvider({
  children,
  locale,
}: BMCFiltersProviderProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <BMCFiltersContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </BMCFiltersContext.Provider>
  );
}

interface BMCFiltersProps {
  locale: string;
  availablePlans?: Array<{ key: string; label: string }>;
  availableChannels?: string[];
  availableCostCategories?: string[];
  availableRevenueStreams?: string[];
}

export function BMCFilters({
  locale,
  availablePlans = [],
  availableChannels = [],
  availableCostCategories = [],
  availableRevenueStreams = [],
}: BMCFiltersProps) {
  const { filters, updateFilters, resetFilters } = useBMCFilters();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = locale === "ar";

  const hasActiveFilters =
    filters.comparePlans.length > 0 ||
    filters.channels.length > 0 ||
    filters.costCategories.length > 0 ||
    filters.revenueStreams.length > 0 ||
    filters.period !== "monthly";

  return (
    <>
      {/* Filter Toggle Button */}
      <div className="fixed top-4 right-20 z-40 lg:top-20 lg:right-32" data-print-hide>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "bg-background/80 backdrop-blur-sm",
            hasActiveFilters && "border-primary"
          )}
        >
          <Filter className="h-4 w-4 ml-2" />
          {isRTL ? "تصفية" : "Filters"}
          {hasActiveFilters && (
            <Badge variant="default" className="mr-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {[
                filters.comparePlans.length,
                filters.channels.length,
                filters.costCategories.length,
                filters.revenueStreams.length,
              ].reduce((a, b) => a + b, 0) + (filters.period !== "monthly" ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <Card
            className={cn(
              "fixed top-20 right-4 w-96 max-h-[calc(100vh-6rem)] overflow-y-auto shadow-xl z-40",
              isRTL && "right-auto left-4"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                {isRTL ? "تصفية البيانات" : "Filter Data"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Period Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {isRTL ? "الفترة" : "Period"}
                </label>
                <Select
                  value={filters.period}
                  onValueChange={(value: FilterState["period"]) =>
                    updateFilters({ period: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">
                      {isRTL ? "شهري" : "Monthly"}
                    </SelectItem>
                    <SelectItem value="quarterly">
                      {isRTL ? "ربع سنوي" : "Quarterly"}
                    </SelectItem>
                    <SelectItem value="yearly">
                      {isRTL ? "سنوي" : "Yearly"}
                    </SelectItem>
                    <SelectItem value="custom">
                      {isRTL ? "مخصص" : "Custom"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Plan Comparison */}
              {availablePlans.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isRTL ? "مقارنة الخطط" : "Compare Plans"}
                  </label>
                  <div className="space-y-2">
                    {availablePlans.map((plan) => {
                      const isSelected = filters.comparePlans.includes(plan.key);
                      return (
                        <Button
                          key={plan.key}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            if (isSelected) {
                              updateFilters({
                                comparePlans: filters.comparePlans.filter(
                                  (k) => k !== plan.key
                                ),
                              });
                            } else {
                              updateFilters({
                                comparePlans: [...filters.comparePlans, plan.key],
                              });
                            }
                          }}
                        >
                          {plan.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Channel Filter */}
              {availableChannels.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isRTL ? "القنوات" : "Channels"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableChannels.map((channel) => {
                      const isSelected = filters.channels.includes(channel);
                      return (
                        <Badge
                          key={channel}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (isSelected) {
                              updateFilters({
                                channels: filters.channels.filter(
                                  (c) => c !== channel
                                ),
                              });
                            } else {
                              updateFilters({
                                channels: [...filters.channels, channel],
                              });
                            }
                          }}
                        >
                          {channel}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Reset Button */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={resetFilters}
                >
                  {isRTL ? "إعادة تعيين" : "Reset Filters"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}









