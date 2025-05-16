import mongoose from 'mongoose';

const dbURI = process.env.DB_URI;

/**
 * Function to connect to MongoDB.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error}`);
    process.exit(1);
  }
};

export { connectDB };