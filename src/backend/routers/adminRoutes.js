import express from 'express';
const adminRouter = express.Router();
import { adminRegister, educatorRegister, removeEducator } from '../controllers/adminController.js';

// Routes
adminRouter.post('/register-admin', adminRegister);
adminRouter.post('/register-educator', educatorRegister);
adminRouter.post('/delete-educator', removeEducator);

export { adminRouter };