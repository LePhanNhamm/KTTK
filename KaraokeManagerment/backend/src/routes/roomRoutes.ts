import { Router } from 'express';
import RoomController from '../controllers/roomController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();
const roomController = new RoomController();

// Public routes
router.get('/', roomController.getAllRooms.bind(roomController));
router.get('/:id', roomController.getRoom.bind(roomController));

// Authenticated routes (any logged in user)
router.post('/', roomController.createRoom.bind(roomController));
router.put('/:id', roomController.updateRoom.bind(roomController));
router.delete('/:id', roomController.deleteRoom.bind(roomController));

export default router;