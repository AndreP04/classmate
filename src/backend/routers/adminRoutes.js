import express from 'express';
const adminRouter = express.Router();
import { register } from '../controllers/adminController.js';

// Routes
adminRouter.post('/register-educator', register);

export { adminRouter };