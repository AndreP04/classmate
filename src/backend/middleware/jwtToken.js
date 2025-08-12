import jwt from "jsonwebtoken";

/**
 * JWT Token Setup
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Middleware
 * @returns Status 401 if user does not have a token
 */
const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { requireAuth };
