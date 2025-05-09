import express from 'express';
import BookingController from '../controllers/bookingController';

const router = express.Router();
const bookingController = new BookingController();

// Available rooms route must come before :id route to avoid conflicts
router.get('/available', bookingController.findAvailableRooms.bind(bookingController));

// Standard CRUD routes
router.post('/', bookingController.createBooking.bind(bookingController));
router.get('/', bookingController.getAllBookings.bind(bookingController));
router.get('/:id', bookingController.getBooking.bind(bookingController));
router.put('/:id', bookingController.updateBooking.bind(bookingController));
router.delete('/:id', bookingController.deleteBooking.bind(bookingController));

export default router;