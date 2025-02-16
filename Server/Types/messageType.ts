import mongoose from "mongoose";
export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    chat?: mongoose.Types.ObjectId;
    group?: mongoose.Types.ObjectId;
    text: string;
    media?: string;
    status: "sent" | "delivered" | "read";
}
