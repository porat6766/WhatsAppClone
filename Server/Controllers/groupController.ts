import { Response } from 'express';
import { AuthRequest } from '../types/requestType';
import Group from '../Models/groupModel';

export const groupController = {
    async createGroup(req: AuthRequest, res: Response) {
        try {
            const { groupName, members } = req.body;

            const group = await Group.create({
                groupName,
                admin: req.user?.id,
                members: [...members, req.user?.id]
            });

            const populatedGroup = await Group.findById(group._id)
                .populate('members', 'username profilePic')
                .populate('admin', 'username');

            res.status(201).json(populatedGroup);
        } catch (error) {
            res.status(500).json({ error: 'Error creating group' });
        }
    },

    async addMember(req: AuthRequest, res: Response) {
        try {
            const { groupId } = req.params;
            const { memberId } = req.body;

            const group = await Group.findById(groupId);
            if (!group) {
                return res.status(404).json({ error: 'Group not found' });
            }

            if (group.admin.toString() !== req.user?.id) {
                return res.status(403).json({ error: 'Only admin can add members' });
            }

            if (group.members.includes(memberId)) {
                return res.status(400).json({ error: 'Member already in group' });
            }

            group.members.push(memberId);
            await group.save();

            const populatedGroup = await Group.findById(groupId)
                .populate('members', 'username profilePic')
                .populate('admin', 'username');

            res.json(populatedGroup);
        } catch (error) {
            res.status(500).json({ error: 'Error adding member' });
        }
    },

    getAllGroups: async (req: AuthRequest, res: Response) => {
        // Implement get all groups logic
        res.json({ message: "Get all groups" });
    },

    getGroupById: async (req: AuthRequest, res: Response) => {
        const groupId = req.params.groupId;
        res.json({ message: "Get group by ID" });
    },

    updateGroup: async (req: AuthRequest, res: Response) => {
        const groupId = req.params.groupId;
        res.json({ message: "Group updated" });
    },

    removeMember: async (req: AuthRequest, res: Response) => {
        const { groupId, memberId } = req.params;
        res.json({ message: "Member removed" });
    }
};