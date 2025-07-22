import { loginUser, resetPassword } from "../services/universalService.js";

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

        if (!await loginUser(email, password)) {
            return res.status(401).json('Incorrect email address or password');
        }

        // Get user's role
        const role = await loginUser(email, password);

        res.status(200).json({
            message: 'Login successful',
            role
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Reset the user's password
 * @param {*} req - Request
 * @param {*} res - Response
 */
const resetUserPassword = async (req, res) => {
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

export { login, resetUserPassword };