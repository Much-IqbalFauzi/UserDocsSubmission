import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

interface AuthContextType {
  isAuthenticated: boolean | null;
  email: string | null;
  login: (email: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedEmail = await AsyncStorage.getItem(STORAGE_KEYS.EMAIL);
    if (token) {
      setIsAuthenticated(true);
      setEmail(savedEmail);
    }
  };

  const login = async (email: string, token: string) => {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    await AsyncStorage.setItem(STORAGE_KEYS.EMAIL, email);
    setIsAuthenticated(true);
    setEmail(email);
  };

  const logout = async () => {
    await AsyncStorage.removeMany([STORAGE_KEYS.TOKEN, STORAGE_KEYS.EMAIL]);
    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
