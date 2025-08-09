import express from "express";
const adminRouter = express.Router();
import { removeEducator, allEducators, search } from "../controllers/adminController.js";

// Routes
adminRouter.get("/search-educators", search);
adminRouter.delete("/delete-educator", removeEducator);
adminRouter.get("/all-educators", allEducators);

export { adminRouter };
