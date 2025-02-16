import mongoose, { Schema, Document } from "mongoose";
import { INotification } from "../Types/notificationType";

const NotificationSchema = new Schema<INotification>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["message", "call"], required: true },
        content: { type: String, required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<INotification>("Notification", NotificationSchema);
