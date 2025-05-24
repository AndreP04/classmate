import { registerUser, login } from "../controllers/userController.js";
import express from 'express';
const userRouter = express.Router();

// Routes
userRouter.post('/register', registerUser);
userRouter.get('/login', login);

export { userRouter };