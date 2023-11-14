import PasswordService from "../utils/PasswordService";

const { Schema, default: mongoose } = require("mongoose");

const userNameRegEx = /[a-zA-Z][a-zA-Z0-9-_]{3,30}/gi;
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        minLength: [3, "length can't be less than 3"],
        maxLength: [10, "length can't be more than 10"],
        validate: {
            validator: function (val) {
                return userNameRegEx.test(val);
            },
            message: props => `Must start with an alphabetic character. Can contain the following characters: 'a-z' 'A-Z' '0-9' '-' '_'`
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
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        this.password = await PasswordService.hashPassword(this.password);
    next();
});

export default mongoose.model("User", userSchema);