import { searchEducator, deleteEducator, getAllEducators } from "../services/adminService.js";

/**
 * Search for existing educators
 * @param {*} req - Request
 * @param {*} res - Response
 */
const search = async (req, res) => {
  try {
    const { email } = req.body;
    const educatorList = await searchEducator(email);

    if (!email) {
      throw new Error("Email address is required to search");
    }

    res.status(200).json({ educatorList });
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
    const { email } = req.body;

    if (!email) {
      return res.status(400).json("Educator email address is required");
    }

    const result = await deleteEducator(email);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Educator not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Fetch all educators
 * @param {*} req - Request
 * @param {*} res - Reponse
 */
const allEducators = async (req, res) => {
  try {
    const educators = await getAllEducators();
    res.status(200).json(educators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { search, removeEducator, allEducators };
