import { Response } from 'express';
import { AuthRequest } from '../types/requestType';
import Call from '../models/callModel';
import User from '../models/userModel';
import { createNotification } from './notificationController';

export const callController = {
    async initiateCall(req: AuthRequest, res: Response) {
        try {
            const { receiverId, callType } = req.body;

            // Check if receiver exists and is online
            const receiver = await User.findById(receiverId);
            if (!receiver) {
                return res.status(404).json({ error: 'Receiver not found' });
            }

            const call = await Call.create({
                caller: req.user?.id,
                receiver: receiverId,
                callType,
                status: 'ongoing'
            });

            const populatedCall = await Call.findById(call._id)
                .populate('caller', 'username profilePic')
                .populate('receiver', 'username profilePic');

            // Create notification for receiver
            await createNotification({
                user: receiverId,
                type: 'call',
                content: `Incoming ${callType} call from ${receiver.username}`
            });

            res.status(201).json(populatedCall);
        } catch (error) {
            res.status(500).json({ error: 'Error initiating call' });
        }
    },

    async updateCallStatus(req: AuthRequest, res: Response) {
        try {
            const { callId } = req.params;
            const { status, duration } = req.body;

            const call = await Call.findById(callId);
            if (!call) {
                return res.status(404).json({ error: 'Call not found' });
            }

            // Only caller or receiver can update call status
            if (call.caller.toString() !== req.user?.id &&
                call.receiver.toString() !== req.user?.id) {
                return res.status(403).json({ error: 'Not authorized to update this call' });
            }

            const updatedCall = await Call.findByIdAndUpdate(
                callId,
                {
                    status,
                    ...(duration && { duration })
                },
                { new: true }
            ).populate('caller receiver', 'username profilePic');

            res.json(updatedCall);
        } catch (error) {
            res.status(500).json({ error: 'Error updating call status' });
        }
    },

    async getCallHistory(req: AuthRequest, res: Response) {
        try {
            const calls = await Call.find({
                $or: [
                    { caller: req.user?.id },
                    { receiver: req.user?.id }
                ]
            })
                .populate('caller receiver', 'username profilePic')
                .sort('-createdAt');

            res.json(calls);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching call history' });
        }
    },

    async endCall(req: AuthRequest, res: Response) {
        try {
            const { callId } = req.params;
            const { duration } = req.body;

            const call = await Call.findById(callId);
            if (!call) {
                return res.status(404).json({ error: 'Call not found' });
            }

            if (call.caller.toString() !== req.user?.id &&
                call.receiver.toString() !== req.user?.id) {
                return res.status(403).json({ error: 'Not authorized to end this call' });
            }

            const updatedCall = await Call.findByIdAndUpdate(
                callId,
                {
                    status: 'ended',
                    duration
                },
                { new: true }
            ).populate('caller receiver', 'username profilePic');

            res.json(updatedCall);
        } catch (error) {
            res.status(500).json({ error: 'Error ending call' });
        }
    }
};