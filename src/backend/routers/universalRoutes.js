import { login } from "../controllers/universalController,js";
import express from 'express';
const userRouter = express.Router();

// Routes
userRouter.post('/login');

export { userRouter };