import express, { RequestHandler } from 'express';
import { notificationController } from "../Controllers/notificationController";
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateUser, notificationController.getNotifications as RequestHandler);
router.put('/:notificationId', authenticateUser, notificationController.markAsRead as RequestHandler);
router.delete('/:notificationId', authenticateUser, notificationController.deleteNotification as RequestHandler);

export default router;