'use client';

import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AdminLogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('admin');

  const handleLogout = async () => {
    await signOut({ redirect: false });
    const locale = pathname.split('/')[1] || 'ar';
    router.push(`/${locale}/admin/login`);
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      {t('logout')}
    </Button>
  );
}














