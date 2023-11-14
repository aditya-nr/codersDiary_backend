import { DSA, OTHERS, PROJECT, QUESTION, THEORY, TODO, WORK } from "../constant";

const { Schema, default: mongoose } = require("mongoose");


const taskSchema = new Schema({
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
    desc: String,
    images: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);