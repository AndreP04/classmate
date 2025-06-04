import { educatorModel } from "../models/educatorModel.js";
import { validateEmail, validatePassword } from '../utils/validation.js';
import bcrypt from 'bcrypt';

/**
 * Service to register a new user
 * @param {*} userData - Stores the user's data
 * @returns Newly created user
 */
const registerUser = async (userData) => {
    if (!userData?.email || !userData?.password) {
        throw new Error('Email and password are required');
    }

    // Check if user exists with email address
    if (await userModel.findOne({ email: userData.email })) {
        throw new Error('This email address has already been registered');
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

    const user = new educatorModel(userData);
    return await user.save();
};


/**
 * Service to log in an existing user
 * @param {string} email - User's username
 * @param {string} password - User's password
 * @returns {boolean} True or false based on log in success
 */
const loginUser = async (email, password) => {
    const user = await educatorModel.findOne({ email });
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
 * Service to delete an existing student
 * @param {*} firstName - First name of the user
 * @returns - Message indicating deletion success
 */
const deleteStudent = async (firstName) => {
    const user = await educatorModel.findOne({ firstName });

    //If the user doesn't exist, throw an error
    if (!user) {
        throw new Error('Specified user not found');
    }

    await educatorModel.deleteOne({ firstName });
    return { message: 'User deleted successfully' };
};


/**
 * Service to search for specific students
 * @param {*} firstName - User's first name
 * @returns - Map of user information
 */
const searchStudent = async (firstName) => {
    const regex = new RegExp(firstName, 'i');
    const users = await educatorModel.find({ firstName: {$regex: regex} });

    if (!users) {
        throw new Error('No users found');
    }

    // Return user details
    return users.map(user => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }));
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
 * Service to get all users
 * @returns - A list of all users
 */
const getAllUsers = async () => {
    const users = await educatorModel.find({});
    return users;
};

export { registerUser, loginUser, deleteStudent, searchStudent, getAllUsers, resetPassword };