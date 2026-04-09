import { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('medusa_admin_token'));
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('medusa_admin_data');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      const { token: newToken, admin: adminData } = res.data;
      localStorage.setItem('medusa_admin_token', newToken);
      localStorage.setItem('medusa_admin_data', JSON.stringify(adminData));
      setToken(newToken);
      setAdmin(adminData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('medusa_admin_token');
    localStorage.removeItem('medusa_admin_data');
    setToken(null);
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, admin, loading, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
