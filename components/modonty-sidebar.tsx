"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  number: number;
}

interface SectionGroup {
  title: string;
  sections: Section[];
}

const sectionGroups: SectionGroup[] = [
  {
    title: "المحتوى الرئيسي",
    sections: [
      { id: "hero", title: "الصفحة الرئيسية", number: 1 },
      { id: "what-is", title: "ما هي Modonty", number: 2 },
      { id: "how-it-works", title: "كيف يعمل", number: 3 },
      { id: "why-different", title: "لماذا مختلف", number: 4 },
    ],
  },
  {
    title: "الجمهور والتحديات",
    sections: [
      { id: "target-audience", title: "الجمهور المستهدف", number: 5 },
      { id: "challenges", title: "التحديات والحلول", number: 6 },
      { id: "why-strong", title: "لماذا قوي", number: 7 },
    ],
  },
  {
    title: "الأعمال",
    sections: [
      { id: "market-opportunity", title: "فرصة السوق", number: 8 },
      { id: "pricing", title: "الأسعار", number: 9 },
      { id: "roi-comparison", title: "مقارنة العائد", number: 10 },
    ],
  },
  {
    title: "العمليات",
    sections: [
      { id: "timeline", title: "خطة الإطلاق", number: 11 },
      { id: "team-structure", title: "هيكل الفريق", number: 12 },
      { id: "financial-kpis", title: "المؤشرات المالية", number: 13 },
      { id: "cost-breakdown", title: "التكاليف", number: 14 },
    ],
  },
  {
    title: "الاستراتيجية",
    sections: [
      { id: "competitive-advantages", title: "المزايا التنافسية", number: 15 },
      { id: "future-expansion", title: "التوسع المستقبلي", number: 16 },
      { id: "collaboration", title: "التعاون", number: 17 },
    ],
  },
  {
    title: "إضافي",
    sections: [
      { id: "additional-revenue", title: "مصادر الدخل", number: 18 },
      { id: "workflow", title: "نظام العمل", number: 19 },
    ],
  },
];

export function ModontySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(["المحتوى الرئيسي"])
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
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
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
        dir="rtl"
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pt-12 lg:pt-4">
            <h2 className="text-lg font-bold text-foreground">قائمة المحتويات</h2>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="إغلاق"
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
                    <ul className="mt-2 space-y-1 mr-4">
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
                                "w-full text-right p-2 text-sm rounded-md transition-colors flex items-center gap-2",
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

