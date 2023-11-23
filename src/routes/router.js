import express from 'express';
import UserController from '../controllers/User.controller.js';
import isAuth from '../middlewares/isAuth.js';
import TaskController from '../controllers/Task.controller.js';

const router = express.Router();

// user
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/activate', isAuth, UserController.activate);
router.get('/logout', isAuth, UserController.logout);

// protected rotes
router.post('/profile', isAuth, UserController.profile);
router.post('/day', isAuth, UserController.day);

// Task
router.post('/task', isAuth, TaskController.create);
router.patch('/task', isAuth, TaskController.update);
router.post('/task/:tid', isAuth, TaskController.get);
router.delete('/task', isAuth, TaskController.delete);


export default router