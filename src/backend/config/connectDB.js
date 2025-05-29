import mongoose from 'mongoose';

/**
 * Function to connect to the MongoDB database.
 * @param {*} mongoURI - Connection string of database.
 */
const connectDB = async (mongoURI) => {
    mongoose.connect(mongoURI)
        .then(() => console.info("Mongo database connected successfully."))
        .catch(err => console.error(`Failed to connect to Mongo database: ${err}`));
}

export { connectDB };