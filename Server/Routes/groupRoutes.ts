import express, { RequestHandler } from 'express';
import { groupController } from '../Controllers/groupController';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateUser, groupController.createGroup as RequestHandler);
router.get('/', authenticateUser, groupController.getAllGroups as RequestHandler);
router.get('/:groupId', authenticateUser, groupController.getGroupById as RequestHandler);
router.put('/:groupId', authenticateUser, groupController.updateGroup as RequestHandler);
router.post('/:groupId/members', authenticateUser, groupController.addMember as RequestHandler);
router.delete('/:groupId/members/:memberId', authenticateUser, groupController.removeMember as RequestHandler);

export default router;
