import { register, login, remove, resetPW } from "../controllers/userController.js";
import express from 'express';
const userRouter = express.Router();

// Routes
userRouter.post('/register', register);
userRouter.get('/login', login);
userRouter.delete('/delete', remove);
userRouter.patch('/reset-password', resetPW);

export { userRouter };