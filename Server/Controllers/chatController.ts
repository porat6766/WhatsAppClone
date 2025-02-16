import { Response } from 'express';
import { AuthRequest } from '../types/requestType';
import Chat from '../models/chatModel';

export const chatController = {
    async getAllChats(req: AuthRequest, res: Response) {
        try {
            const chats = await Chat.find({ members: req.user?.id })
                .populate('members', 'username profilePic isOnline')
                .populate({
                    path: 'lastMessage',
                    select: 'text media status createdAt',
                    populate: { path: 'sender', select: 'username' }
                });

            res.json(chats);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching chats' });
        }
    },

    async createChat(req: AuthRequest, res: Response) {
        try {
            const { receiverId } = req.body;

            const existingChat = await Chat.findOne({
                members: { $all: [req.user?.id, receiverId] }
            });

            if (existingChat) {
                return res.json(existingChat);
            }

            const newChat = await Chat.create({
                members: [req.user?.id, receiverId]
            });

            const populatedChat = await Chat.findById(newChat._id)
                .populate('members', 'username profilePic isOnline');

            res.status(201).json(populatedChat);
        } catch (error) {
            res.status(500).json({ error: 'Error creating chat' });
        }
    },

    getChatById: async (req: AuthRequest, res: Response) => {
        const chatId = req.params.chatId;
        // Implement chat retrieval logic here
        res.json({ message: "Get chat by ID" });
    },

    deleteChat: async (req: AuthRequest, res: Response) => {
        const chatId = req.params.chatId;
        // Implement chat deletion logic here
        res.json({ message: "Chat deleted" });
    }
};
