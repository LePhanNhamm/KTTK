export interface Customer {
    id?: number;
    username: string;
    password: string;
    name: string | null;
    email: string;
    phone_number: string | null;
    role: 'user' | 'admin';
    created_at?: Date;
    updated_at?: Date;
}

export interface Room {
    id?: number;
    name: string;
    type: string;
    price_per_hour: number;
    capacity: number;
    status: 'available' | 'occupied' | 'maintenance';
    created_at?: Date;
    updated_at?: Date;
}

export interface Booking {
    id?: number;
    room_id: number;
    customer_id: number;
    start_time: Date;
    end_time: Date;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    total_amount?: number;
    notes?: string;
    created_at?: Date;
    updated_at?: Date;
}

// Add API response interfaces
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}