import { loginUser, registerUser, resetPassword } from "../services/universalService.js";

/**
 * Register a new user
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns Newly created user
 */
const userRegister = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
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
 * Log in an existing educator
 * @param {*} req - Request
 * @param {*} res - Response
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }
    const authResult = await loginUser(email, password);
    if (!authResult) {
      return res.status(401).json("Incorrect email address or password");
    }

    res.cookie("token", authResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(200).json({
      message: "Login successful",
      role: authResult.role
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

export { userRegister, login, resetUserPassword };
