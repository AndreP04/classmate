import { studentModel } from "../models/studentModel.js";

/**
 * Service to register a new student
 * @param {*} studentData - New student's data
 * @returns - Newly created user data
 */
const registerStudent = async (studentData) => {
  const newStudent = new studentModel(studentData);
  return await newStudent.save();
};

/**
 * Service to delete an existing student
 * @param {*} firstName - First name of the student
 * @param {*} lastName - Last name of the student
 * @returns - Message indicating deletion success/failure
 */
const deleteStudent = async (firstName, lastName) => {
  const student = await studentModel.findOne({ firstName, lastName });

  //If the student does not exist, throw an error
  if (!student) {
    throw new Error("Specified student not found");
  }

  await studentModel.deleteOne({ firstName, lastName });
  return { message: "Student deleted successfully" };
};

/**
 * Service to search for a specific student
 * @param {*} searchTerm - Query used for search
 * @returns - Array of student's information
 */
const searchStudent = async (searchTerm) => {
  const regex = new RegExp(searchTerm, "i");
  const students = await studentModel.find(
    {
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }]
    },
    {
      firstName: 1,
      lastName: 1,
      age: 1,
      grade: 1,
      institution: 1,
      guardians: 1,
      _id: 0
    }
  );

  // Return searched students
  return students;
};

/**
 * Service to retrieve all students
 * @returns - A list of all students
 */
const getAllStudents = async () => {
  const allStudents = await studentModel.find({});
  return allStudents;
};

export { registerStudent, deleteStudent, searchStudent, getAllStudents };
