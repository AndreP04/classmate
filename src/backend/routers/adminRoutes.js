import express from 'express';
const adminRouter = express.Router();
import { removeEducator } from '../controllers/adminController.js';

// Routes
adminRouter.post('/delete-educator', removeEducator);

export { adminRouter };