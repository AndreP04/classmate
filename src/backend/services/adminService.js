import { userModel } from "../models/userModel.js";

/**
 * Service to delete an existing educator
 * @param {*} email - Email address of the educator
 * @returns - Message indicating deletion success/failure
 */
const deleteEducator = async (email) => {
    const educator = await userModel.findOne({ email, role: 'educator' });

    //If the educator does not exist, throw an error
    if (!educator) {
        throw new Error('Specified educator not found');
    }

    await userModel.deleteOne({ email });
    return { message: 'Educator deleted successfully' };
};

/**
 * Service that returns all educators
 * @returns All registered educators
 */
const getAllEducators = async () => {
    const allEducators = await userModel.find({ role: "educator" });
    return allEducators;
}

export { deleteEducator, getAllEducators };