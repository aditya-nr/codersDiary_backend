import { DSA, OTHERS, PROJECT, QUESTION, THEORY, TODO, WORK } from "../constant.js";

import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, ref: "User",
        required: [true, "owner is required"]
    },
    target: {
        type: String,
        enum: {
            values: [TODO, WORK, QUESTION],
            message: '{VALUE} is not supported'
        },
        required: [true, `target is required`]
    },
    type: {
        type: String,
        enum: {
            values: [DSA, PROJECT, THEORY, OTHERS],
            message: '{VALUE} is not supported'
        },
        required: [true, `type is required`]
    },
    priority: {
        type: Number,
        default: 5,
        min: [0, "can't be negative"],
        max: [9, "can't be more than 9"]
    },
    title: {
        type: String,
        required: [true, "title can't be empty"]
    },
    task: {
        type: String,
        required: [true, "task can't be empty"]
    },
    desc: {
        type: String,
        default: ""
    },
    images: [{ type: String, default: [] }]
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);