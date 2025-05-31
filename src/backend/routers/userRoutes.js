import { register, login, remove, resetPW, search, allUsers } from "../controllers/userController.js";
import express from 'express';
const userRouter = express.Router();

// Routes
userRouter.post('/register', register);
userRouter.get('/login', login);
userRouter.delete('/delete', remove);
userRouter.patch('/reset-password', resetPW);
userRouter.get('/search-users', search);
userRouter.get('/all-users', allUsers);

export { userRouter };