import { register, login, removeStudent, resetPW, search, allStudents } from "../controllers/educatorController.js";
import express from 'express';
const educatorRouter = express.Router();

// Routes
educatorRouter.post('/register', register);
educatorRouter.get('/login', login);
educatorRouter.delete('/delete', removeStudent);
educatorRouter.patch('/reset-password', resetPW);
educatorRouter.get('/search-users', search);
educatorRouter.get('/all-users', allStudents);

export { educatorRouter };