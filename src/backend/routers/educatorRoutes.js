import { addStudent, removeStudent, search, allStudents } from "../controllers/educatorController.js";
import express from "express";
import { requireAuth } from "../middleware/jwtToken.js";
const educatorRouter = express.Router();

// Routes
//educatorRouter.use(requireAuth);
educatorRouter.post("/register-student", requireAuth, addStudent);
educatorRouter.delete("/delete-student", requireAuth, removeStudent);
educatorRouter.get("/search-students", requireAuth, search);
educatorRouter.get("/all-students", requireAuth, allStudents);

export { educatorRouter };
