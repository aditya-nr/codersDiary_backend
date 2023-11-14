const { Schema, default: mongoose } = require("mongoose");


const profileSchema = new Schema({
    owner: { type: Schema.Types.ObjectIdj, ref: 'User' },
    fullName: {
        type: String,
        trim: true,
        minLength: [3, "allowed 3-20 characters"],
        maxLength: [20, "allowed 3-20 characters"]
    },
    avatar: String,
    startDate: {
        type: Date,
        required: [true, "start date is missing"]
    },
    months: {
        type: Number,
        validate: {
            validator: function (m) {
                if (1 <= m && m <= 12)
                    return true;
                else return false;
            },
            message: props => `months limit is 1 to 12`
        },
    },
    weekDays: {
        type: Number,
        validate: {
            validator: function (w) {
                if (1 <= w && w <= 7)
                    return true;
                else return false;
            },
            message: props => `number of weekDays lies between 1 to 7`
        },
    },
    dsaCount: {
        type: Number,
        default: 0
    },
    missedCount: {
        type: Number,
        default: 0
    },
    days: [{ type: Schema.Types.ObjectId, ref: "Day" }],
    todos: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

export default mongoose.model("Profile", profileSchema);