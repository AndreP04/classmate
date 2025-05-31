import { createUser, loginUser, deleteUser, resetPassword } from '../services/userService.js';

/**
 * Register a new user
 * @param {*} req - Request
 * @param {*} res - Response
 */
const register = async (req, res) => {
    try {
        const newUser = await createUser(req.body);

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                emailAddress: newUser.email,
                role: newUser.role
            }
        });
    } catch {
        res.status(500).json('User registration failed');
    }
};

/**
 * Log in an existing user
 * @param {*} req - Request
 * @param {*} res - Response
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json('Username and password are required');
        }

        if (!await loginUser(username, password)) {
            return res.status(401).json('Invalid username or password');
        }

        res.status(200).json('Login successful');
    } catch {
        res.status(500).json('User login failed');
    }
};

/**
 * Delete an existing user
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns 
 */
const remove = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json('Username is required');
        }

        const result = await deleteUser( username );
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch {
        res.status(500).json({ error: 'User deletion failed' });
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
        res.status(404).json({ message: err.message });
    }
};

export { register, login, remove, resetPW };