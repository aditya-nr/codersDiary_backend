const { Schema, default: mongoose } = require("mongoose");


const daySchema = new Schema({
    dsa: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    work: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
});

export default mongoose.model("Day", daySchema);