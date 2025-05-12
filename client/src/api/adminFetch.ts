const ADMIN_JWT_KEY = 'admin_jwt';

export default async function adminFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem(ADMIN_JWT_KEY);
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API error');
  }
  return response.json();
} 