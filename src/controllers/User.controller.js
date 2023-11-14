import { INSUFFICENT_DATA } from "../constant.js";
import DayModel from "../models/Day.model.js";
import ProfileModel from "../models/Profile.model.js";
import SessionModel from "../models/Session.model.js";
import UserModel from "../models/User.model.js";
import CustomError from "../utils/CustomError.js";
import PasswordService from "../utils/PasswordService.js";
import JwtServices from "../utils/jwtServices.js";

class UserController {
    static async register(req, res, next) {
        //take data
        let { username, password } = req.body;
        // new UserModel
        let user = new UserModel({ username, password });
        // user already exist
        try {
            let tmp = await UserModel.findOne({ username });
            if (tmp)
                return next(CustomError.userAlreadyExist());
        } catch (error) {
            return next(error);
        }
        //validate data
        try {
            await user.validate();
        } catch (error) {
            return next(error);
        }
        //save data
        try {
            await user.save();
        } catch (error) {
            return next(error);
        }

        res.json({ success: true });
    }
    static async activate(req, res, next) {
        // take data
        let { uid, fullName, months, weekDays } = req.body;
        let startDate = new Date();
        let profile = new ProfileModel({ owner: uid, fullName, startDate, months, weekDays });
        // validate data
        try {
            await profile.validate();
        } catch (error) {
            return next(error);
        }
        // store in db
        try {
            profile = await profile.save();
        } catch (error) {
            return next(error);
        }
        //make activated:true in user
        try {
            await UserModel.updateOne({ _id: uid }, { activated: true });
        } catch (error) {
            return next(error);
        }

        // res
        res.json({ success: true });
    }
    static async login(req, res, next) {
        //take data
        let { username, password } = req.body;
        // validate
        try {
            await UserModel.validate({ username, password });
        } catch (error) {
            return next(error);
        }
        // fetch user
        let user;
        try {
            user = await UserModel.findOne({ username });
            if (!user)
                return next(CustomError.userNotExist());
        } catch (error) {
            return next(error);
        }

        // compare password
        try {
            let isSame = await PasswordService.comparePassword(password, user.password);
            if (!isSame)
                return next(CustomError.passwordNotMatched())
        } catch (error) {
            return next(error);
        }

        // create a session
        let session = SessionModel({ owner: user._id });
        try {
            session = await session.save();
        } catch (error) {
            return next(error);
        }
        // issue jwt
        let token = JwtServices.issueToken({ uid: user._id, sid: session._id });
        // res
        res.json({ success: true, token, activated: user.activated, validated: user.validated });
    }
    static async logout(req, res, next) {
        let { all, uid, sid } = req.body;
        console.log(sid);
        try {
            if (all)
                await SessionModel.deleteMany({ owner: uid });
            else
                await SessionModel.deleteOne({ _id: sid });
        } catch (error) {
            return next(error);
        }
        res.json({ success: true });
    }
    static async profile(req, res, next) {
        let { uid } = req.body;
        // fetch form db
        try {
            let profile = await ProfileModel.findOne({ owner: uid });
            res.json({ success: true, profile })
        } catch (error) {
            return next(error);
        }
    }
    static async day(req, res, next) {
        let { did, pid } = req.body;
        // check for pid
        if (!pid) return next(CustomError.createError(INSUFFICENT_DATA, "INSUFFICENT_DATA", "pid is required"));
        // if did is NULL -> create a day
        if (!did) {
            // create a day
            try {
                let day = await DayModel.create({});
                did = day._id;
                await ProfileModel.findByIdAndUpdate(pid, { $push: { days: day._id } });
            } catch (error) {
                await DayModel.findByIdAndDelete(did);
                return next(error);
            }
        }
        // fetch form db
        try {
            let day = await DayModel.findById(did);
            res.json({ success: true, day })
        } catch (error) {
            return next(error);
        }
    }
}

export default UserController