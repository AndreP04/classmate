import { createUser, loginUser, deleteUser, resetPassword, searchUser, getAllUsers } from '../services/userService.js';

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
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json('Username and password are required');
        }

        if (!await loginUser(username, password)) {
            return res.status(401).json('Invalid username or password');
        }

        res.status(200).json('Login successful');
    } catch (err) {
        res.status(500).json({ message: err.message });
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


const search = async (req, res) => {
    try {
        const { firstName } = req.body;
        const users = await searchUser(firstName);

        if (!firstName) {
            throw new Error('First name is required to search');
        }

        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * Get all users
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns - A list of all users
 */
const allUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        if (!users) {
            throw new Error('No users found');
        }

        return res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { register, login, remove, resetPW, search, allUsers };