import express, { RequestHandler } from 'express';
import { chatController } from '../Controllers/chatController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateUser, chatController.getAllChats as RequestHandler);
router.post('/', authenticateUser, chatController.createChat as RequestHandler);
router.get('/:chatId', authenticateUser, chatController.getChatById as RequestHandler);
router.delete('/:chatId', authenticateUser, chatController.deleteChat as RequestHandler);

export default router;
