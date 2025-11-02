'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Users, Network, Briefcase, CheckSquare, Calculator, UserCog, StickyNote, CreditCard, ListTodo, BarChart3, Settings, FileSignature } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface AdminSidebarClientProps {
  locale: string;
  totalCount: number;
  translations: {
    adminPanel: string;
    subscriptions: string;
    customers: string;
    tasks: string;
    organizationalStructure: string;
    applications: string;
    generalPlan: string;
    hiringPlan: string;
    phase1Requirements: string;
    accounting: string;
    employeeAffairs: string;
    administrativeNotes: string;
    contracts: string;
    reports: string;
    settings: string;
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

export function AdminSidebarClient({
  locale,
  totalCount,
  translations
}: AdminSidebarClientProps) {
  const pathname = usePathname();

  // Completed/Active items
  const activeItems: NavItem[] = [
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
      href: `/${locale}/admin/phase-1-requirements`,
      label: translations.phase1Requirements,
      icon: CheckSquare,
    },
    {
      href: `/${locale}/admin/hiring-plan`,
      label: translations.hiringPlan,
      icon: Briefcase,
    },
    {
      href: `/${locale}/admin/applications`,
      label: translations.applications,
      icon: Briefcase,
      count: totalCount,
    },
    {
      href: `/${locale}/admin/accounting`,
      label: translations.accounting,
      icon: Calculator,
    },
  ];

  // Coming soon items
  const comingSoonItems: NavItem[] = [
    {
      href: `/${locale}/admin/subscriptions`,
      label: translations.subscriptions,
      icon: CreditCard,
      comingSoon: true,
    },
    {
      href: `/${locale}/admin/customers`,
      label: translations.customers,
      icon: Users,
      comingSoon: true,
    },
    {
      href: `/${locale}/admin/tasks`,
      label: translations.tasks,
      icon: ListTodo,
      comingSoon: true,
    },
    {
      href: `/${locale}/admin/employee-affairs`,
      label: translations.employeeAffairs,
      icon: UserCog,
      comingSoon: true,
    },
    {
      href: `/${locale}/admin/notes`,
      label: translations.administrativeNotes,
      icon: StickyNote,
      comingSoon: true,
    },
    {
      href: `/${locale}/admin/contracts`,
      label: translations.contracts,
      icon: FileSignature,
      comingSoon: true,
    },
    {
      href: `/${locale}/admin/reports`,
      label: translations.reports,
      icon: BarChart3,
      comingSoon: true,
    },
    {
      href: `/${locale}/admin/settings`,
      label: translations.settings,
      icon: Settings,
      comingSoon: true,
    },
  ];

  return (
    <div className="h-full bg-muted/30 overflow-y-auto">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg font-semibold">{translations.adminPanel}</h2>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 animate-pulse">
            {locale === 'ar' ? 'النسخة الأولية' : 'Beta'}
          </span>
        </div>
      </div>

      <nav className="p-4 space-y-6">
        {/* Active/Completed Section */}
        <div className="space-y-1">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {locale === 'ar' ? 'تم الإنجاز' : 'Active'}
            </h3>
          </div>
          {activeItems.map((item) => {
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
                {item.count && item.count > 0 && (
                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5 ml-auto">
                    {item.count}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="space-y-1">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {locale === 'ar' ? 'قريباً' : 'Coming Soon'}
            </h3>
          </div>
          {comingSoonItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors opacity-60',
                  'hover:bg-accent hover:text-accent-foreground hover:opacity-100',
                  isActive && 'bg-accent text-accent-foreground font-medium opacity-100'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.comingSoon && (
                  <Badge variant="outline" className="text-[9px] h-4 px-1.5 ml-auto bg-primary/10 text-primary border-primary/30">
                    {locale === 'ar' ? 'قريباً' : 'Soon'}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

