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
router.get('/profile', isAuth, UserController.profile);
router.get('/day', isAuth, UserController.day);

// Task
router.post('/task', isAuth, TaskController.create);
router.put('/task', isAuth, TaskController.update);
router.get('/task', isAuth, TaskController.get);
router.delete('/task', isAuth, TaskController.delete);


export default router