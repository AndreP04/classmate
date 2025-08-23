import { searchEducator, editEducator, deleteEducator, getAllEducators } from "../services/adminService.js";

/**
 * Search for existing educators
 * @param {*} req - Request
 * @param {*} res - Response
 */
const search = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const educators = await searchEducator(searchTerm);
    res.status(200).json(educators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Modify the data of an existing educator
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns Success response on succesful update.
 */
const modifyEducator = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEducator = req.body;
    const educator = await editEducator(id, updatedEducator);

    if (!educator) return res.status(404).json({ message: "Educator not found" }); //! Unnecessary?

    res.status(200).json({
      message: "Educator updated successfully",
      educator
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

export { search, modifyEducator, removeEducator, allEducators };
