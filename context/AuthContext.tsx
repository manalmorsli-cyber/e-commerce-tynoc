'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  isMounted: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem('tynoc_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const login = (email: string, name?: string) => {
    const userData: User = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email,
      role: 'user',
    };
    setUser(userData);
    localStorage.setItem('tynoc_user', JSON.stringify(userData));
  };

  const register = (name: string, email: string) => {
    const userData: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
    };
    setUser(userData);
    localStorage.setItem('tynoc_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tynoc_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isMounted }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}