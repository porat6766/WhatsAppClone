import mongoose from "mongoose";
export interface INotification extends Document {
    user: mongoose.Types.ObjectId;
    type: "message" | "call";
    content: string;
    isRead: boolean;
}