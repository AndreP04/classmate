import { userModel } from '../models/userModel.js';

/**
 * Service to register a new user
 * @param {*} userData - Stores the user's data
 * @returns Newly created user
 */
const createUser = async (userData) => {
    try {
        const user = new userModel(userData);
        const newUser = await user.save();
        return newUser;
    } catch (err) {
        console.error(`Failed to create new user: ${err}`);
    }
}


export { createUser };