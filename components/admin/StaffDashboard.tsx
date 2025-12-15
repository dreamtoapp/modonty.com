import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/common/MetricCard';
import { getUserTasks } from '@/actions/tasks';
import { getManagementNotes } from '@/actions/managementNotes';
import { UserRole, TaskStatus } from '@prisma/client';
import { ListTodo, FileText, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface StaffDashboardProps {
  userId: string;
  userName: string | null | undefined;
  locale: string;
  role: UserRole;
}

export async function StaffDashboard({
  userId,
  userName,
  locale,
  role,
}: StaffDashboardProps) {
  const isArabic = locale === 'ar';

  const [tasksResult, notesResult] = await Promise.all([
    getUserTasks(userId),
    getManagementNotes(userId, role),
  ]);

  const tasks = tasksResult.success ? tasksResult.tasks || [] : [];
  const notes = notesResult.success ? notesResult.notes || [] : [];

  const pendingTasks = tasks.filter((t) => t.status === TaskStatus.PENDING).length;
  const inProgressTasks = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length;
  const completedTasks = tasks.filter((t) => t.status === TaskStatus.COMPLETED).length;
  const unreadNotes = notes.filter((n) => !(n.readBy && n.readBy.includes(userId))).length;

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl space-y-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isArabic ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isArabic
              ? `مرحباً ${userName || ''}`
              : `Welcome, ${userName || 'User'}`}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title={isArabic ? 'إجمالي المهام' : 'Total Tasks'}
            value={tasks.length.toString()}
            icon={ListTodo}
          />
          <MetricCard
            title={isArabic ? 'مهام قيد الانتظار' : 'Pending Tasks'}
            value={pendingTasks.toString()}
            icon={Clock}
          />
          <MetricCard
            title={isArabic ? 'مهام قيد التنفيذ' : 'In Progress'}
            value={inProgressTasks.toString()}
            icon={CheckCircle2}
          />
          <MetricCard
            title={isArabic ? 'ملاحظات غير مقروءة' : 'Unread Notes'}
            value={unreadNotes.toString()}
            icon={FileText}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{isArabic ? 'مهامي' : 'My Tasks'}</CardTitle>
                  <CardDescription>
                    {isArabic
                      ? 'عرض وإدارة المهام المخصصة لك'
                      : 'View and manage tasks assigned to you'}
                  </CardDescription>
                </div>
                <ListTodo className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {isArabic ? 'إجمالي المهام' : 'Total Tasks'}
                  </span>
                  <span className="font-semibold">{tasks.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {isArabic ? 'مكتملة' : 'Completed'}
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {completedTasks}
                  </span>
                </div>
              </div>
              <Link href={`/${locale}/admin/tasks/my-tasks`}>
                <Button className="w-full" variant="outline">
                  {isArabic ? 'عرض جميع المهام' : 'View All Tasks'}
                  <ArrowRight className={`h-4 w-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{isArabic ? 'سجل الوقت' : 'My Time'}</CardTitle>
                  <CardDescription>
                    {isArabic
                      ? 'عرض سجل ساعات عملك في Clockify'
                      : 'View your Clockify time entries'}
                  </CardDescription>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/admin/my-time`}>
                <Button className="w-full" variant="outline">
                  {isArabic ? 'عرض سجل الوقت' : 'View My Time'}
                  <ArrowRight className={`h-4 w-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{isArabic ? 'الملاحظات' : 'Notes'}</CardTitle>
                  <CardDescription>
                    {isArabic
                      ? 'عرض الملاحظات والإعلانات المهمة'
                      : 'View important notes and announcements'}
                  </CardDescription>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {isArabic ? 'إجمالي الملاحظات' : 'Total Notes'}
                  </span>
                  <span className="font-semibold">{notes.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {isArabic ? 'غير مقروءة' : 'Unread'}
                  </span>
                  <span className="font-semibold text-primary">
                    {unreadNotes}
                  </span>
                </div>
              </div>
              <Link href={`/${locale}/admin/notes`}>
                <Button className="w-full" variant="outline">
                  {isArabic ? 'عرض جميع الملاحظات' : 'View All Notes'}
                  <ArrowRight className={`h-4 w-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
