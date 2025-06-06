import { register, login, removeStudent, resetPW, search, allStudents } from "../controllers/educatorController.js";
import express from 'express';
const educatorRouter = express.Router();

// Routes
educatorRouter.post('/register', register);
educatorRouter.get('/login', login);
educatorRouter.delete('/delete-student', removeStudent);
educatorRouter.patch('/reset-password', resetPW);
educatorRouter.get('/search-students', search);
educatorRouter.get('/all-students', allStudents);

export { educatorRouter };