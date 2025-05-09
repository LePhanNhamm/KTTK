import axios from 'axios';
import type { AxiosError } from 'axios/index';
import { Room } from '../types/room';

const API_BASE_URL = 'http://localhost:3000/api'; // Update this to match your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000 // Add timeout
});

const getAuthToken = () => localStorage.getItem('token');

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error Response:', error.response);
      throw error;
    } else if (error.request) {
      console.error('API Request Error:', error.request);
      throw new Error('Không thể kết nối đến máy chủ');
    } else {
      console.error('API Setup Error:', error.message);
      throw error;
    }
  }
);

export const roomApi = {
  getAllRooms: async (): Promise<Room[]> => {
    try {
      const response = await api.get<Room[]>('/rooms');
      return response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },

  getRoom: async (id: number): Promise<Room> => {
    try {
      const response = await api.get<Room>(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching room ${id}:`, error);
      throw error;
    }
  },

  createRoom: async (room: Omit<Room, 'id'>): Promise<Room> => {
    try {
      const response = await api.post<Room>('/rooms', room);
      return response.data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  },

  updateRoom: async (id: number, room: Partial<Room>): Promise<Room> => {
    try {
      const response = await api.put<Room>(`/rooms/${id}`, room);
      return response.data;
    } catch (error) {
      console.error(`Error updating room ${id}:`, error);
      throw error;
    }
  },

  deleteRoom: async (id: number): Promise<void> => {
    try {
      await api.delete(`/rooms/${id}`);
    } catch (error) {
      console.error(`Error deleting room ${id}:`, error);
      throw error;
    }
  },
};

export default api;