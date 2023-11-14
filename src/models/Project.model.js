import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    repo: String,
    title: String,
    desc: String,
    milestones: []
});

export default mongoose.model("Project", projectSchema);