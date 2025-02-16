import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../Types/userType";


const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePic: { type: String, default: "" },
        status: { type: String, default: "Hey there! I am using WhatsApp." },
        contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
        isOnline: { type: Boolean, default: false },
        lastSeen: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
