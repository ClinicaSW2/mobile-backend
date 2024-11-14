import { Request, Response } from 'express';
import Notification, { INotification } from '../models/notificationModel';
import moment from 'moment-timezone';
import { sendNotification } from '../scheduler'; // Importa `sendNotification` desde el cron job, si está en `scheduler.ts`


export const createNotification = async (req: Request, res: Response) => {
    try {
        const { scheduledTime, ...otherData } = req.body;

        // Crea la notificación con los datos recibidos, manteniendo `scheduledTime` en UTC
        const notification = new Notification({ ...otherData, scheduledTime });

        // Define `now` en la zona horaria de La Paz para la comparación
        const now = moment().tz("America/La_Paz");

        // Convierte `scheduledTime` a la zona horaria de La Paz para la comparación
        let scheduledMoment = moment.tz(scheduledTime, "America/La_Paz");

        // Ajusta manualmente la diferencia horaria si `scheduledMoment` no coincide con `now`
        const hoursDifference = Math.abs(now.utcOffset() / 60);
        if (scheduledMoment.format("HH") !== now.format("HH")) {
            scheduledMoment = scheduledMoment.add(hoursDifference, 'hours');
        }

        // Imprime `now` y `scheduledMoment` en La Paz para verificar la comparación
        console.log("Fecha y hora actual en La Paz (now):", now.format("YYYY-MM-DD HH:mm:ss"));
        console.log("Fecha y hora programada ajustada en La Paz (scheduledMoment):", scheduledMoment.format("YYYY-MM-DD HH:mm:ss"));

        // Si `scheduledMoment` es menor o igual a `now`, envía la notificación de inmediato
        if (scheduledMoment.isSameOrBefore(now)) {
            console.log('Enviando notificación de inmediato:', notification);
            await sendNotification(notification as INotification & { _id: string });
        }

        // Guarda la notificación en la base de datos
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        console.error('Error al crear la notificación:', error);
        res.status(500).json({ error: 'Error al crear la notificación' });
    }
};


// Obtener todas las notificaciones
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
};

// Obtener notificación por ID
export const getNotificationById = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            res.json(notification);
        } else {
            res.status(404).json({ error: 'Notificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la notificación' });
    }
};

// Obtener notificaciones por ID de persona
export const getNotificationsByPersonId = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({ person_id: req.params.person_id, status: true });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
};

// Obtener notificaciones por ID de persona seen false and status true
export const getNotificationsByPersonIdSeedFalse = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({ person_id: req.params.person_id, seen: false, status: true });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
};

// Actualizar notificación
export const updateNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            notification.set(req.body);
            await notification.save();
            res.json(notification);
        } else {
            res.status(404).json({ error: 'Notificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la notificación' });
    }
};

// Actualizar notificación a seen true
export const updateNotificationSeen = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            notification.seen = true;
            await notification.save();
            res.json(notification);
        } else {
            res.status(404).json({ error: 'Notificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la notificación' });
    }
};

// Eliminar notificación
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            await Notification.deleteOne({ _id: req.params.id });
            res.json({ message: 'Notificación eliminada' });
        } else {
            res.status(404).json({ error: 'Notificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la notificación' });
    }
};
