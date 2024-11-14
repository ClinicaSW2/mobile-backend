import mongoose, { Document, Schema } from 'mongoose';

interface ICertificate extends Document {
    image: string;
    pacient_id: string;
    doctor_id: string;
    hash: string;
}

const certificateSchema = new Schema<ICertificate>({
    image: { type: String, required: true },
    pacient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    hash: { type: String, required: false },
});

export default mongoose.model<ICertificate>('Certificate', certificateSchema);
