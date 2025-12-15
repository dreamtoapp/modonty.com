'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, LogOut, ArrowLeft } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface User {
  email: string;
  name: string | null;
  role: string;
}

interface NoPermissionsClientProps {
  user: User | null;
  accessibleRoutes: string[];
  locale: string;
}

export function NoPermissionsClient({
  user,
  accessibleRoutes,
  locale,
}: NoPermissionsClientProps) {
  const router = useRouter();
  const t = useTranslations('admin');
  const isRTL = locale === 'ar';

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/${locale}/admin/login` });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <AlertCircle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle>{t('noPermissionsTitle') || 'No Access Permissions'}</CardTitle>
              <CardDescription>
                {t('noPermissionsDescription') || 'You do not have permission to access this area'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>{t('user') || 'User'}:</strong> {user.email}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>{t('role') || 'Role'}:</strong> {user.role}
              </p>
            </div>
          )}

          {accessibleRoutes.length === 0 ? (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {t('noRoutesAssigned') || 'No routes have been assigned to your account. Please contact an administrator to grant you access.'}
              </p>
            </div>
          ) : (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">
                {t('accessibleRoutes') || 'Your accessible routes:'}
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {accessibleRoutes.map((route) => (
                  <li key={route}>• {route}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button variant="outline" onClick={handleLogout} className="flex-1">
              <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('logout') || 'Logout'}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/${locale}`)}
              className="flex-1"
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {t('backToWebsite') || 'Back to Website'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


















