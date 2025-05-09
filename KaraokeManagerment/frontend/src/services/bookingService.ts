import api from './api';
import { ApiResponse } from '../types/api';
import { Room, Booking } from '../types/booking';

export const bookingService = {
  findAvailableRooms: async (startTime: string, endTime: string): Promise<ApiResponse<Room[]>> => {
    try {
      // Validate dates first
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Định dạng thời gian không hợp lệ');
      }

      if (start >= end) {
        throw new Error('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc');
      }

      if (start < new Date()) {
        throw new Error('Không thể đặt phòng trong quá khứ');
      }

      // Make API call
      const response = await api.get<ApiResponse<Room[]>>('/bookings/available', {
        params: {
          start_time: start.toISOString(),
          end_time: end.toISOString()
        }
      });

      return response.data;

    } catch (error: any) {
      console.error('Error in findAvailableRooms:', error);
      throw error.response?.data || error;
    }
  },

  createBooking: async (bookingData: Partial<Booking>): Promise<ApiResponse<Booking>> => {
    try {
      // Helper function to format date
      const formatDate = (date: Date | string | undefined): string | undefined => {
        if (!date) return undefined;
        return typeof date === 'string' 
          ? new Date(date).toISOString()
          : (date as Date).toISOString();
      };

      const formattedData = {
        ...bookingData,
        start_time: formatDate(bookingData.start_time),
        end_time: formatDate(bookingData.end_time)
      };

      const response = await api.post<ApiResponse<Booking>>('/bookings', formattedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  getAllBookings: async (): Promise<ApiResponse<Booking[]>> => {
    try {
      const response = await api.get<ApiResponse<Booking[]>>('/bookings');
      return response.data;
    } catch (error) {
      console.error('Error getting all bookings:', error);
      throw error;
    }
  }
};