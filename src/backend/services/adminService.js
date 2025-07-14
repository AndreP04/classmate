import { educatorModel } from "../models/educatorModel.js";
import { validateEmail, validatePassword } from '../utils/validation.js';
import bcrypt from 'bcrypt';

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
        throw new Error('A user with this email address has already been registered');
    }

    // Validation
    if (!await validateEmail(educatorData.email)) {
        throw new Error('Invalid email address');
    };

    if (!await validatePassword(educatorData.password)) {
        throw new Error('A password of 8 or more characters is required');
    }

    // Hash password
    const hashedPW = await bcrypt.hash(educatorData.password, 10);
    educatorData.password = hashedPW;

    const educator = new educatorModel(educatorData);
    return await educator.save();
};

/**
 * Service to delete an existing educator
 * @param {*} firstName - First name of the educator
 * @returns - Message indicating deletion success/failure
 */
const deleteEducator = async (firstName) => {
    const educator = await educatorModel.findOne({ firstName });

    //If the educator does not exist, throw an error
    if (!educator) {
        throw new Error('Specified educator not found');
    }

    await educatorModel.deleteOne({ firstName });
    return { message: 'Educator deleted successfully' };
};

export { registerEducator, deleteEducator };