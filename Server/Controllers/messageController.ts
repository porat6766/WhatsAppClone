import { Response } from 'express';
import { AuthRequest } from '../types/requestType';
import Message from '../models/messageModel';
import Chat from '../models/chatModel';

export const messageController = {
    async getChatMessages(req: AuthRequest, res: Response) {
        try {
            console.log(req.params.chatId);

            const messages = await Message.find({
                chat: req.params.chatId
            })
                .populate('sender', 'username profilePic')
                .sort('createdAt');

            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching messages' });
        }
    },

    async sendMessage(req: AuthRequest, res: Response) {
        try {
            const { chatId, text, media } = req.body;

            const message = await Message.create({
                sender: req.user?.id,
                chat: chatId,
                text,
                media
            });

            // Update last message in chat
            await Chat.findByIdAndUpdate(chatId, {
                lastMessage: message._id
            });

            const populatedMessage = await Message.findById(message._id)
                .populate('sender', 'username profilePic');

            res.status(201).json(populatedMessage);
        } catch (error) {
            res.status(500).json({ error: 'Error sending message' });
        }
    },

    updateMessageStatus: async (req: AuthRequest, res: Response) => {
        const { messageId } = req.params;
        try {
            const message = await Message.findByIdAndUpdate(messageId, { status: req.body.status }, { new: true });
            if (!message) return res.status(404).json({ message: "Message not found" });
            res.json({ message: "Message status updated" });
        } catch (error) {
            res.status(500).json({ error: "Error updating message status" });
        }
    },

    deleteMessage: async (req: AuthRequest, res: Response) => {
        const { messageId } = req.params;
        try {
            const message = await Message.findByIdAndDelete(messageId);
            if (!message) return res.status(404).json({ message: "Message not found" });
            res.json({ message: "Message deleted" });
        } catch (error) {
            res.status(500).json({ error: "Error deleting message" });
        }
    }
};