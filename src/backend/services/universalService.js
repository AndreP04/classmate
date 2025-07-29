import { userModel } from "../models/userModel.js";
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

    // Check if an admin user already exists within an institution
    if (await userModel.findOne({ role: userData.role }) == "admin") {
        userData.role = "educator";
    }

    // Check if user exists with email address
    if (await userModel.findOne({ email: userData.email })) {
        throw new Error('A user with this email address has already been registered');
    }

    // Validation
    if (!await validateEmail(userData.email)) {
        throw new Error('Invalid email address');
    };

    if (!await validatePassword(userData.password)) {
        throw new Error('A password of 8 or more characters is required');
    }

    // Hash password
    const hashedPW = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPW;

    const newUser = new userModel(userData);
    return await newUser.save();
};

/**
 * Service to log in an existing user account
 * @param {string} email - User's username
 * @param {string} password - User's password
 * @returns {object|null} Object of user information on success, otherwise null
 */
const loginUser = async (email, password) => {

    const user = await userModel.findOne({ email });

    if (!user) {
        console.error('User not found');
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.error('Invalid password');
        return null;
    }

    return user.role;
};

/**
 * Service to reset the user's password
 * @param {*} email - User's email address
 * @param {*} newPassword - User's new password
 * @returns - Success message upon successful reset
 */
const resetPassword = async (email, newPassword) => {
    
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    // Password validation
    if (!await validatePassword(newPassword)) {
        throw new Error('A new password of 8 or more characters is required');
    } 

    const hashedPW = await bcrypt.hash(newPassword, 10);

    user.password = hashedPW;
    await user.save();
    return { message: 'Password reset successfully' };
};

export { loginUser, resetPassword, registerUser };