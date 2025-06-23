import { registerEducator } from "../services/adminService.js";

/**
 * Register a new educator
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns - Newly created educator
 */
const register = async (req, res) => {
    try {
        const newEducator = await registerEducator(req.body);

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                firstName: newEducator.firstName,
                lastName: newEducator.lastName,
                emailAddress: newEducator.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { register };