import express from 'express';
const adminRouter = express.Router();
import { removeEducator, allEducators } from '../controllers/adminController.js';

// Routes
adminRouter.post('/delete-educator', removeEducator);
adminRouter.get('/all-educators', allEducators);

export { adminRouter };