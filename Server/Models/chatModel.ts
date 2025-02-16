import mongoose, { Schema, Document } from "mongoose";
import { IChat } from "../Types/chatType";


const ChatSchema = new Schema<IChat>(
    {
        members: [{ type: Schema.Types.ObjectId, ref: "User" }],
        lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    },
    { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
