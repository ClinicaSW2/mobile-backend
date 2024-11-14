import express from 'express';
import {
    createNotification,
    deleteNotification,
    getNotificationById,
    getNotifications,
    getNotificationsByPersonId,
    getNotificationsByPersonIdSeedFalse,
    updateNotification,
    updateNotificationSeen
} from '../controllers/notificationController';

const router = express.Router();

router.post('/', createNotification);
router.get('/', getNotifications);
router.get('/:id', getNotificationById);
router.get('/person/:person_id', getNotificationsByPersonId);
router.get('/person/:person_id/seed/false', getNotificationsByPersonIdSeedFalse);
router.put('/:id', updateNotification);
router.put('/:id/seen', updateNotificationSeen);
router.delete('/:id', deleteNotification);

export default router;
