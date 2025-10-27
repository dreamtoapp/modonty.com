import { Pathnames } from 'next-intl/navigation';

export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar' as const;

export const pathnames = {
  '/': '/',
  '/careers': '/careers',
  '/admin': '/admin',
  '/admin/general-plan': '/admin/general-plan',
  '/admin/hiring-plan': '/admin/hiring-plan',
  '/admin/timeline': '/admin/timeline',
} satisfies Pathnames<typeof locales>;

export const routing = {
  locales,
  defaultLocale,
  pathnames,
};

