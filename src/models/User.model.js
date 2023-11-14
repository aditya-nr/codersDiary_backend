import PasswordService from "../utils/PasswordService.js";

import mongoose, { Schema } from "mongoose";

const userNameRegEx = /^[a-zA-Z][a-zA-Z0-9\.\-]{1,8}[a-zA-Z0-9]$/;
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/;

const userSchema = new Schema({
    username: {
        type: String,
        index: true,
        required: [true, "username is required"],
        minLength: [3, "length can't be less than 3"],
        maxLength: [30, "length can't be more than 30"],
        validate: {
            validator: function (val) {
                return userNameRegEx.test(val);
            },
            message: props => `Must starts with alphabet. Can contain alphabet number '.' '-'. Must ends with alphabet or number.`
        }
    },
    password: {
        type: String,
        required: [true, "password is required"],
        validate: {
            validator: function (password) {
                return passwordRegEx.test(password);
            },
            message: props => `must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. at least 8 character long`
        },
    },
    activated: {
        type: Boolean,
        default: false
    },
    validated: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        this.password = await PasswordService.hashPassword(this.password);
    next();
});

export default mongoose.model("User", userSchema);