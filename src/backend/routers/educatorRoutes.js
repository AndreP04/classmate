import {
    login,
    addStudent,
    removeStudent, 
    resetPW, 
    search, 
    allStudents
} from "../controllers/educatorController.js";
import express from 'express';
const educatorRouter = express.Router();

// Routes
educatorRouter.post('/login-educator', login);
educatorRouter.post('/register-student', addStudent)
educatorRouter.delete('/delete-student', removeStudent);
educatorRouter.patch('/reset-password', resetPW);
educatorRouter.get('/search-students', search);
educatorRouter.get('/all-students', allStudents);

export { educatorRouter };