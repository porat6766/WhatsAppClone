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
        try {
            const chat = await Chat.findById(chatId)
                .populate('members', 'username profilePic isOnline')
                .populate({
                    path: 'lastMessage',
                    select: 'text media status createdAt',
                    populate: { path: 'sender', select: 'username' }
                });

            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' });
            }

            res.json(chat);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching chat' });
        }
    },

    getChatByUserId: async (req: AuthRequest, res: Response) => {
        const userId = req.params.userId;
        try {
            const chat = await Chat.find({ members: userId });
            res.json(chat);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching chat' });
        }
    },

    deleteChat: async (req: AuthRequest, res: Response) => {
        const chatId = req.params.chatId;
        try {
            const chat = await Chat.findByIdAndDelete(chatId);

            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' });
            }

            res.json({ message: 'Chat deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting chat' });
        }
    }
};