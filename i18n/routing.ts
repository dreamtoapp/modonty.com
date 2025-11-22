export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar' as const;

export const pathnames = {
  '/': '/',
  '/careers': '/careers',
  '/careers/apply/[position]': '/careers/apply/[position]',
  '/interview/[token]': '/interview/[token]',
  '/admin': '/admin',
  '/admin/applications': '/admin/applications',
  '/admin/applications/[id]': '/admin/applications/[id]',
  '/admin/applications/interviews': '/admin/applications/interviews',
  '/admin/applications/interview-result/[applicationId]': '/admin/applications/interview-result/[applicationId]',
  '/admin/general-plan': '/admin/general-plan',
  '/admin/hiring-plan': '/admin/hiring-plan',
  '/admin/timeline': '/admin/timeline',
} as const;

export const routing = {
  locales,
  defaultLocale,
  pathnames,
};

