import { Request, Response } from 'express';
import { AuthRequest } from '../types/requestType';
import { IUser } from '../types/userType';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userController = {
    async register(req: Request, res: Response) {
        try {
            const { username, email, password }: IUser = req.body;


            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }


            const hashedPassword = await bcrypt.hash(password, 10);


            const user = await User.create({
                username,
                email,
                password: hashedPassword
            });


            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET!,
                { expiresIn: '7d' }
            );

            res.status(201).json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePic: user.profilePic,
                    status: user.status
                },
                token
            });
        } catch (error) {
            res.status(500).json({ error: 'Error registering user' });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;


            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }


            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }


            user.isOnline = true;
            await user.save();


            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET!,
                { expiresIn: '7d' }
            );

            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePic: user.profilePic,
                    status: user.status,
                    isOnline: user.isOnline
                },
                token
            });
        } catch (error) {
            res.status(500).json({ error: 'Error logging in' });
        }
    },

    async getProfile(req: AuthRequest, res: Response) {
        try {
            const user = await User.findById(req.user?.id)
                .select('-password')
                .populate('contacts', 'username email profilePic status isOnline');

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching profile' });
        }
    },

    async updateProfile(req: AuthRequest, res: Response) {
        try {
            const updates = req.body;


            delete updates.password;

            const user = await User.findByIdAndUpdate(
                req.user?.id,
                updates,
                { new: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error updating profile' });
        }
    },

    getContacts: async (req: AuthRequest, res: Response) => {

        res.json({ message: "Get contacts" });
    },

    addContact: async (req: AuthRequest, res: Response) => {
        const { contactId } = req.body;
        res.json({ message: "Contact added" });
    },

    updateStatus: async (req: AuthRequest, res: Response) => {
        const { status } = req.body;
        res.json({ message: "Status updated" });
    }
};