import { register, login, remove, resetPW, search, allUsers } from "../controllers/educatorController.js";
import express from 'express';
const educatorRouter = express.Router();

// Routes
educatorRouter.post('/register', register);
educatorRouter.get('/login', login);
educatorRouter.delete('/delete', remove);
educatorRouter.patch('/reset-password', resetPW);
educatorRouter.get('/search-users', search);
educatorRouter.get('/all-users', allUsers);

export { educatorRouter };