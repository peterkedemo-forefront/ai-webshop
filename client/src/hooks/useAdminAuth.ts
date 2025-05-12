import { useState } from 'react';

const ADMIN_JWT_KEY = 'admin_jwt';

export default function useAdminAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = Boolean(localStorage.getItem(ADMIN_JWT_KEY));

  const login = async (password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Login failed');
        setLoading(false);
        return false;
      }
      const data = await res.json();
      localStorage.setItem(ADMIN_JWT_KEY, data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError('Network error');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_JWT_KEY);
  };

  return { login, logout, isAuthenticated, error, loading };
} 