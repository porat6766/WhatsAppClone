import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "../Types/messageType";

const MessageSchema = new Schema<IMessage>(
    {
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        chat: { type: Schema.Types.ObjectId, ref: "Chat" },
        group: { type: Schema.Types.ObjectId, ref: "Group" },
        text: { type: String, required: true },
        media: { type: String, default: "" },
        status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
    },
    { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
