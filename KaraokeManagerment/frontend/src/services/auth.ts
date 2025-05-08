import api from './api';
import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { token, customer } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(customer));
      return response.data;
    } catch (error) {
      console.error('Login failed');
      throw error;
    }
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', credentials);
      if (response.data.success) {
        const { token, customer } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(customer));
      }
      return response.data;
    } catch (error) {
      console.error('Registration failed');
      throw error;
    }
  },

  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get<{ success: boolean; data: User }>('/profile');
      return response.data.data;
    } catch (error) {
      console.error('Failed to get profile');
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};