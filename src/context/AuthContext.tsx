import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';
import EncryptedStorage from 'react-native-encrypted-storage';
import { isTokenExpired } from '../utils/token';

interface AuthContextType {
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await EncryptedStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedEmail = await EncryptedStorage.getItem(STORAGE_KEYS.EMAIL);
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      setEmail(savedEmail);
    } else {
      await logout();
    }
  };

  const login = async (email: string, token: string) => {
    await EncryptedStorage.setItem(STORAGE_KEYS.TOKEN, token);
    await EncryptedStorage.setItem(STORAGE_KEYS.EMAIL, email);

    setIsAuthenticated(true);
    setEmail(email);
  };

  const logout = async () => {
    await EncryptedStorage.removeItem(STORAGE_KEYS.TOKEN);
    await EncryptedStorage.removeItem(STORAGE_KEYS.EMAIL);
    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
