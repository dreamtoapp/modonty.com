'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface ProfilePageClientProps {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    isActive: boolean;
    lastLogin: Date | null;
    createdAt: Date;
  };
  staff: {
    department: string | null;
    employeeId: string | null;
    status: string;
    officialEmail: string | null;
    application: {
      profileImageUrl: string;
      profileImagePublicId: string;
      position: string;
    } | null;
  } | null;
  stats: {
    tasksAssigned: number;
    tasksCreated: number;
    notesCreated: number;
  };
  locale: string;
}

export function ProfilePageClient({
  user,
  staff,
  stats,
  locale,
}: ProfilePageClientProps) {
  const isArabic = locale === 'ar';

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isArabic ? 'الملف الشخصي' : 'Profile'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isArabic ? 'عرض وتعديل معلومات حسابك' : 'View and edit your account information'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {isArabic ? 'معلومات المستخدم' : 'User Information'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'الاسم' : 'Name'}
              </label>
              <p className="text-base">{user.name || '-'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <p className="text-base">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'الدور' : 'Role'}
              </label>
              <p className="text-base">{user.role}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'الحالة' : 'Status'}
              </label>
              <p className="text-base">{user.isActive ? (isArabic ? 'نشط' : 'Active') : (isArabic ? 'غير نشط' : 'Inactive')}</p>
            </div>
          </CardContent>
        </Card>

        {staff && (
          <Card>
            <CardHeader>
              <CardTitle>
                {isArabic ? 'معلومات الموظف' : 'Staff Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {staff.department && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {isArabic ? 'القسم' : 'Department'}
                  </label>
                  <p className="text-base">{staff.department}</p>
                </div>
              )}
              {staff.employeeId && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {isArabic ? 'رقم الموظف' : 'Employee ID'}
                  </label>
                  <p className="text-base">{staff.employeeId}</p>
                </div>
              )}
              {staff.application?.position && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {isArabic ? 'المنصب' : 'Position'}
                  </label>
                  <p className="text-base">{staff.application.position}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? 'الإحصائيات' : 'Statistics'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'المهام المخصصة' : 'Tasks Assigned'}
              </label>
              <p className="text-2xl font-bold">{stats.tasksAssigned}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'المهام المنشأة' : 'Tasks Created'}
              </label>
              <p className="text-2xl font-bold">{stats.tasksCreated}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'الملاحظات المنشأة' : 'Notes Created'}
              </label>
              <p className="text-2xl font-bold">{stats.notesCreated}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


