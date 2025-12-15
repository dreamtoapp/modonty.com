import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { auth } from '@/lib/auth';
import { hasRoutePermission } from '@/lib/auth/permissions';
import { normalizeRoute } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public API routes and auth routes
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/upload') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return intlMiddleware(request);
  }

  // Normalize pathname for checking (remove locale prefix if exists)
  const normalizedPath = pathname.replace(/^\/(ar|en)/, '') || pathname;

  // Check if route is admin route (excluding login and no-permissions)
  const isAdminRoute = normalizedPath.startsWith('/admin') &&
    !normalizedPath.startsWith('/admin/login') &&
    !normalizedPath.startsWith('/admin/no-permissions');
  const isLoginRoute = normalizedPath.startsWith('/admin/login');
  const isNoPermissionsRoute = normalizedPath.startsWith('/admin/no-permissions');

  // Allow no-permissions route to be accessed (it handles its own auth)
  if (isNoPermissionsRoute) {
    return intlMiddleware(request);
  }

  if (isAdminRoute && !isLoginRoute) {
    // IMPORTANT: Delete old adminToken cookie if it exists (migration from old auth)
    const oldAdminToken = request.cookies.get('adminToken');

    // Get NextAuth session (REQUIRED - old auth no longer works)
    // In middleware, auth() automatically uses headers() from Next.js
    // But we need to ensure it has access to cookies for session validation
    const session = await auth();

    // Strict validation: Must have NextAuth session with user data
    // Old adminToken cookie will NOT work - only NextAuth session is valid
    // Check if session exists AND has required user properties
    const hasValidSession =
      session?.user &&
      typeof session.user.id === 'string' &&
      session.user.role &&
      typeof session.user.email === 'string';

    if (!hasValidSession) {
      // Clear any old cookies and redirect to login
      const locale = pathname.split('/')[1] || 'ar';
      const loginUrl = new URL(`/${locale}/admin/login`, request.nextUrl.origin);
      loginUrl.searchParams.set('callbackUrl', pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);

      // Delete old cookie if it exists (cleanup)
      if (oldAdminToken) {
        redirectResponse.cookies.delete('adminToken');
      }

      return redirectResponse;
    }

    // Normalize route for permission check (remove locale prefix)
    const normalizedRoute = normalizeRoute(pathname);

    // Check route permissions (using userId instead of userRole)
    const hasPermission = await hasRoutePermission(
      normalizedRoute,
      session.user.id
    );

    if (!hasPermission) {
      const locale = pathname.split('/')[1] || 'ar';

      // Check if user has ANY routes assigned
      const userRoutes = await prisma.userRoutePermission.findMany({
        where: { userId: session.user.id },
        select: { route: true },
        take: 1, // Just check if any exist
      });

      // If user has no routes at all, redirect to no-permissions page (prevents redirect loop)
      if (userRoutes.length === 0 && normalizedRoute !== '/admin/no-permissions') {
        const noPermissionsUrl = new URL(`/${locale}/admin/no-permissions`, request.nextUrl.origin);
        const redirectResponse = NextResponse.redirect(noPermissionsUrl);

        if (oldAdminToken) {
          redirectResponse.cookies.delete('adminToken');
        }

        return redirectResponse;
      }

      // If user has some routes but not this one, redirect to no-permissions page
      // But allow access to no-permissions page itself
      if (normalizedRoute !== '/admin/no-permissions') {
        const noPermissionsUrl = new URL(`/${locale}/admin/no-permissions`, request.nextUrl.origin);
        const redirectResponse = NextResponse.redirect(noPermissionsUrl);

        if (oldAdminToken) {
          redirectResponse.cookies.delete('adminToken');
        }

        return redirectResponse;
      }

      // If we're already on no-permissions page, allow it
      // (fall through to continue processing)
    }

    // User is authenticated and has permission
    // Apply intl middleware and delete old cookie if it exists
    const response = await intlMiddleware(request);
    if (oldAdminToken) {
      response.cookies.delete('adminToken');
    }

    return response;
  }

  // If authenticated and on login page, redirect appropriately
  if (isLoginRoute) {
    const session = await auth();
    if (session?.user && session.user.id && session.user.role && session.user.email) {
      const locale = pathname.split('/')[1] || 'ar';

      // Check if user has any routes assigned
      const userRoutes = await prisma.userRoutePermission.findMany({
        where: { userId: session.user.id },
        select: { route: true },
        take: 1,
      });

      // If user has no routes, redirect to no-permissions page instead of /admin
      if (userRoutes.length === 0) {
        return NextResponse.redirect(new URL(`/${locale}/admin/no-permissions`, request.nextUrl.origin));
      }

      // Check if there's a callbackUrl in query params
      const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');

      // Normalize callbackUrl if present, otherwise default to /admin
      let redirectPath = `/${locale}/admin`;
      if (callbackUrl) {
        try {
          // Decode and validate callbackUrl
          const decodedUrl = decodeURIComponent(callbackUrl);
          // Ensure it has locale prefix
          if (decodedUrl.startsWith('/admin')) {
            redirectPath = `/${locale}${decodedUrl}`;
          } else if (decodedUrl.startsWith(`/${locale}/admin`)) {
            redirectPath = decodedUrl;
          } else if (decodedUrl.match(/^\/(ar|en)\/admin/)) {
            // Has a different locale, use current locale
            redirectPath = decodedUrl.replace(/^\/(ar|en)/, `/${locale}`);
          }
        } catch {
          // If URL parsing fails, use default
          redirectPath = `/${locale}/admin`;
        }
      }

      return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin));
    }

    // Not authenticated - allow access to login page
    // Delete old cookie on login page
    const oldAdminToken = request.cookies.get('adminToken');
    if (oldAdminToken) {
      const response = await intlMiddleware(request);
      response.cookies.delete('adminToken');
      return response;
    }

    // Allow login page to render (no auth required)
    return intlMiddleware(request);
  }

  // Continue with intl middleware for non-admin routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
