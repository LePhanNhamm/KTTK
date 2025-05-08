export interface Room {
  id: number;
  name: string;
  capacity: number;
  status?: 'available' | 'occupied' | 'maintenance';
  price?: number;
}

export interface RoomCardProps {
  room: Room;
  onEdit?: (room: Room) => void;
  onDelete?: (id: number) => void;
}