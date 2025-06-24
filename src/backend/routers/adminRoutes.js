import express from 'express';
const adminRouter = express.Router();
import { register, removeEducator } from '../controllers/adminController.js';

// Routes
adminRouter.post('/register-educator', register);
adminRouter.post('/delete-educator', removeEducator);

export { adminRouter };