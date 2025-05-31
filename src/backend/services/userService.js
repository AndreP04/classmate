
import { userModel } from '../models/userModel.js';
import { validateEmail, validatePassword } from '../utils/validation.js';
import bcrypt from 'bcrypt';


/**
 * Service to register a new user
 * @param {*} userData - Stores the user's data
 * @returns Newly created user
 */
const createUser = async (userData) => {
    if (!userData?.username || !userData?.password) {
        throw new Error('Username and password are required');
    }

    // Check if user exists with username
    if (await userModel.findOne({ username: userData.username })) {
        throw new Error('This username is not available');
    }

    // Email validation
    if (!await validateEmail(userData.email)) {
        throw new Error('Invalid email address');
    };

    // Password validation
    if (!await validatePassword(userData.password)) {
        throw new Error('A password of 8 or more characters is required');
    }

    // Hash password
    const hashedPW = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPW;

    const user = new userModel(userData);
    return await user.save();
};


/**
 * Service to log in an existing user
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {boolean} True or false based on success
 */
const loginUser = async (username, password) => {
    const user = await userModel.findOne({ username });
    if (!user) {
        console.error('User not found');
        return false;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.error('Invalid password');
        return false;
    }

    return true;
};


/**
 * Service to delete an existing user
 * @param {*} username - Username of the user
 * @returns - Message indicating deletion success
 */
const deleteUser = async (username) => {
    const user = await userModel.findOne({ username });

    //If the user doesn't exist, throw an error
    if (!user) {
        throw new Error('Specified user not found');
    }

    await userModel.deleteOne({ username });
    return { message: 'User deleted successfully' };
};

/**
 * Service to reset the user's password
 * @param {*} email - User's email address
 * @param {*} newPW - User's new password
 * @returns - Success message
 */
const resetPassword = async (email, newPW) => {
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    // Password validation
    if (!await validatePassword(newPW)) {
        throw new Error('A new password of 8 or more characters is required');
    } 

    const hashedPW = await bcrypt.hash(newPW, 10);

    user.password = hashedPW;
    await user.save();
    return { message: 'Password reset successfully' };
};

/**
 * Service to search for specific users
 * @param {*} firstName - User's first name
 * @returns - Map of user information
 */
const searchUser = async (firstName) => {
    const regex = new RegExp(firstName, 'i');
    const users = await userModel.find({ firstName: {$regex: regex} });

    if (!users) {
        throw new Error('No users found');
    }

    // Return user details
    return users.map(user => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
    }));
};

export { createUser, loginUser, deleteUser, resetPassword, searchUser };