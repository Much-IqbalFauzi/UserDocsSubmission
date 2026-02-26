import axios from 'axios';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { isTokenExpired } from '../utils/token';
import EncryptedStorage from 'react-native-encrypted-storage';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

api.interceptors.request.use(async config => {
  const token = await EncryptedStorage.getItem(STORAGE_KEYS.TOKEN);

  const controller = new AbortController();
  if (token && isTokenExpired(token)) {
    controller.abort();
  }

  return config;
});
