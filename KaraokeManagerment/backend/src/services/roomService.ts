import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import database from '../config/database';

export interface Room {
    id: number;
    name: string;
    type?: string;
    price_per_hour: number;
    capacity: number;
    status: 'available' | 'occupied' | 'maintenance';
    created_at: Date;
    updated_at: Date;
}

interface RoomRow extends RowDataPacket, Room {}

class RoomService {
    private db: Pool;

    constructor() {
        this.db = database.getPool();
    }

    async createRoom(roomData: Omit<Room, 'id' | 'created_at' | 'updated_at'>): Promise<Room> {
        try {
            const [result] = await this.db.execute<ResultSetHeader>(
                'INSERT INTO rooms (name, type, price_per_hour, capacity, status) VALUES (?, ?, ?, ?, ?)',
                [
                    roomData.name,
                    roomData.type,
                    roomData.price_per_hour,
                    roomData.capacity,
                    roomData.status
                ]
            );
            
            const room = await this.getRoomById(result.insertId);
            if (!room) {
                throw new Error('Failed to retrieve created room');
            }
            return room;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create room: ${error.message}`);
            }
            throw new Error('Failed to create room: Unknown error');
        }
    }

    async getRoomById(id: number): Promise<Room | null> {
        try {
            const [rows] = await this.db.execute<RoomRow[]>(
                'SELECT * FROM rooms WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get room: ${error.message}`);
            }
            throw new Error('Failed to get room: Unknown error');
        }
    }

    async getAllRooms(): Promise<Room[]> {
        try {
            const [rows] = await this.db.execute<RoomRow[]>('SELECT * FROM rooms');
            return rows;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get all rooms: ${error.message}`);
            }
            throw new Error('Failed to get all rooms: Unknown error');
        }
    }

    async updateRoom(id: number, roomData: Partial<Omit<Room, 'id' | 'created_at' | 'updated_at'>>): Promise<Room> {
        try {
            const setClause = Object.keys(roomData)
                .map(key => `${key} = ?`)
                .join(', ');
            
            await this.db.execute(
                `UPDATE rooms SET ${setClause} WHERE id = ?`,
                [...Object.values(roomData), id]
            );

            const room = await this.getRoomById(id);
            if (!room) {
                throw new Error('Room not found after update');
            }
            return room;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update room: ${error.message}`);
            }
            throw new Error('Failed to update room: Unknown error');
        }
    }

    async deleteRoom(id: number): Promise<boolean> {
        try {
            const [result] = await this.db.execute<ResultSetHeader>(
                'DELETE FROM rooms WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete room: ${error.message}`);
            }
            throw new Error('Failed to delete room: Unknown error');
        }
    }
}

export default RoomService;