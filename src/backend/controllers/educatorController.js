import {
    loginEducator, 
    registerStudent, 
    deleteStudent, 
    resetPassword, 
    searchStudent, 
    getAllStudents
} from '../services/educatorService.js';


/**
 * Log in an existing educator
 * @param {*} req - Request
 * @param {*} res - Response
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json('Email and password are required');
        }

        if (!await loginEducator(email, password)) {
            return res.status(401).json('Incorrect email address or password');
        }

        res.status(200).json('Login successful');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Register a new student
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns - Newly registered student
 */
const addStudent = async (req, res) => {
    try {
        const newStudent = await registerStudent(req.body);

        return res.status(201).json({
            message: 'New student registered successfully',
            user: {
                firstName: newStudent.firstName,
                lastName: newStudent.lastName,
                age: newStudent.age,
                grade: newStudent.grade,
                institution: newStudent.institution,
                institutionType: newStudent.institutionType
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Delete an existing student
 * @param {*} req - Request
 * @param {*} res - Response 
 */
const removeStudent = async (req, res) => {
    try {
        const { firstName } = req.body;

        if (!firstName) {
            return res.status(400).json('First name is required');
        }

        const result = await deleteStudent(firstName);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Reset the educator's password
 * @param {*} req - Request
 * @param {*} res - Response
 */
const resetPW = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const result = await resetPassword(email, newPassword);

        res.status(200).json({
            message: result.message
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Search for existing students
 * @param {*} req - Request
 * @param {*} res - Response
 */
const search = async (req, res) => {
    try {
        const { firstName } = req.body;
        const studentList = await searchStudent(firstName);

        if (!firstName) {
            throw new Error('First name is required to search');
        }

        res.status(200).json({ studentList });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Get all students
 * @param {*} req - Request
 * @param {*} res - Response
 */
const allStudents = async (req, res) => {
    try {
        const allStudents = await getAllStudents();

        if (!allStudents) {
            throw new Error('No students found');
        }

        res.status(200).json(allStudents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export {
    login,
    addStudent,
    removeStudent, 
    resetPW, 
    search, 
    allStudents
};