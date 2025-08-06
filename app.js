import { connectDB } from "./src/backend/config/connectDB.js";
import dotenv from "dotenv";
import express from "express";
import { educatorRouter } from "./src/backend/routers/educatorRoutes.js";
import { adminRouter } from "./src/backend/routers/adminRoutes.js";
import { userRouter } from "./src/backend/routers/universalRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "DELETE", "PATCH", "PUT"] }));
app.use(express.json());
app.use("/classmate", userRouter);
app.use("/classmate/educator", educatorRouter);
app.use("/classmate/admin", adminRouter);

try {
  // Start server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  // Connect to MongoDB
  await connectDB(process.env.DB_URI);
} catch (err) {
  console.error(`Failed to connect to database: ${err}`);
}
