import { Router } from 'express';
import RoomController from '../controllers/roomController';
import { auth, adminAuth } from '../middlewares/authMiddleware';

const router = Router();
const roomController = new RoomController();

// Public routes
router.get('/rooms', roomController.getAllRooms.bind(roomController));
router.get('/rooms/:id', roomController.getRoom.bind(roomController));

// Admin only routes
router.post('/rooms', adminAuth, roomController.createRoom.bind(roomController));
router.put('/rooms/:id', adminAuth, roomController.updateRoom.bind(roomController));
router.delete('/rooms/:id', adminAuth, roomController.deleteRoom.bind(roomController));

export default router;