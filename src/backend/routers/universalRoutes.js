import { login, logout, resetUserPassword, userRegister } from "../controllers/universalController.js";
import express from "express";
const userRouter = express.Router();

// Routes
userRouter.post("/register", userRegister);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.patch("/reset-password", resetUserPassword);

export { userRouter };
