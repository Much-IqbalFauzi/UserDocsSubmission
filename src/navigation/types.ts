import { User } from '../types/user';

export type RootStackParamList = {
  Login: {};
  Home: {};
  Detail: { paramItem: User };
};
