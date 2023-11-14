import mongoose, { Schema } from "mongoose";

const daySchema = new Schema({
    dsa: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
            default: []
        }
    ],
    work: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
            default: []
        }
    ]
});

export default mongoose.model("Day", daySchema);