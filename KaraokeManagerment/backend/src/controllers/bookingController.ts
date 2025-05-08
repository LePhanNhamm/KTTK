import { Request, Response } from 'express';
import BookingService from '../services/bookingService';
import { Booking } from '../models/Booking';

class BookingController {
    private bookingService: BookingService;

    constructor() {
        this.bookingService = new BookingService();
    }

    async createBooking(req: Request, res: Response) {
        try {
            const { room_id, customer_id, start_time, end_time } = req.body;
            
            if (!room_id || !customer_id || !start_time || !end_time) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Missing required fields' 
                });
            }

            const booking = await this.bookingService.createBooking({
                room_id,
                customer_id,
                start_time: new Date(start_time),
                end_time: new Date(end_time),
                status: 'pending'
            });

            res.status(201).json({
                success: true,
                data: booking
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error creating booking',
                error: message
            });
        }
    }

    async getBooking(req: Request, res: Response) {
        try {
            const bookingId = parseInt(req.params.id);
            const booking = await this.bookingService.getBookingById(bookingId);

            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found'
                });
            }

            res.json({
                success: true,
                data: booking
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error retrieving booking',
                error: message
            });
        }
    }

    async getAllBookings(req: Request, res: Response) {
        try {
            const bookings = await this.bookingService.getAllBookings();
            res.json({
                success: true,
                data: bookings
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error retrieving bookings',
                error: message
            });
        }
    }

    async updateBooking(req: Request, res: Response) {
        try {
            const bookingId = parseInt(req.params.id);
            const updateData = req.body;

            const updatedBooking = await this.bookingService.updateBooking(bookingId, updateData);

            if (!updatedBooking) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found'
                });
            }

            res.json({
                success: true,
                data: updatedBooking
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error updating booking',
                error: message
            });
        }
    }

    async deleteBooking(req: Request, res: Response) {
        try {
            const bookingId = parseInt(req.params.id);
            const result = await this.bookingService.deleteBooking(bookingId);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found'
                });
            }

            res.json({
                success: true,
                message: 'Booking deleted successfully'
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error deleting booking',
                error: message
            });
        }
    }
}

export default BookingController;