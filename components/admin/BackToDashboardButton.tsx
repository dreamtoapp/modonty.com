'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface BackToDashboardButtonProps {
  userRole?: string;
}

export function BackToDashboardButton({ userRole }: BackToDashboardButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('admin');

  // Only show for STAFF users and when not on dashboard route
  if (userRole !== 'STAFF' && userRole !== 'Staff') return null;

  const isOnDashboard = pathname === `/${locale}/admin` || pathname === `/${locale}/admin/`;

  if (isOnDashboard) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/${locale}/admin`);
  };

  return (
    <Button variant="ghost" size="sm" type="button" onClick={handleClick}>
      <LayoutDashboard className="h-4 w-4 mr-2" />
      {t('backToDashboard')}
    </Button>
  );
}






