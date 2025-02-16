import express, { RequestHandler } from 'express';
import { callController } from '../Controllers/callController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateUser, callController.initiateCall as RequestHandler);
router.put('/:callId', authenticateUser, callController.updateCallStatus as RequestHandler);
router.get('/history', authenticateUser, callController.getCallHistory as RequestHandler);

export default router;
