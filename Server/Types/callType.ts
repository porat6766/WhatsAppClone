import mongoose from "mongoose";

export interface ICall extends Document {
    caller: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    callType: "voice" | "video";
    status: "ongoing" | "missed" | "ended";
    duration: number;
}
