import { loginUser } from "../services/universalService";

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

        res.status(200).json('Login successful');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { login };