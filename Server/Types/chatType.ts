import mongoose from "mongoose";

export interface IChat extends Document {
    members: mongoose.Types.ObjectId[];
    lastMessage?: mongoose.Types.ObjectId;
}
