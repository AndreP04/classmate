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
 * Service to search for specific students
 * @param {*} firstName - Student's first name
 * @returns - Map of student's information
 */
const searchStudent = async (firstName) => {
  const regex = new RegExp(firstName, "i");
  const students = await studentModel.find({ firstName: { $regex: regex } });

  if (!students || students.length === 0) {
    throw new Error("No students found");
  }

  // Return student details
  return students.map((student) => ({
    firstName: student.firstName,
    lastName: student.lastName,
    age: student.age,
    grade: student.grade,
    institution: student.institution
  }));
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
