import { educatorModel } from "../models/educatorModel.js";
import { validatePassword } from '../utils/validation.js';
import { studentModel } from "../models/studentModel.js";
import bcrypt from 'bcrypt';


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
 * @returns - Message indicating deletion success/failure
 */
const deleteStudent = async (firstName) => {
    const student = await studentModel.findOne({ firstName });

    //If the student does not exist, throw an error
    if (!student) {
        throw new Error('Specified student not found');
    }

    await studentModel.deleteOne({ firstName });
    return { message: 'Student deleted successfully' };
};


/**
 * Service to search for specific students
 * @param {*} firstName - Student's first name
 * @returns - Map of student's information
 */
const searchStudent = async (firstName) => {
    const regex = new RegExp(firstName, 'i');
    const students = await studentModel.find({ firstName: {$regex: regex} });

    if (!students) {
        throw new Error('No students found');
    }

    // Return student details
    return students.map(student => ({
        firstName: student.firstName,
        lastName: student.lastName,
        age: student.age,
        grade: student.grade,
        institution: student.institution,
        institutionType: student.institutionType
    }));
};

/**
 * Service to reset the educator's password
 * @param {*} email - Educator's email address
 * @param {*} newPassword - Educator's new password
 * @returns - Success message upon successful reset
 */
const resetPassword = async (email, newPassword) => {
    const educator = await educatorModel.findOne({ email });

    if (!educator) {
        throw new Error('Educator not found');
    }

    // Password validation
    if (!await validatePassword(newPassword)) {
        throw new Error('A new password of 8 or more characters is required');
    } 

    const hashedPW = await bcrypt.hash(newPassword, 10);

    educator.password = hashedPW;
    await educator.save();
    return { message: 'Password reset successfully' };
};


/**
 * Service to retrieve all students
 * @returns - A list of all students
 */
const getAllStudents = async () => {
    const allStudents = await studentModel.find({});
    return allStudents;
};

export {
    loginEducator, 
    registerStudent,
    deleteStudent, 
    searchStudent, 
    getAllStudents, 
    resetPassword
};