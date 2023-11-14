import mongoose, { Schema } from "mongoose";

const fullNameRegex = /^[a-zA-Z ]{3,20}$/
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/

const profileSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: [true, "owner is missing"]
    },
    fullName: {
        type: String,
        trim: true,
        required: [true, "fullname is required"],
        minLength: [3, "allowed 3-20 characters"],
        maxLength: [20, "allowed 3-20 characters"],
        validate: {
            validator: function (nm) {
                return fullNameRegex.test(nm);
            },
            message: props => `Can contain 'a-z' 'A-Z'`
        },
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: function (mail) {
                return emailRegex.test(mail);
            },
            message: props => `Invalid email`
        }
    },
    avatar: { type: String, default: null },
    startDate: {
        type: Date,
        required: [true, "startDate is missing"]
    },
    months: {
        type: Number,
        required: [true, "months is required"],
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
        required: [true, "weekDays is required"],
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
    days: [{ type: Schema.Types.ObjectId, ref: "Day", default: [] }],
    todos: [{ type: Schema.Types.ObjectId, ref: "Task", default: [] }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project", default: [] }],
});

export default mongoose.model("Profile", profileSchema);