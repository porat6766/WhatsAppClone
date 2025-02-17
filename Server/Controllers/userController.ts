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

            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                sameSite: "strict",
            });

            res.status(201).json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePic: user.profilePic,
                    status: user.status
                }
            });

        } catch (error) {
            res.status(500).json({ error: 'Error registering user' });
        }
    },

    async login(req: Request, res: Response) {
        console.log("fchgh");

        try {
            const { email, password } = req.body;


            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            console.log(user);

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
            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                sameSite: "strict",
            });

            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePic: user.profilePic,
                    status: user.status,
                    isOnline: user.isOnline
                }
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

    getAllProfile: async (req: AuthRequest, res: Response) => {
        try {
            const users = await User.find({}).select('-password');
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching all profiles' });
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
        try {

            if (!req.user?.id) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const user = await User.findById(req.user.id)
                .populate("contacts", "username email profilePic");

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user.contacts);

        } catch (error) {
            console.error("Error fetching contacts:", error);
            res.status(500).json({ error: "Error fetching contacts" });
        }
    },

    addContact: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user?.id;
            const { contactId } = req.body;

            if (!userId) return res.status(401).json({ message: "Unauthorized" });


            const user = await User.findById(userId);
            const contact = await User.findById(contactId);

            if (!user || !contact) {
                return res.status(404).json({ message: "User or contact not found" });
            }


            if (user.contacts.includes(contactId)) {
                return res.status(400).json({ message: "Contact already exists" });
            }


            user.contacts.push(contactId);
            await user.save();

            res.json({ message: "Contact added successfully", contactId });
        } catch (error) {
            res.status(500).json({ message: "Error adding contact", error });
        }
    },

    updateStatus: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user?.id;
            const { status } = req.body;

            if (!userId) return res.status(401).json({ message: "Unauthorized" });
            if (!status) return res.status(400).json({ message: "Status is required" });


            const user = await User.findByIdAndUpdate(userId, { status }, { new: true });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({ message: "Status updated successfully", status: user.status });
        } catch (error) {
            res.status(500).json({ message: "Error updating status", error });
        }
    },
    deleteProfile: async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user?.id;
            if (!userId) return res.status(401).json({ message: "Unauthorized" });

            const user = await User.findByIdAndDelete(userId);
            if (!user) return res.status(404).json({ message: "User not found" });

            res.json({ message: "Profile deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting profile", error });
        }
    }

};









