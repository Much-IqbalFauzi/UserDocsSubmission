import React, { createContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { generateToken, isTokenExpired, parseToken } from '../utils/token';
import { mockAuthLogin } from '../services/authService';

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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (!token) return;

    const parser = parseToken(token);
    if (!parser) return;

    const timeout = parser.expiry - Date.now();

    if (timeout <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [token]);

  const checkAuth = async () => {
    const token = await EncryptedStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedEmail = await AsyncStorage.getItem(STORAGE_KEYS.EMAIL);

    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      setToken(token);
      setEmail(savedEmail);
    } else {
      await logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await mockAuthLogin({ email, password });
      const token = generateToken(response.accessToken);

      await EncryptedStorage.setItem(STORAGE_KEYS.TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.EMAIL, email);

      setToken(token);
      setIsAuthenticated(true);
      setEmail(email);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Auth login gagal');
    }
  };

  const logout = async () => {
    await EncryptedStorage.removeItem(STORAGE_KEYS.TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.EMAIL);

    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
