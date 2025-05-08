import { Request, Response } from 'express';
import RoomService from '../services/roomService';
import { Room } from '../services/roomService';

class RoomController {
    private roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }

    async createRoom(req: Request, res: Response) {
        try {
            const { name, type, price_per_hour, capacity, status } = req.body;

            if (!name || !price_per_hour || !capacity) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }

            const room = await this.roomService.createRoom({
                name,
                type,
                price_per_hour,
                capacity,
                status: status || 'available'
            });

            res.status(201).json({
                success: true,
                data: room
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error creating room',
                error: message
            });
        }
    }

    async getRoom(req: Request, res: Response) {
        try {
            const roomId = parseInt(req.params.id);
            const room = await this.roomService.getRoomById(roomId);

            if (!room) {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found'
                });
            }

            res.json({
                success: true,
                data: room
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error retrieving room',
                error: message
            });
        }
    }

    async getAllRooms(req: Request, res: Response) {
        try {
            const rooms = await this.roomService.getAllRooms();
            res.json({
                success: true,
                data: rooms
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error retrieving rooms',
                error: message
            });
        }
    }

    async updateRoom(req: Request, res: Response) {
        try {
            const roomId = parseInt(req.params.id);
            const room = await this.roomService.updateRoom(roomId, req.body);

            res.json({
                success: true,
                data: room
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error updating room',
                error: message
            });
        }
    }

    async deleteRoom(req: Request, res: Response) {
        try {
            const roomId = parseInt(req.params.id);
            const success = await this.roomService.deleteRoom(roomId);

            if (!success) {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found or could not be deleted'
                });
            }

            res.json({
                success: true,
                message: 'Room deleted successfully'
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({
                success: false,
                message: 'Error deleting room',
                error: message
            });
        }
    }
}

export default RoomController;