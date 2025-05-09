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

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    customer: {
      id: number;
      username: string;
      name: string;
      email: string;
      phone_number?: string;
      role: string;
      // omit password and other sensitive fields
    };
  };
  message?: string;
}