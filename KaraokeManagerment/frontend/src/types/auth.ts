export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
  name: string;
  phone_number: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone_number?: string;
}

export interface AuthData {
  token: string;
  customer: User;
}

export interface AuthResponse {
  success: boolean;
  data: AuthData;
  message?: string;
}