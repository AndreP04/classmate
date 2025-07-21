import { educatorModel } from "../models/educatorModel.js";
import { adminModel } from "../models/adminModel.js";

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

export { loginUser };