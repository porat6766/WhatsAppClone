import mongoose from "mongoose";
export interface IGroup extends Document {
    groupName: string;
    admin: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    profilePic?: string;
    lastMessage?: mongoose.Types.ObjectId;
}