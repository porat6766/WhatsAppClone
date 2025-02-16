import mongoose, { Schema, Document } from "mongoose";
import { IGroup } from "../Types/groupType";


const GroupSchema = new Schema<IGroup>(
    {
        groupName: { type: String, required: true },
        admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
        members: [{ type: Schema.Types.ObjectId, ref: "User" }],
        profilePic: { type: String, default: "" },
        lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    },
    { timestamps: true }
);

export default mongoose.model<IGroup>("Group", GroupSchema);
