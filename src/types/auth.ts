export interface AuthToken {
  email: string;
  expiry: number;
}

export interface AuthLoginInput {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  email: string;
  accessToken: string;
}
