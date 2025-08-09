import { userModel } from "../models/userModel.js";

/**
 * Service to search for a specific educator
 * @param {*} email - Educator's email address
 * @returns - Array of educator's information
 */
const searchEducator = async (email) => {
  const regex = new RegExp(email, "i");
  const educators = await userModel.find({ email: { $regex: regex } });

  if (!educators || educators.length === 0) {
    throw new Error("No educators found");
  }

  // Return educator details
  return educators.map((educator) => ({
    firstName: educator.firstName,
    lastName: educator.lastName,
    age: educator.age,
    grade: educator.grade,
    institution: educator.institution
  }));
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
