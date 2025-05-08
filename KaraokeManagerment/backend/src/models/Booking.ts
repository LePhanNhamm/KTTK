export interface Booking {
    id: number;
    room_id: number;
    customer_id: number;
    start_time: Date;
    end_time: Date;
    status: 'pending' | 'confirmed' | 'canceled' | 'completed';
    total_amount: number;
    created_at?: Date;
    updated_at?: Date;
}