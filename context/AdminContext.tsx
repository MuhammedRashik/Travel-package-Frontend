'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AdminContextType {
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('adminToken');
    const storedAdmin = localStorage.getItem('adminData');

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
      
      // Verify token validity
      authAPI.verify(storedToken)
        .then((data) => {
          if (!data.admin) {
            logout();
          }
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authAPI.login(email, password);
      
      if (data.token && data.admin) {
        setToken(data.token);
        setAdmin(data.admin);
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    authAPI.logout();
  };

  return (
    <AdminContext.Provider value={{ admin, token, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};