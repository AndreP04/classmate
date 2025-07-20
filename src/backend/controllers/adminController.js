import { registerEducator, deleteEducator, registerAdmin, resetAdminPassword } from "../services/adminService.js";

/**
 * Register a new admin
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns Newly created admin
 */
const adminRegister = async (req, res) => {
    try {
        const newAdmin = await registerAdmin(req.body);

        return res.status(201).json({
            message: 'Admin registered successfully',
            user: {
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                emailAddress: newAdmin.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Register a new educator
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns Newly created educator
 */
const educatorRegister = async (req, res) => {
    try {
        const newEducator = await registerEducator(req.body);

        return res.status(201).json({
            message: 'Educator registered successfully',
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

/**
 * Reset the admin's password
 * @param {*} req - Request
 * @param {*} res - Response
 */
const resetAdminPW = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const result = await resetAdminPassword(email, newPassword);

        res.status(200).json({
            message: result.message
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { adminRegister, educatorRegister, removeEducator, resetAdminPW };