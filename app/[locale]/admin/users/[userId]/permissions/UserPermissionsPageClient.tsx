'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, Save, Search, CheckCircle2, XCircle, Shield, User as UserIcon } from 'lucide-react';
import { updateUserRoutePermissions } from '@/actions/userPermissions';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

interface RouteItem {
  route: string;
  label: string;
}

interface UserPermissionsPageClientProps {
  user: User;
  initialRoutes: string[];
  allRoutes: RouteItem[];
  locale: string;
}

// Group routes by business category
const routeCategories = [
  {
    id: 'core',
    label: 'core',
    routes: ['/admin', '/admin/organizational-structure', '/admin/general-plan', '/admin/phase-1-requirements', '/admin/hiring-plan', '/admin/modonty', '/admin/bmc'],
  },
  {
    id: 'operations',
    label: 'operations',
    routes: ['/admin/applications', '/admin/applications/interviews', '/admin/staff', '/admin/contact-messages', '/admin/tasks', '/admin/tasks/my-tasks'],
  },
  {
    id: 'financial',
    label: 'financial',
    routes: ['/admin/accounting', '/admin/costs', '/admin/source-of-income', '/admin/subscriptions', '/admin/customers'],
  },
  {
    id: 'management',
    label: 'management',
    routes: ['/admin/notes', '/admin/contracts', '/admin/reports', '/admin/settings', '/admin/users'],
  },
];

export function UserPermissionsPageClient({
  user,
  initialRoutes,
  allRoutes,
  locale,
}: UserPermissionsPageClientProps) {
  const router = useRouter();
  const t = useTranslations('admin');
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>(initialRoutes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const isRTL = locale === 'ar';

  // Group routes by category
  const groupedRoutes = useMemo(() => {
    return routeCategories.map((category) => ({
      ...category,
      items: allRoutes.filter((route) => category.routes.includes(route.route)),
    }));
  }, [allRoutes]);

  // Filter routes based on search
  const filteredGroupedRoutes = useMemo(() => {
    if (!searchQuery.trim()) return groupedRoutes;

    const query = searchQuery.toLowerCase();
    return groupedRoutes.map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          t(item.label).toLowerCase().includes(query) ||
          item.route.toLowerCase().includes(query)
      ),
    })).filter((category) => category.items.length > 0);
  }, [groupedRoutes, searchQuery, t]);

  const handleRouteToggle = (route: string) => {
    setSelectedRoutes((prev) =>
      prev.includes(route)
        ? prev.filter((r) => r !== route)
        : [...prev, route]
    );
  };

  const handleGrantAllRoutes = () => {
    setSelectedRoutes(allRoutes.map((r) => r.route));
  };

  const handleRevokeAllRoutes = () => {
    setSelectedRoutes([]);
  };

  const handleSave = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      await updateUserRoutePermissions(user.id, selectedRoutes);
      // Navigate back to users page on success
      router.push(`/${locale}/admin/users`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update permissions');
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push(`/${locale}/admin/users`);
  };

  const hasChanges = useMemo(() => {
    if (selectedRoutes.length !== initialRoutes.length) return true;
    return !selectedRoutes.every((route) => initialRoutes.includes(route));
  }, [selectedRoutes, initialRoutes]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="space-y-4">
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            disabled={isSubmitting}
            className={isRTL ? 'flex-row-reverse' : ''}
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t('back')}
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{t('managePermissions')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('userPermissionsDescription')}
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <Card>
          <CardContent className="pt-6">
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="p-3 rounded-full bg-primary/10">
                <UserIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{user.email}</p>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
                {user.name && (
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                )}
              </div>
              <div className={`text-right ${isRTL ? 'text-left' : ''}`}>
                <div className="text-2xl font-bold text-primary">{selectedRoutes.length}</div>
                <div className="text-xs text-muted-foreground">
                  {t('routesSelected') || 'Routes Selected'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Quick Actions */}
      <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            placeholder={t('searchRoutes') || 'Search routes...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={isRTL ? 'pr-10' : 'pl-10'}
          />
        </div>
        <Button
          variant="outline"
          onClick={handleGrantAllRoutes}
          disabled={isSubmitting || selectedRoutes.length === allRoutes.length}
          size="sm"
        >
          <CheckCircle2 className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('grantAllRoutes')}
        </Button>
        <Button
          variant="outline"
          onClick={handleRevokeAllRoutes}
          disabled={isSubmitting || selectedRoutes.length === 0}
          size="sm"
        >
          <XCircle className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('revokeAllRoutes')}
        </Button>
      </div>

      {/* Route Categories */}
      <div className="space-y-4">
        {filteredGroupedRoutes.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-lg">{t(category.label) || category.label}</CardTitle>
              <CardDescription>
                {category.items.length} {t('routes') || 'routes'} •{' '}
                {category.items.filter((item) => selectedRoutes.includes(item.route)).length}{' '}
                {t('selected') || 'selected'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.items.map((routeItem) => {
                  const isChecked = selectedRoutes.includes(routeItem.route);
                  return (
                    <div
                      key={routeItem.route}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${isChecked
                        ? 'bg-primary/5 border-primary/20'
                        : 'bg-background hover:bg-muted/50'
                        } ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <Checkbox
                        id={`route-${routeItem.route}`}
                        checked={isChecked}
                        onCheckedChange={() => handleRouteToggle(routeItem.route)}
                        disabled={isSubmitting}
                      />
                      <Label
                        htmlFor={`route-${routeItem.route}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{t(routeItem.label)}</span>
                          {isChecked && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                          {routeItem.route}
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredGroupedRoutes.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {t('noRoutesFound') || 'No routes found matching your search'}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary and Actions */}
      {selectedRoutes.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground font-medium">
              {t('noRoutesSelected')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t('selectRoutesToGrant') || 'Select routes above to grant access'}
            </p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              <p className="font-medium">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className={`flex items-center justify-between pt-4 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="text-sm text-muted-foreground">
          {hasChanges && (
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              {t('unsavedChanges') || 'You have unsaved changes'}
            </span>
          )}
        </div>
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
            {t('cancel')}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSubmitting || !hasChanges}
            size="lg"
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className={`h-4 w-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('saving')}
              </>
            ) : (
              <>
                <Save className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('save')}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

