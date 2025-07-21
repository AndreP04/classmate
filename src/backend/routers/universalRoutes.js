import { login, resetUserPassword } from "../controllers/universalController.js";
import express from 'express';
const userRouter = express.Router();

// Routes
userRouter.post('/login', login);
userRouter.patch('/reset-password', resetUserPassword);

export { userRouter };