import { addStudent, removeStudent, search, allStudents } from "../controllers/educatorController.js";
import express from "express";
const educatorRouter = express.Router();

// Routes
educatorRouter.post("/register-student", addStudent);
educatorRouter.delete("/delete-student", removeStudent);
educatorRouter.get("/search-students", search);
educatorRouter.get("/all-students", allStudents);

export { educatorRouter };
