'use server';

import { cookies } from 'next/headers';
import { ADMIN_PASSWORD } from '@/helpers/adminAuth';

export async function adminLogin(password: string) {
  if (password !== ADMIN_PASSWORD) {
    return { success: false, error: 'Invalid password' };
  }

  const cookieStore = await cookies();
  const token = btoa(`${Date.now()}-admin-session`);

  cookieStore.set('adminToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('adminToken');
  return { success: true };
}

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('adminToken');
  return { isAuthenticated: !!adminToken };
}

