import { login, resetUserPassword, userRegister } from "../controllers/universalController.js";
import express from 'express';
const userRouter = express.Router();

// Routes
userRouter.post('/register', userRegister);
userRouter.post('/login', login);
userRouter.patch('/reset-password', resetUserPassword);

export { userRouter };