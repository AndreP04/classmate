import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';

/**
 * Service to register a new user
 * @param {*} userData - Stores the user's data
 * @returns Newly created user
 */
const createUser = async (userData) => {
    try {
        // Hash password
        const hashedPW = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPW;

        const user = new userModel(userData);
        const newUser = await user.save();
        return newUser;
    } catch (err) {
        console.error(`Failed to create new user: ${err}`);
    }
}


export { createUser };