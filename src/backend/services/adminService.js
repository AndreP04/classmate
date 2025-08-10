import { userModel } from "../models/userModel.js";

/**
 * Service to search for a specific educator
 * @param {*} searchTerm - Query used for search
 * @returns - Array of educator's information
 */
const searchEducator = async (searchTerm) => {
  const regex = new RegExp(searchTerm, "i");
  const educators = await userModel.find(
    {
      role: { $ne: "admin" }, // Exclude admin users
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
        { institution: { $regex: regex } }
      ]
    },
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      institution: 1,
      _id: 0
    }
  );

  // Return searched educators
  return educators;
};

/**
 * Service to delete an existing educator
 * @param {*} email - Email address of the educator
 * @returns - Message indicating deletion success/failure
 */
const deleteEducator = async (email) => {
  const educator = await userModel.findOne({ email, role: "educator" });

  //If the educator does not exist, throw an error
  if (!educator) {
    throw new Error("Specified educator not found");
  }

  await userModel.deleteOne({ email });
  return { message: "Educator deleted successfully" };
};

/**
 * Service that returns all educators
 * @returns All registered educators
 */
const getAllEducators = async () => {
  const allEducators = await userModel.find({ role: "educator" });
  return allEducators;
};

export { searchEducator, deleteEducator, getAllEducators };
