import { Pathnames } from 'next-intl/navigation';

export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar' as const;

export const pathnames = {
  '/': '/',
  '/careers': '/careers',
  '/careers/apply/[position]': '/careers/apply/[position]',
  '/admin': '/admin',
  '/admin/applications': '/admin/applications',
  '/admin/applications/[id]': '/admin/applications/[id]',
  '/admin/general-plan': '/admin/general-plan',
  '/admin/hiring-plan': '/admin/hiring-plan',
  '/admin/timeline': '/admin/timeline',
} satisfies Pathnames<typeof locales>;

export const routing = {
  locales,
  defaultLocale,
  pathnames,
};

