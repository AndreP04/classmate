import { createUser, loginUser } from '../services/userService.js';

/**
 * Register a new user
 * @param {*} req - Request
 * @param {*} res - Response
 */
const registerUser = async (req, res) => {
    const newUser = await createUser(req.body);
    res.status(201).json(`New user, ${newUser.firstName}, register successfully.`);
};

/**
 * Log in an existing user
 * @param {*} req - Request
 * @param {*} res - Response
 */
const login = async (req, res) => {
    if (await loginUser(req.body) == true) {
        res.status(404).json('Invalid username or password');
    } else {
        res.status(200).json('Login successful');
    }
}

export { registerUser, login };