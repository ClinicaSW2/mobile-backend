import cron from 'node-cron';
import Notification, { INotification } from './models/notificationModel';
import Device from './models/deviceModel';
import { firebaseMessaging } from './config/firebase';
import { MulticastMessage } from 'firebase-admin/messaging';
import moment from 'moment-timezone';


// Función para enviar la notificación
export const sendNotification = async (notification: INotification & { _id: string }) => {
    try {
        const devices = await Device.find({ person_id: notification.person_id });
        const tokens = devices.map(device => device.token);

        if (tokens.length === 0) {
            console.log('No hay dispositivos para enviar la notificación.');
            return;
        }

        const requestMessage: MulticastMessage = {
            tokens,
            notification: {
                title: notification.title,
                body: notification.text,
            },
            data: {
                notification: JSON.stringify({
                    _id: notification._id.toString(),
                    title: notification.title,
                    text: notification.text,
                }),
            },
            android: { priority: 'high' },
        };

        const response = await firebaseMessaging.sendEachForMulticast(requestMessage);
        console.log(`Notificación enviada a ${response.successCount} de ${tokens.length} dispositivos.`);
    } catch (error) {
        console.error('Error al enviar la notificación:', error);
    }
};

// Función para verificar y enviar notificaciones programadas
const sendScheduledNotifications = async () => {
    try {
        // Define `now` en la zona horaria de La Paz
        const now = moment().tz("America/La_Paz");

        // Imprime `now` en la hora local de La Paz, sin UTC
        console.log("Hora actual en La Paz:", now.format("YYYY-MM-DD HH:mm:ss"));

        // Busca notificaciones que estén programadas para enviarse ahora o antes, y que aún no hayan sido enviadas (status: false)
        const notifications = await Notification.find({
            scheduledTime: { $lte: now },
            status: false,
        });

        // Envía cada notificación programada
        for (const notification of notifications as (INotification & { _id: string })[]) {
            await sendNotification(notification);
            await notification.updateOne({ status: true });
        }
    } catch (error) {
        console.error('Error al enviar notificaciones programadas:', error);
    }
};

// Programa el job para ejecutarse cada minuto y enviar notificaciones programadas
cron.schedule('* * * * *', sendScheduledNotifications);
console.log("Cron job para notificaciones programadas iniciado.");
