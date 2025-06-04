import { registerUser, loginUser, deleteStudent, resetPassword, searchStudent, getAllStudents } from '../services/educatorService.js';


/**
 * Register a new user
 * @param {*} req - Request
 * @param {*} res - Response
 */
const register = async (req, res) => {
    try {
        const newUser = await registerUser(req.body);

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                emailAddress: newUser.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Log in an existing user
 * @param {*} req - Request
 * @param {*} res - Response
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json('Email and password are required');
        }

        if (!await loginUser(email, password)) {
            return res.status(401).json('Incorrect email address or password');
        }

        res.status(200).json('Login successful');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Delete an existing student
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns 
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
            res.status(404).json({ error: 'User not found' });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Reset the user's password
 * @param {*} req - Request
 * @param {*} res - Response
 */
const resetPW = async (req, res) => {
    try {
        const { email, newPW } = req.body;
        const result = await resetPassword(email, newPW);

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
        const users = await searchStudent(firstName);

        if (!firstName) {
            throw new Error('First name is required to search');
        }

        res.status(200).json({ users });
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
        const users = await getAllStudents();

        if (!users) {
            throw new Error('No users found');
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export { register, login, removeStudent, resetPW, search, allStudents };