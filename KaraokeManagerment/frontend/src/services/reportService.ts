import api from './api';
import { ApiResponse } from '../types/interfaces';

export const reportService = {
    getMonthlyRevenue: async (year: number = new Date().getFullYear()): Promise<ApiResponse<any[]>> => {
        try {
            const response = await api.get<ApiResponse<any[]>>('/reports/revenue/monthly', {
                params: { year }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching monthly revenue:', error);
            throw error.response?.data || error;
        }
    },

    getQuarterlyRevenue: async (year: number = new Date().getFullYear()): Promise<ApiResponse<any[]>> => {
        try {
            const response = await api.get<ApiResponse<any[]>>('/reports/revenue/quarterly', {
                params: { year }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching quarterly revenue:', error);
            throw error.response?.data || error;
        }
    },

    getYearlyRevenue: async (startYear: number = new Date().getFullYear() - 5, endYear: number = new Date().getFullYear()): Promise<ApiResponse<any[]>> => {
        try {
            const response = await api.get<ApiResponse<any[]>>('/reports/revenue/yearly', {
                params: { startYear, endYear }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching yearly revenue:', error);
            throw error.response?.data || error;
        }
    },

    getTopRooms: async (year: number = new Date().getFullYear(), limit: number = 5): Promise<ApiResponse<any[]>> => {
        try {
            const response = await api.get<ApiResponse<any[]>>('/reports/rooms/top', {
                params: { year, limit }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching top rooms:', error);
            throw error.response?.data || error;
        }
    }
};
