export interface Room {
  id: number;
  name: string;
  type: 'Thường' | 'VIP';
  price_per_hour: number;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface Booking {
  id?: number;
  room_id: number;
  customer_id: number;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled'| 'completed';
  total_amount?: number;
  notes?: string;
}