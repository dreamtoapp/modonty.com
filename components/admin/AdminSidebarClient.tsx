'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { FileText, Users, Network, Briefcase, CheckSquare, Calculator, UserCog, StickyNote, CreditCard, ListTodo, BarChart3, Settings, FileSignature, Mail, DollarSign, LayoutDashboard, Target, CalendarClock, ChevronDown, TrendingUp, Share2, Edit, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { UserRole } from '@prisma/client';
import { normalizeRoute, buildLocalizedPath } from '@/lib/auth/utils';
import { ADMIN_ROUTES } from '@/lib/auth/adminRoutes';

interface AdminSidebarClientProps {
  locale: string;
  totalCount: number;
  contactMessageCount: number;
  accessibleRoutes: string[]; // Routes the user has access to (from server)
  translations: {
    adminPanel: string;
    dashboard: string;
    subscriptions: string;
    customers: string;
    tasks: string;
    organizationalStructure: string;
    applications: string;
    contactMessages: string;
    generalPlan: string;
    hiringPlan: string;
    phase1Requirements: string;
    accounting: string;
    costs: string;
    sourceOfIncome: string;
    modonty: string;
    bmc: string;
    bmcCanvas: string;
    bmcCanvasEdit: string;
    employeeAffairs: string;
    administrativeNotes: string;
    contracts: string;
    reports: string;
    settings: string;
    users: string;
    staff: string;
  };
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  count?: number;
  comingSoon?: boolean;
}

interface SidebarSection {
  id: string;
  label: {
    ar: string;
    en: string;
  };
  items: NavItem[];
}

export function AdminSidebarClient({
  locale,
  totalCount,
  contactMessageCount,
  accessibleRoutes,
  translations
}: AdminSidebarClientProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Initialize open sections - default to collapsed (empty set)
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    return new Set();
  });

  // Track manually closed sections to prevent auto-reopening
  const manuallyClosedSections = useRef<Set<string>>(new Set());

  // Convert accessible routes array to Set for faster lookup
  const accessibleRoutesSet = new Set(accessibleRoutes);

  const getAdminRoutePath = (route: string): string => {
    const found = ADMIN_ROUTES.find((r) => r.route === route);
    return found?.route ?? route;
  };

  const canAccessRoute = (route: string): boolean => {
    // Remove locale from route for permission check
    const normalizedRoute = normalizeRoute(route);
    // SUPER_ADMIN always has access, or check if route is in accessible routes
    return session?.user?.role === UserRole.SUPER_ADMIN || accessibleRoutesSet.has(normalizedRoute);
  };

  // Business logic organized sections
  const sidebarSections: SidebarSection[] = [
    {
      id: 'core-operations',
      label: {
        ar: 'الإدارة',
        en: 'Management',
      },
      items: [
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin'), locale),
          label: translations.dashboard,
          icon: LayoutDashboard,
          exact: true,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/organizational-structure'), locale),
          label: translations.organizationalStructure,
          icon: Network,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/general-plan'), locale),
          label: translations.generalPlan,
          icon: FileText,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/contact-messages'), locale),
          label: translations.contactMessages,
          icon: Mail,
          count: contactMessageCount,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/bmc'), locale),
          label: translations.bmc,
          icon: Target,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/bmc/canvas'), locale),
          label: translations.bmcCanvas,
          icon: Share2,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/bmc/canvas/edit'), locale),
          label: translations.bmcCanvasEdit,
          icon: Edit,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/modonty'), locale),
          label: translations.modonty,
          icon: FileText,
        },
      ],
    },
    {
      id: 'hiring-recruitment',
      label: {
        ar: 'شئون الموظفين والتوظيف',
        en: 'HR & Recruitment',
      },
      items: [
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/applications'), locale),
          label: translations.applications,
          icon: Briefcase,
          count: totalCount,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/applications/interviews'), locale),
          label: locale === 'ar' ? 'المقابلات' : 'Interviews',
          icon: CalendarClock,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/staff'), locale),
          label: translations.staff,
          icon: Users,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/hiring-plan'), locale),
          label: translations.hiringPlan,
          icon: FileText,
        },
      ],
    },
    {
      id: 'planning-strategy',
      label: {
        ar: 'التخطيط والاستراتيجية',
        en: 'Planning & Strategy',
      },
      items: [],
    },
    {
      id: 'financial-management',
      label: {
        ar: 'الإدارة المالية',
        en: 'Financial Management',
      },
      items: [
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/phase-1-requirements'), locale),
          label: translations.phase1Requirements,
          icon: CheckSquare,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/accounting'), locale),
          label: translations.accounting,
          icon: Calculator,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/costs'), locale),
          label: translations.costs,
          icon: DollarSign,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/source-of-income'), locale),
          label: translations.sourceOfIncome,
          icon: TrendingUp,
        },
      ],
    },
    {
      id: 'operations-management',
      label: {
        ar: 'إدارة العمليات',
        en: 'Operations Management',
      },
      items: [
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/tasks'), locale),
          label: translations.tasks,
          icon: ListTodo,
          comingSoon: false,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/tasks/my-tasks'), locale),
          label: translations.tasks || (locale === 'ar' ? 'مهامي' : 'My Tasks'),
          icon: ListTodo,
          comingSoon: false,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/my-time'), locale),
          label: locale === 'ar' ? 'سجل الوقت' : 'My Time',
          icon: Clock,
          comingSoon: false,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/notes'), locale),
          label: translations.administrativeNotes,
          icon: StickyNote,
          comingSoon: false,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/contracts'), locale),
          label: translations.contracts,
          icon: FileSignature,
          comingSoon: true,
        },
      ],
    },
    {
      id: 'business-development',
      label: {
        ar: 'تطوير الأعمال',
        en: 'Business Development',
      },
      items: [
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/customers'), locale),
          label: translations.customers,
          icon: Users,
          comingSoon: true,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/subscriptions'), locale),
          label: translations.subscriptions,
          icon: CreditCard,
          comingSoon: true,
        },
      ],
    },
    {
      id: 'reporting-analysis',
      label: {
        ar: 'التقارير والتحليل',
        en: 'Reporting & Analysis',
      },
      items: [
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/reports'), locale),
          label: translations.reports,
          icon: BarChart3,
          comingSoon: true,
        },
      ],
    },
    {
      id: 'administration',
      label: {
        ar: 'الإعدادات والمستخدمون',
        en: 'Settings & Users',
      },
      items: [
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/settings'), locale),
          label: translations.settings,
          icon: Settings,
          comingSoon: true,
        },
        {
          href: buildLocalizedPath(getAdminRoutePath('/admin/clockify-users'), locale),
          label: locale === 'ar' ? 'مستخدمو Clockify' : 'Clockify Users',
          icon: UserCog,
        },
        ...(session?.user?.role === UserRole.SUPER_ADMIN
          ? [
            {
              href: buildLocalizedPath(getAdminRoutePath('/admin/users'), locale),
              label: translations.users,
              icon: Users,
            } as NavItem,
          ]
          : []),
      ],
    },
  ];

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return 'default';
      case UserRole.ADMIN:
        return 'secondary';
      case UserRole.STAFF:
        return 'outline';
      default:
        return 'outline';
    }
  };

  // Filter sections and items based on permissions
  const filteredSections = useMemo(() => {
    return sidebarSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const routeWithoutLocale = item.href.replace(`/${locale}`, '');
          return canAccessRoute(routeWithoutLocale);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [sidebarSections, locale, accessibleRoutesSet, session?.user?.role]);

  // Auto-open sections with active items when pathname changes (only if not manually closed)
  useEffect(() => {
    filteredSections.forEach((section) => {
      const hasActiveItem = section.items.some((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname?.startsWith(item.href);
        return isActive;
      });

      // Only auto-open if section has active item and wasn't manually closed
      if (hasActiveItem && !manuallyClosedSections.current.has(section.id)) {
        setOpenSections((prev) => {
          if (!prev.has(section.id)) {
            return new Set(prev).add(section.id);
          }
          return prev;
        });
      }
    });
  }, [pathname, filteredSections]);

  return (
    <div className="h-full bg-muted/30 overflow-y-auto flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <h2 className="text-lg font-semibold">{translations.adminPanel}</h2>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 animate-pulse">
            {locale === 'ar' ? 'النسخة الأولية' : 'Beta'}
          </span>
        </div>
        {session?.user && (
          <div className="space-y-2 pt-4 border-t">
            <div className="text-sm font-medium">
              {session.user.name || session.user.email}
            </div>
            <Badge variant={getRoleBadgeVariant(session.user.role as UserRole)} className="text-xs">
              {session.user.role}
            </Badge>
          </div>
        )}
      </div>

      <nav className="p-4 space-y-2">
        {filteredSections.map((section) => {
          const isOpen = openSections.has(section.id);

          return (
            <Collapsible
              key={section.id}
              open={isOpen}
              onOpenChange={(open) => {
                setOpenSections((prev) => {
                  const next = new Set(prev);
                  if (open) {
                    next.add(section.id);
                    // Remove from manually closed if user opens it
                    manuallyClosedSections.current.delete(section.id);
                  } else {
                    next.delete(section.id);
                    // Track that user manually closed this section
                    manuallyClosedSections.current.add(section.id);
                  }
                  return next;
                });
              }}
            >
              <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider group-hover:text-accent-foreground">
                  {locale === 'ar' ? section.label.ar : section.label.en}
                </h3>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0',
                    isOpen && 'rotate-180',
                    'group-hover:text-accent-foreground'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="space-y-1 pt-1">
                  {section.items.map((item) => {
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
                          item.comingSoon && 'opacity-60',
                          'hover:bg-accent hover:text-accent-foreground',
                          item.comingSoon && 'hover:opacity-100',
                          isActive && 'bg-accent text-accent-foreground font-medium',
                          item.comingSoon && isActive && 'opacity-100'
                        )}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                        {item.count && item.count > 0 && (
                          <Badge variant="secondary" className="text-[10px] h-4 px-1.5 ml-auto">
                            {item.count}
                          </Badge>
                        )}
                        {item.comingSoon && !item.count && (
                          <Badge variant="outline" className="text-[9px] h-4 px-1.5 ml-auto bg-primary/10 text-primary border-primary/30">
                            {locale === 'ar' ? 'قريباً' : 'Soon'}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </nav>
    </div>
  );
}















