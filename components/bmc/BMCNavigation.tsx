"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  labelAr?: string;
}

interface BMCNavigationProps {
  locale: string;
  items: NavigationItem[];
}

export function BMCNavigation({ locale, items }: BMCNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  const isRTL = locale === "ar";

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50" data-print-hide>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <Card
            className={cn(
              "fixed top-0 h-full w-80 overflow-y-auto shadow-xl z-50",
              isRTL ? "left-0" : "right-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-4 pt-16">
              <nav className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors",
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-foreground"
                    )}
                  >
                    <span>{isRTL ? item.labelAr || item.label : item.label}</span>
                    {activeSection === item.id && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4",
                          isRTL ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed top-20 left-4 w-64 z-30" data-print-hide>
        <Card className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide">
              {locale === "ar" ? "جدول المحتويات" : "Table of Contents"}
            </h3>
            <nav className="space-y-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors text-right",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-accent text-foreground"
                  )}
                >
                  <span className="flex-1">
                    {isRTL ? item.labelAr || item.label : item.label}
                  </span>
                  {activeSection === item.id && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground ml-2" />
                  )}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </>
  );
}









