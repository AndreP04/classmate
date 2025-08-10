import express from "express";
const adminRouter = express.Router();
import { requireAuth } from "../middleware/jwtToken.js";
import { removeEducator, allEducators, search } from "../controllers/adminController.js";

// Routes
//adminRouter.use(requireAuth);
adminRouter.get("/search-educators", requireAuth, search);
adminRouter.delete("/delete-educator", requireAuth, removeEducator);
adminRouter.get("/all-educators", requireAuth, allEducators);

export { adminRouter };
