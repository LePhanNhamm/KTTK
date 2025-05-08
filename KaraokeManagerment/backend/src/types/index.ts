export interface Customer {
    id: number;
    username: string;
    name: string;
    phone_number: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface Room {
    id: number;
    name: string;
    type: string;
    price_per_hour: number;
    capacity: number;
    created_at: Date;
    updated_at: Date;
}

export interface Booking {
    id: number;
    room_id: number;
    customer_id: number;
    start_time: Date;
    end_time: Date;
    status: 'pending' | 'confirmed' | 'canceled' | 'completed';
    total_amount: number;
    created_at: Date;
    updated_at: Date;
}