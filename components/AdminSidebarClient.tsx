'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Users, Network, Briefcase, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Position } from '@/helpers/extractMetrics';

interface PositionGroup {
  label: string;
  positions: Position[];
}

interface AdminSidebarClientProps {
  locale: string;
  positionGroups: PositionGroup[];
  countsMap: Record<string, number>;
  translations: {
    adminPanel: string;
    organizationalStructure: string;
    applications: string;
    allApplications: string;
    generalPlan: string;
    hiringPlan: string;
  };
}

export function AdminSidebarClient({
  locale,
  positionGroups,
  countsMap,
  translations
}: AdminSidebarClientProps) {
  const pathname = usePathname();
  const [isApplicationsExpanded, setIsApplicationsExpanded] = useState(true);

  const navItems = [
    {
      href: `/${locale}/admin`,
      label: translations.organizationalStructure,
      icon: Network,
      exact: true,
    },
    {
      href: `/${locale}/admin/general-plan`,
      label: translations.generalPlan,
      icon: FileText,
    },
    {
      href: `/${locale}/admin/hiring-plan`,
      label: translations.hiringPlan,
      icon: Users,
    },
  ];

  const isApplicationsActive = pathname?.includes('/admin/applications');

  return (
    <div className="h-full bg-muted/30 overflow-y-auto">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">{translations.adminPanel}</h2>
      </div>

      <nav className="p-4 space-y-1">
        {/* Regular nav items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                isActive && 'bg-accent text-accent-foreground font-medium'
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        {/* Applications with expandable submenu */}
        <div>
          <button
            onClick={() => setIsApplicationsExpanded(!isApplicationsExpanded)}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isApplicationsActive && 'bg-accent text-accent-foreground font-medium'
            )}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{translations.applications}</span>
            </div>
            {isApplicationsExpanded ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            )}
          </button>

          {isApplicationsExpanded && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-2">
              {/* All Applications link */}
              <Link
                href={`/${locale}/admin/applications`}
                className={cn(
                  'flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  pathname === `/${locale}/admin/applications` && 'bg-accent/50 text-accent-foreground font-medium'
                )}
              >
                <span className="truncate">{translations.allApplications}</span>
              </Link>

              {/* Position groups */}
              {positionGroups.map((group) => (
                <div key={group.label} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    {group.label}
                  </div>
                  {group.positions.map((position) => {
                    const count = countsMap[position.titleEn] || 0;
                    const isActive = pathname === `/${locale}/admin/applications/position/${encodeURIComponent(position.titleEn)}`;

                    return (
                      <Link
                        key={position.titleEn}
                        href={`/${locale}/admin/applications/position/${encodeURIComponent(position.titleEn)}`}
                        className={cn(
                          'flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors',
                          'hover:bg-accent hover:text-accent-foreground',
                          isActive && 'bg-accent/50 text-accent-foreground font-medium'
                        )}
                      >
                        <span className="truncate">{locale === 'ar' ? position.title : position.titleEn}</span>
                        {count > 0 && (
                          <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                            {count}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

