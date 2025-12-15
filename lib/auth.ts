import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // Adapter is optional for JWT strategy with credentials provider
  // It won't be used for credentials, only for future OAuth providers
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  trustHost: true,
});

