import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/admin/:path*'],
};






