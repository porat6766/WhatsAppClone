import express, { RequestHandler } from 'express';
import { messageController } from "../Controllers/messageController";
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.get('/:chatId', authenticateUser, messageController.getChatMessages as RequestHandler);
router.post('/', authenticateUser, messageController.sendMessage as RequestHandler);
router.put('/:messageId/status', authenticateUser, messageController.updateMessageStatus as RequestHandler);
router.delete('/:messageId', authenticateUser, messageController.deleteMessage as RequestHandler);

export default router;