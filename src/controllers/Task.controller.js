import { INSUFFICENT_DATA, QUESTION, TODO, WORK } from "../constant.js";
import DayModel from "../models/Day.model.js";
import ProfileModel from "../models/Profile.model.js";
import TaskModel from "../models/Task.model.js";
import CustomError from "../utils/CustomError.js";

class TaskController {
    static async create(req, res, next) {
        let { pid, did, uid, target, type, title, task } = req.body;
        // check for pid and did
        if (!pid || !did) return next(CustomError.createError(INSUFFICENT_DATA, "INSUFFICENT_DATA", "pid,did is required"));

        // create a task, validate and save it
        let tid;
        let taskDoc = new TaskModel({ owner: uid, target, type, title, task });
        try {
            taskDoc = await taskDoc.save();
            tid = taskDoc._id;
        } catch (error) {
            return next(error);
        }

        // TODO: check if given pid and tid is correct or not
        // push tid into array of concerned Model according to target
        try {
            if (target == TODO)
                await ProfileModel.findByIdAndUpdate(pid, { $push: { todos: tid } });
            if (target == WORK)
                await DayModel.findByIdAndUpdate(did, { $push: { work: tid } });
            if (target == QUESTION)
                await DayModel.findByIdAndUpdate(did, { $push: { dsa: tid } });
        } catch (error) {
            return next(error);
        }
        // res
        res.json({ success: true, tid });
    }
    static async update(req, res, next) {
        let { pid, did, tid, uid, target, type, title, task, desc } = req.body;
        // check for pid and did, tid
        if (!pid || !did || !tid) return next(CustomError.createError(INSUFFICENT_DATA, "INSUFFICENT_DATA", "pid,did,tid is required"));

        // validate data
        try {
            await TaskModel.validate({ owner: uid, target, type, title, task, desc });
        } catch (error) {
            return next(error);
        }
        // create a newDoc, update oldDoc
        let newDOc = { target, type, title, task, desc };
        let oldDoc;
        try {
            oldDoc = await TaskModel.findOneAndUpdate({ _id: tid }, { $set: newDOc });
        } catch (error) {
            return next(error);
        }

        if (oldDoc.target == target)
            return res.json({ success: true });
        // TODO: check if given pid and tid is correct or not
        // pull tid from array of concerned Model according to target
        try {
            if (oldDoc.target == TODO)
                await ProfileModel.findByIdAndUpdate(pid, { $pull: { todos: tid } });
            if (oldDoc.target == WORK)
                await DayModel.findByIdAndUpdate(did, { $pull: { work: tid } });
            if (oldDoc.target == QUESTION)
                await DayModel.findByIdAndUpdate(did, { $pull: { dsa: tid } });
        } catch (error) {
            return next(error);
        }
        // push tid into array of concerned Model according to target
        try {
            if (target == TODO)
                await ProfileModel.findByIdAndUpdate(pid, { $push: { todos: tid } });
            if (target == WORK)
                await DayModel.findByIdAndUpdate(did, { $push: { work: tid } });
            if (target == QUESTION)
                await DayModel.findByIdAndUpdate(did, { $push: { dsa: tid } });
        } catch (error) {
            return next(error);
        }
        // res
        res.json({ success: true });
    }
    static async get(req, res, next) {
        let { tid } = req.body;
        let task;
        try {
            task = await TaskModel.findById(tid);
        } catch (error) {
            return next(error);
        }
        res.json({ success: true, task });
    }
    static async delete(req, res, next) {
        let { pid, did, tid } = req.body;
        // check for pid and did and tid
        if (!pid || !did || !tid) return next(CustomError.createError(INSUFFICENT_DATA, "INSUFFICENT_DATA", "pid,did,tid is required"));
        // delete task
        let taskDoc;
        try {
            taskDoc = await TaskModel.findOneAndDelete({ _id: tid });
            if (!taskDoc) return res.json({ success: true });
        } catch (error) {
            return next(error);
        }
        // TODO: check if given pid and tid is correct or not
        // pull tid from array of concerned Model according to target
        try {
            if (taskDoc.target == TODO)
                await ProfileModel.findByIdAndUpdate(pid, { $pull: { todos: tid } });
            if (taskDoc.target == WORK)
                await DayModel.findByIdAndUpdate(did, { $pull: { work: tid } });
            if (taskDoc.target == QUESTION)
                await DayModel.findByIdAndUpdate(did, { $pull: { dsa: tid } });
        } catch (error) {
            return next(error);
        }
        // res
        res.json({ success: true, tid });
    }
}

export default TaskController