import { educatorModel } from "../models/educatorModel.js";
import { adminModel } from "../models/adminModel.js";
import { validatePassword } from "../utils/validation.js";
import bcrypt from "bcrypt";

/**
 * Service to log in an existing user account
 * @param {string} email - User's username
 * @param {string} password - User's password
 * @returns {boolean} True or false based on log in success
 */
const loginUser = async (email, password) => {

    const user = await educatorModel.findOne({ email }) || await adminModel.findOne({ email });

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
 * Service to reset the user's password
 * @param {*} email - User's email address
 * @param {*} newPassword - User's new password
 * @returns - Success message upon successful reset
 */
const resetPassword = async (email, newPassword) => {
    
    const user = await adminModel.findOne({ email }) || await educatorModel.findOne({ email });

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

export { loginUser, resetPassword };