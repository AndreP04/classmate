import { userModel } from "../models/userModel.js";

/**
 * Service to delete an existing educator
 * @param {*} firstName - First name of the educator
 * @returns - Message indicating deletion success/failure
 */
const deleteEducator = async (email) => {
    const educator = await userModel.findOne({ email });

    //If the educator does not exist, throw an error
    if (!educator) {
        throw new Error('Specified educator not found');
    }

    await userModel.deleteOne({ email });
    return { message: 'Educator deleted successfully' };
};

export { deleteEducator };