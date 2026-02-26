import { AuthToken } from '../types/auth';

export const generateToken = (email: string): string => {
  const token: AuthToken = {
    email,
    expiry: Date.now() + 1 * 60 * 1000,
  };

  return JSON.stringify(token);
};

export const parseToken = (token: string): AuthToken | null => {
  try {
    return JSON.parse(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const parsed = parseToken(token);
  if (!parsed) return true;
  return Date.now() > parsed.expiry;
};
