import mongoose, { Schema, Document } from "mongoose";
import { ICall } from "../Types/callType";


const CallSchema = new Schema<ICall>(
    {
        caller: { type: Schema.Types.ObjectId, ref: "User", required: true },
        receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
        callType: { type: String, enum: ["voice", "video"], required: true },
        status: { type: String, enum: ["ongoing", "missed", "ended"], default: "ongoing" },
        duration: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<ICall>("Call", CallSchema);
