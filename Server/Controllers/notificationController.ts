import { Response } from 'express';
import { AuthRequest } from '../types/requestType';
import Notification from '../models/Notification';

export const notificationController = {
    async getNotifications(req: AuthRequest, res: Response) {
        try {
            const notifications = await Notification.find({
                user: req.user?.id
            })
                .sort('-createdAt')
                .limit(50); // Limit to last 50 notifications for performance

            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching notifications' });
        }
    },

    async markAsRead(req: AuthRequest, res: Response) {
        try {
            const { notificationId } = req.params;

            const notification = await Notification.findById(notificationId);
            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            if (notification.user.toString() !== req.user?.id) {
                return res.status(403).json({ error: 'Not authorized to update this notification' });
            }

            const updatedNotification = await Notification.findByIdAndUpdate(
                notificationId,
                { isRead: true },
                { new: true }
            );

            res.json(updatedNotification);
        } catch (error) {
            res.status(500).json({ error: 'Error marking notification as read' });
        }
    },

    async deleteNotification(req: AuthRequest, res: Response) {
        try {
            const { notificationId } = req.params;

            const notification = await Notification.findById(notificationId);
            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            if (notification.user.toString() !== req.user?.id) {
                return res.status(403).json({ error: 'Not authorized to delete this notification' });
            }

            await Notification.findByIdAndDelete(notificationId);

            res.json({ message: 'Notification deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting notification' });
        }
    },

    async markAllAsRead(req: AuthRequest, res: Response) {
        try {
            await Notification.updateMany(
                { user: req.user?.id, isRead: false },
                { isRead: true }
            );

            res.json({ message: 'All notifications marked as read' });
        } catch (error) {
            res.status(500).json({ error: 'Error marking all notifications as read' });
        }
    },

    // Utility function to create notifications (used by other controllers)
    async createNotification(notificationData: {
        user: string;
        type: 'message' | 'call';
        content: string;
    }) {
        try {
            const notification = await Notification.create({
                ...notificationData,
                isRead: false
            });

            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            return null;
        }
    }
};

// הוספת export לפונקציית createNotification כדי שתהיה זמינה לשימוש בקונטרולרים אחרים
export const { createNotification } = notificationController;