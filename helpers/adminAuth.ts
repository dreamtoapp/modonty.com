export const ADMIN_PASSWORD = 'admin';

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAdminSession(): void {
  if (typeof window !== 'undefined') {
    const token = btoa(`${Date.now()}-admin-session`);
    localStorage.setItem('adminToken', token);
  }
}

export function getAdminSession(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
}

export function clearAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
  }
}

export function isAuthenticated(): boolean {
  return getAdminSession() !== null;
}

