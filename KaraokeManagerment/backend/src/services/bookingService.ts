import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Booking } from '../models/Booking';
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
}

export default BookingService;