import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { UserRole } from '@prisma/client';
import { getStaffById } from '@/actions/staff';
import { StaffDetailClient } from './StaffDetailClient';

export default async function StaffDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const session = await auth();
  const { locale, id } = await params;

  // Only ADMIN and SUPER_ADMIN can access this page
  if (
    !session?.user ||
    (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN)
  ) {
    redirect(`/${locale}/admin`);
  }

  const result = await getStaffById(id);

  if (!result.success || !result.staff) {
    notFound();
  }

  // Check if application relation exists, show warning if missing
  const hasApplication = !!result.staff.application;

  return (
    <StaffDetailClient
      staff={result.staff}
      locale={locale}
      hasApplication={hasApplication}
    />
  );
}








