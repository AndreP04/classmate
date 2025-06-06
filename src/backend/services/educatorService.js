import { educatorModel } from "../models/educatorModel.js";
import { validateEmail, validatePassword } from '../utils/validation.js';
import { studentModel } from "../models/studentModel.js";
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


/**
 * Service to log in an existing educator
 * @param {string} email - Educator's username
 * @param {string} password - Educator's password
 * @returns {boolean} True or false based on log in success
 */
const loginEducator = async (email, password) => {
    const educator = await educatorModel.findOne({ email });
    if (!educator) {
        console.error('Educator not found');
        return false;
    }

    const isMatch = await bcrypt.compare(password, educator.password);
    if (!isMatch) {
        console.error('Invalid password');
        return false;
    }

    return true;
};


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
        email: student.email
    }));
};

/**
 * Service to reset the educator's password
 * @param {*} email - Educator's email address
 * @param {*} newPW - Educator's new password
 * @returns - Success message upon successful reset
 */
const resetPassword = async (email, newPW) => {
    const educator = await educatorModel.findOne({ email });

    if (!educator) {
        throw new Error('Educator not found');
    }

    // Password validation
    if (!await validatePassword(newPW)) {
        throw new Error('A new password of 8 or more characters is required');
    } 

    const hashedPW = await bcrypt.hash(newPW, 10);

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
    registerEducator, 
    loginEducator, 
    registerStudent,
    deleteStudent, 
    searchStudent, 
    getAllStudents, 
    resetPassword
};