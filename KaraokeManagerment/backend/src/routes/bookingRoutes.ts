import { Router } from 'express';
import BookingController from '../controllers/bookingController';

const router = Router();
const bookingController = new BookingController();

router.post('/bookings', bookingController.createBooking.bind(bookingController));
router.get('/bookings', bookingController.getAllBookings.bind(bookingController));
router.get('/bookings/:id', bookingController.getBooking.bind(bookingController));
router.put('/bookings/:id', bookingController.updateBooking.bind(bookingController));
router.delete('/bookings/:id', bookingController.deleteBooking.bind(bookingController));

export default router;