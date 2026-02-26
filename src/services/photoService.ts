import { api } from './api';
import { Album } from '../types/album';

export const getPhotoByAlbumId = async (
  id: number,
  signal?: AbortSignal,
): Promise<Album> => {
  const response = await api.get<Album>(`/post/${id}`, { signal });
  return response.data;
};
