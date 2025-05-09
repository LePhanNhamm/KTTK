export interface Room {
  id?: number;  // Optional for creation, present after saving
  name: string;
  type: 'Thường' | 'VIP';
  capacity: number;
  price_per_hour: number;
  status?: 'available' | 'occupied' | 'maintenance';
  created_at?: Date;  // Add timestamp fields
  updated_at?: Date;
}

export interface RoomCardProps {
  room: Room;
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;  // Changed to pass whole room object
}