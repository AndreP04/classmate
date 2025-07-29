import { educatorModel } from "../models/educatorModel.js";

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

export { deleteEducator };