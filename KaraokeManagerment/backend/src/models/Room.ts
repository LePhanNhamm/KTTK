export interface Room {
    id: number;
    name: string;
    type: 'Standard' | 'VIP' | 'Premium' | 'Suite';
    price_per_hour: number;
    capacity: number;
    status: 'available' | 'occupied' | 'maintenance';
    created_at: Date;
    updated_at: Date;
}