import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document { // Exporta la interfaz
    title: string;
    text: string;
    status: boolean; // Enviada
    seen: boolean; // Visto por el usuario
    person_id: string;
    device_id: string[];
    scheduledTime: Date; // Hora programada para enviar la notificación
}

const notificationSchema = new Schema<INotification>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    status: { type: Boolean, default: false },
    seen: { type: Boolean, default: false },
    person_id: { type: String, required: true },
    device_id: [{ type: String, required: true }],
    scheduledTime: { type: Date, required: true },
});

export default mongoose.model<INotification>('Notification', notificationSchema);
