'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FileText, Users, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  locale: string;
}

export function AdminSidebar({ locale }: AdminSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('admin');

  const navItems = [
    {
      href: `/${locale}/admin`,
      label: t('organizationalStructure'),
      icon: Network,
      exact: true,
    },
    {
      href: `/${locale}/admin/general-plan`,
      label: t('generalPlan'),
      icon: FileText,
    },
    {
      href: `/${locale}/admin/hiring-plan`,
      label: t('hiringPlan'),
      icon: Users,
    },
  ];

  return (
    <div className="h-full bg-muted/30">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">{t('adminPanel')}</h2>
      </div>

      <nav className="p-4 space-y-1">
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
      </nav>
    </div>
  );
}

