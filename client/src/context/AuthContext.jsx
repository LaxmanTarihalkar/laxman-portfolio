import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getMe, adminLogin, adminLogout } from '../services/api.js';

const AuthContext = createContext(null);

/**
 * Holds the admin session. On mount it pings /api/auth/me to restore a
 * session from the HTTP-only cookie. The cookie itself is never readable by
 * JS, so "admin" presence is the only session signal the frontend needs.
 */
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await getMe();
      setAdmin(res.data?.data?.admin ?? null);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (credentials) => {
    const res = await adminLogin(credentials);
    setAdmin(res.data?.data?.admin ?? null);
    return res;
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } finally {
      setAdmin(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
