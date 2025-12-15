/**
 * Normalize route path for permission checking
 * Removes locale prefix if present
 */
export function normalizeRoute(pathname: string): string {
  // Remove locale prefix (e.g., /ar/admin/applications -> /admin/applications)
  // Handle both /ar/admin and /ar/admin/something
  const localeMatch = pathname.match(/^\/(ar|en)(\/admin.*)$/);
  if (localeMatch) {
    return localeMatch[2];
  }

  // If already starts with /admin, return as is
  if (pathname.startsWith('/admin')) {
    return pathname;
  }

  return pathname;
}

/**
 * Extract locale from pathname
 * Returns 'ar' or 'en' or null if not found
 */
export function extractLocale(pathname: string): string | null {
  const match = pathname.match(/^\/(ar|en)/);
  return match ? match[1] : null;
}

/**
 * Normalize callbackUrl to ensure it has the correct locale prefix
 * If callbackUrl doesn't have a locale, prepend the provided locale
 */
export function normalizeCallbackUrl(callbackUrl: string, locale: string): string {
  // Decode URL if encoded
  try {
    callbackUrl = decodeURIComponent(callbackUrl);
  } catch {
    // If decode fails, use as is
  }

  // Remove leading slash for processing
  const cleanUrl = callbackUrl.startsWith('/') ? callbackUrl : `/${callbackUrl}`;
  
  // Check if already has locale prefix
  const existingLocale = extractLocale(cleanUrl);
  if (existingLocale) {
    return cleanUrl;
  }

  // If doesn't start with /admin, ensure it does
  if (!cleanUrl.startsWith('/admin')) {
    return `/${locale}/admin`;
  }

  // Prepend locale
  return `/${locale}${cleanUrl}`;
}

/**
 * Build a localized path with proper locale prefix
 */
export function buildLocalizedPath(path: string, locale: string): string {
  // Remove any existing locale prefix
  const pathWithoutLocale = path.replace(/^\/(ar|en)/, '');
  
  // Ensure path starts with /
  const cleanPath = pathWithoutLocale.startsWith('/') 
    ? pathWithoutLocale 
    : `/${pathWithoutLocale}`;
  
  return `/${locale}${cleanPath}`;
}

