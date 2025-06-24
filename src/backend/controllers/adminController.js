import { registerEducator, deleteEducator } from "../services/adminService.js";

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

/**
 * Delete an existing educator
 * @param {*} req - Request
 * @param {*} res - Response 
 */
const removeEducator = async (req, res) => {
    try {
        const { firstName } = req.body;

        if (!firstName) {
            return res.status(400).json('First name is required');
        }

        const result = await deleteEducator(firstName);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Educator not found' });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { register, removeEducator };