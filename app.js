import { connectDB } from './src/backend/config/connectDB.js';
import dotenv from 'dotenv';
import express from 'express';
import { userRouter } from './src/backend/routers/userRoutes.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use('/classmate', userRouter);

try {

    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    // Connect to MongoDB
    await connectDB(process.env.DB_URI);

} catch (err) {
    console.error(`Failed to connect to Mongo database: ${err}`);
}