import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa cors
import connectDB from './config/database';
import deviceRoutes from './routes/deviceRoutes';
import certificateRoutes from './routes/certificateRoutes';
import notificationRoutes from './routes/notificationRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/devices', deviceRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/notifications', notificationRoutes);

export default app;
