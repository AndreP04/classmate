import { createUser } from '../services/userService.js';

/**
 * Register a new user
 */
const registerUser = async (req, res) => {
    const newUser = await createUser(req.body);
    res.status(201).json("New user registered successfully.");
};

export { registerUser };