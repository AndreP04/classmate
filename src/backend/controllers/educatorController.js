import { registerStudent, deleteStudent, searchStudent, getAllStudents } from "../services/educatorService.js";

/**
 * Register a new student
 * @param {*} req - Request
 * @param {*} res - Response
 * @returns - Newly registered student
 */
const addStudent = async (req, res) => {
  try {
    const newStudent = await registerStudent(req.body);

    return res.status(201).json({
      message: "New student registered successfully",
      user: {
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        age: newStudent.age,
        grade: newStudent.grade,
        institution: newStudent.institution,
        institutionType: newStudent.institutionType
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete an existing student
 * @param {*} req - Request
 * @param {*} res - Response
 */
const removeStudent = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName && !lastName) {
      return res.status(400).json("First and last name of the student is required");
    }

    const result = await deleteStudent(firstName, lastName);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Search for existing students
 * @param {*} req - Request
 * @param {*} res - Response
 */
const search = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const students = await searchStudent(searchTerm);
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all students
 * @param {*} req - Request
 * @param {*} res - Response
 */
const allStudents = async (req, res) => {
  try {
    const allStudents = await getAllStudents();

    if (!allStudents) {
      throw new Error("No students found");
    }

    res.status(200).json(allStudents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { addStudent, removeStudent, search, allStudents };
