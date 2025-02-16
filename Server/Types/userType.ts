import mongoose from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profilePic?: string;
    status?: string;
    contacts: mongoose.Types.ObjectId[];
    isOnline: boolean;
    lastSeen: Date;
}