"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BMCContent } from "@/lib/bmc-types";

interface Section {
  id: string;
  title: string;
  number: number;
}

interface SectionGroup {
  title: string;
  sections: Section[];
}

interface BMCSidebarProps {
  content: BMCContent;
}

export function BMCSidebar({ content }: BMCSidebarProps) {
  const sectionGroups: SectionGroup[] = [
    {
      title: content.uiLabels.overview,
      sections: [
        { id: "hero", title: content.uiLabels.executiveSummary, number: 1 },
        { id: "canvas", title: content.uiLabels.badge, number: 2 },
      ],
    },
    {
      title: content.uiLabels.bmcBuildingBlocks,
      sections: [
        { id: "key-partners", title: content.keyPartners.title, number: 3 },
        { id: "key-activities", title: content.keyActivities.title, number: 4 },
        { id: "key-resources", title: content.keyResources.title, number: 5 },
        { id: "value-propositions", title: content.valuePropositions.title, number: 6 },
        { id: "customer-relationships", title: content.customerRelationships.title, number: 7 },
        { id: "channels", title: content.channels.title, number: 8 },
        { id: "customer-segments", title: content.customerSegments.title, number: 9 },
        { id: "cost-structure", title: content.costStructure.title, number: 10 },
        { id: "revenue-streams", title: content.revenueStreams.title, number: 11 },
      ],
    },
    {
      title: content.uiLabels.financialStrategy,
      sections: [
        { id: "financial-summary", title: content.financialSummary.title, number: 12 },
        { id: "key-metrics", title: content.keyMetrics.title, number: 13 },
        { id: "competitive-advantages", title: content.competitiveAdvantages.title, number: 14 },
        { id: "growth-strategy", title: content.growthStrategy.title, number: 15 },
        { id: "risks", title: content.risks.title, number: 16 },
        { id: "conclusion", title: content.conclusion.title, number: 17 },
      ],
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(["Overview"])
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = sectionGroups.flatMap((group) => group.sections);
    const sectionIds = sections.map((s) => s.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupTitle)) {
        newSet.delete(groupTitle);
      } else {
        newSet.add(groupTitle);
      }
      return newSet;
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="icon"
        className={cn(
          "fixed top-4 right-4 z-50 lg:hidden",
          "bg-background shadow-lg"
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-40 transition-transform duration-300 overflow-y-auto",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pt-12 lg:pt-4">
            <h2 className="text-lg font-bold text-foreground">Table of Contents</h2>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Groups */}
          <nav className="space-y-2">
            {sectionGroups.map((group) => {
              const isGroupOpen = openGroups.has(group.title);
              return (
                <div key={group.title} className="border-b border-border pb-2 mb-2">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center justify-between p-2 text-sm font-semibold text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <span>{group.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isGroupOpen ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  {isGroupOpen && (
                    <ul className="mt-2 space-y-1 ml-4">
                      {group.sections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                          <li key={section.id}>
                            <button
                              onClick={() => {
                                scrollToSection(section.id);
                                setIsOpen(false);
                              }}
                              className={cn(
                                "w-full text-left p-2 text-sm rounded-md transition-colors flex items-center gap-2",
                                isActive
                                  ? "bg-primary text-primary-foreground font-medium"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              <span className="text-xs opacity-70">
                                {section.number.toString().padStart(2, "0")}
                              </span>
                              <span className="flex-1">{section.title}</span>
                              {isActive && (
                                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

