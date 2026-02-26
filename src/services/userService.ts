import { api } from './api';
import { User } from '../types/user';

export const getUsers = async (signal?: AbortSignal): Promise<User[]> => {
  const response = await api.get<User[]>('/users', { signal });
  return response.data;
};

export const getUserById = async (
  id: number,
  signal?: AbortSignal,
): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`, { signal });
  return response.data;
};
