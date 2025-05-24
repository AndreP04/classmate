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

        if (await user.findOne({ username })) {
            throw new Error('This username is not available');
        }

        return await user.save();
    } catch (err) {
        console.error(`Failed to create new user: ${err}`);
    }
}


/**
 * Service to log in an existing user
 * @param {*} username - User's username
 * @param {*} password - User's password
 * @returns True or false based on success
 */
const loginUser = async (username, password) => {
    try {
        const user = await userModel.findOne({ username, password });

        if (user.username !== username || user.password !== password) {
            console.error('Invalid username or password');
            return false;
        }

        return true;
    } catch (err) {
        console.error(`Login failed: ${err}`);
    }
}


export { createUser, loginUser };