import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import Database from './config/database';

dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database and setup routes
async function initializeApp() {
    try {
        await Database.initialize();

        // Import routes after database initialization
        const bookingRoutes = (await import('./routes/bookingRoutes')).default;
        const customerRoutes = (await import('./routes/customerRoutes')).default;
        const roomRoutes = (await import('./routes/roomRoutes')).default;

        // Routes
        app.use('/api/bookings', bookingRoutes);
        app.use('/api/customers', customerRoutes);
        app.use('/api/rooms', roomRoutes);

        // Error handling middleware
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    }
}

initializeApp();

export default app;