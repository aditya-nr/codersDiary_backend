const { Schema, default: mongoose, Schema } = require("mongoose");


const sessionSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Session", sessionSchema);