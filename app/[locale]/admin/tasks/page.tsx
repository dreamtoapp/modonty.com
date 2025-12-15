import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import { getAllTasks } from '@/actions/tasks';
import { prisma } from '@/lib/prisma';
import { TasksPageClient } from './TasksPageClient';

export default async function TasksPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user || (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN)) {
    redirect(`/${locale}/admin`);
  }

  const [tasksResult, users] = await Promise.all([
    getAllTasks(),
    prisma.user.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: 'asc',
      },
    }),
  ]);

  const tasks = tasksResult.success ? tasksResult.tasks || [] : [];

  return (
    <TasksPageClient
      tasks={tasks}
      users={users}
      currentUserId={session.user.id}
      locale={locale}
    />
  );
}

