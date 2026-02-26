import { AuthLoginInput, AuthLoginResponse } from '../types/auth';

const MOCK_AUTH_EMAIL = 'google@gmail.com';
const MOCK_AUTH_PASSWORD = '123456';

export const mockAuthLogin = async (
  input: AuthLoginInput,
): Promise<AuthLoginResponse> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // cek delay

  if (input.email !== MOCK_AUTH_EMAIL) {
    throw new Error('Email Auth tidak terdaftar');
  }

  if (input.password !== MOCK_AUTH_PASSWORD) {
    throw new Error('Password Auth salah');
  }

  return {
    email: input.email,
    accessToken: `mock_auth_token_${Date.now()}`,
  };
};
