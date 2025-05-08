// src/types/index.ts

export interface Room {
    id: string;
    name: string;
    capacity: number;
    pricePerHour: number;
}

export interface Booking {
    id: string;
    roomId: string;
    customerName: string;
    bookingDate: Date;
    duration: number; // in hours
}

export interface RevenueReport {
    totalRevenue: number;
    bookingsCount: number;
}

export interface RoomUsageReport {
    roomId: string;
    usageCount: number;
}