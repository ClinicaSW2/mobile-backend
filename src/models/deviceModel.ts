import mongoose, { Document, Schema } from 'mongoose';

interface IDevice extends Document {
    token: string;
    person_id: string;
}

const deviceSchema = new Schema<IDevice>({
    token: { type: String, required: true },
    person_id: { type: String, required: true },
});

export default mongoose.model<IDevice>('Device', deviceSchema);
