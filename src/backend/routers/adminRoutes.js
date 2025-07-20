import express from 'express';
const adminRouter = express.Router();
import { adminRegister, educatorRegister, removeEducator, resetAdminPW } from '../controllers/adminController.js';

// Routes
adminRouter.post('/register-admin', adminRegister);
adminRouter.post('/register-educator', educatorRegister);
adminRouter.post('/delete-educator', removeEducator);
adminRouter.patch('/reset-password', resetAdminPW);

export { adminRouter };