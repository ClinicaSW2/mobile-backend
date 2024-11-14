import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        // Construye la URL de conexión completa
        const mongoUri = `${process.env.MONGO_URI_BASE}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
