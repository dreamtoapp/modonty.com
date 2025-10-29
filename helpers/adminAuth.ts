export function validateCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('ADMIN_USERNAME or ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  return username === adminUsername && password === adminPassword;
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

