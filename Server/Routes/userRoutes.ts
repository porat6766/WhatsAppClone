import express, { RequestHandler } from 'express';
import { userController } from '../controllers/userController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.post('/register', userController.register as RequestHandler);
router.post('/login', userController.login as RequestHandler);
router.get('/profile', authenticateUser, userController.getProfile as RequestHandler);
router.put('/profile', authenticateUser, userController.updateProfile as RequestHandler);
router.get('/contacts', authenticateUser, userController.getContacts as RequestHandler);
router.post('/contacts', authenticateUser, userController.addContact as RequestHandler);
router.put('/status', authenticateUser, userController.updateStatus as RequestHandler);

export default router;

