import express from 'express';
import { createNotification, deleteNotification, getAllNotifications, getNotificationById, markAsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/register', createNotification);
router.get('/', getAllNotifications);
router.get('/single/:id', getNotificationById);
router.delete('/delete/:id', deleteNotification);
router.put('/update/:id', markAsRead);

export default router;
