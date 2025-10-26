import { Pathnames } from 'next-intl/navigation';

export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar' as const;

export const pathnames = {
  '/': '/',
  '/general-plan': '/general-plan',
  '/hiring-plan': '/hiring-plan',
  '/timeline': '/timeline',
  '/careers': '/careers',
} satisfies Pathnames<typeof locales>;

export const routing = {
  locales,
  defaultLocale,
  pathnames,
};

