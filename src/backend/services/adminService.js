import { educatorModel } from "../models/educatorModel.js";
import { validateEmail, validatePassword } from '../utils/validation.js';

/**
 * Service to register a new educator
 * @param {*} educatorData - Stores the educator's data
 * @returns Newly created educator
 */
const registerEducator = async (educatorData) => {
    if (!educatorData?.email || !educatorData?.password) {
        throw new Error('Email and password are required');
    }

    // Check if user exists with email address
    if (await educatorModel.findOne({ email: educatorData.email })) {
        throw new Error('This email address has already been registered');
    }

    // Email validation
    if (!await validateEmail(educatorData.email)) {
        throw new Error('Invalid email address');
    };

    // Password validation
    if (!await validatePassword(educatorData.password)) {
        throw new Error('A password of 8 or more characters is required');
    }

    // Hash password
    const hashedPW = await bcrypt.hash(educatorData.password, 10);
    educatorData.password = hashedPW;

    const educator = new educatorModel(educatorData);
    return await educator.save();
};

export { registerEducator };