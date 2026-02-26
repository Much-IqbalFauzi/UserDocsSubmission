import { api } from './api';
import { Album } from '../types/album';

export const getAlbums = async (signal?: AbortSignal): Promise<Album[]> => {
  const response = await api.get<Album[]>('/albums', { signal });
  return response.data;
};

export const getALbumById = async (
  id: number,
  signal?: AbortSignal,
): Promise<Album> => {
  const response = await api.get<Album>(`/albums/${id}`, { signal });
  return response.data;
};
