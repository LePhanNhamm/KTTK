import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Booking } from '../models/Booking';
import { Room } from '../types';  // Import Room interface
import database from '../config/database';

interface BookingRow extends RowDataPacket, Booking {}

class BookingService {
    private db: Pool;

    constructor() {
        this.db = database.getPool();
    }

    async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
        try {
            const [result] = await this.db.execute<ResultSetHeader>(
                'INSERT INTO bookings (room_id, customer_id, start_time, end_time, status) VALUES (?, ?, ?, ?, ?)',
                [
                    bookingData.room_id,
                    bookingData.customer_id,
                    bookingData.start_time,
                    bookingData.end_time,
                    bookingData.status
                ]
            );
            
            const booking = await this.getBookingById(result.insertId);
            if (!booking) {
                throw new Error('Failed to retrieve created booking');
            }
            return booking;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create booking: ${error.message}`);
            }
            throw new Error('Failed to create booking: Unknown error');
        }
    }

    async getBookingById(id: number): Promise<Booking | null> {
        try {
            const [rows] = await this.db.execute<BookingRow[]>(
                'SELECT * FROM bookings WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get booking: ${error.message}`);
            }
            throw new Error('Failed to get booking: Unknown error');
        }
    }

    async updateBooking(id: number, updateData: Partial<Booking>): Promise<Booking> {
        try {
            const setClause = Object.keys(updateData)
                .map(key => `${key} = ?`)
                .join(', ');
            
            await this.db.execute(
                `UPDATE bookings SET ${setClause} WHERE id = ?`,
                [...Object.values(updateData), id]
            );

            const booking = await this.getBookingById(id);
            if (!booking) {
                throw new Error('Booking not found after update');
            }
            return booking;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update booking: ${error.message}`);
            }
            throw new Error('Failed to update booking: Unknown error');
        }
    }

    async deleteBooking(id: number): Promise<boolean> {
        try {
            const [result] = await this.db.execute<ResultSetHeader>(
                'DELETE FROM bookings WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete booking: ${error.message}`);
            }
            throw new Error('Failed to delete booking: Unknown error');
        }
    }

    async getAllBookings(): Promise<Booking[]> {
        try {
            const [rows] = await this.db.execute<BookingRow[]>('SELECT * FROM bookings');
            return rows;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get all bookings: ${error.message}`);
            }
            throw new Error('Failed to get all bookings: Unknown error');
        }
    }

    async findAvailableRooms(
        startTime: Date, 
        endTime: Date,
    ) {
        try {
            let query = `
                SELECT r.* 
                FROM rooms r
                WHERE r.status = 'available'
                AND r.id NOT IN (
                    SELECT b.room_id
                    FROM bookings b
                    WHERE b.status IN ('pending', 'confirmed')
                    AND (
                        (b.start_time < ? AND b.end_time > ?)
                        OR (b.start_time < ? AND b.end_time > ?)
                        OR (b.start_time >= ? AND b.end_time <= ?)
                    )
                )
                ORDER BY r.price_per_hour ASC, r.name ASC
            `;
            
            const queryParams: (Date | string | number)[] = [
                endTime, startTime,
                endTime, startTime,
                startTime, endTime
            ];

            const [rows] = await this.db.execute(query, queryParams);

            return (rows as any[]).map(row => ({
                id: row.id,
                name: row.name,
                type: row.type,
                price_per_hour: Number(row.price_per_hour),
                capacity: Number(row.capacity),
                status: row.status as Room['status'],
                created_at: row.created_at ? new Date(row.created_at) : undefined,
                updated_at: row.updated_at ? new Date(row.updated_at) : undefined
            }));

        } catch (error) {
            console.error('Error finding available rooms:', error);
            throw new Error('Failed to find available rooms');
        }
    }

    async isRoomAvailable(roomId: number, startTime: Date, endTime: Date): Promise<boolean> {
        try {
            const query = `
                SELECT COUNT(*) as count
                FROM bookings
                WHERE room_id = ?
                AND (
                    (start_time < ? AND end_time > ?)
                    OR (start_time < ? AND end_time > ?)
                    OR (start_time >= ? AND end_time <= ?)
                )
            `;

            const [result] = await this.db.execute(query, [
                roomId,
                endTime,
                startTime,
                endTime,
                startTime,
                startTime,
                endTime
            ]);

            return (result as any)[0].count === 0;
        } catch (error) {
            console.error('Error checking room availability:', error);
            throw error;
        }
    }

    // Thêm hàm helper để kiểm tra chồng chéo thời gian
    async isTimeSlotOverlapping(roomId: number, startTime: Date, endTime: Date): Promise<boolean> {
        const query = `
            SELECT COUNT(*) as overlap_count
            FROM bookings
            WHERE room_id = ?
            AND status NOT IN ('cancelled', 'completed')
            AND ? < end_time 
            AND ? > start_time
        `;

        const [result] = await this.db.execute<RowDataPacket[]>(query, [
            roomId,
            startTime,
            endTime
        ]);

        return (result[0] as any).overlap_count > 0;
    }
}

export default BookingService;