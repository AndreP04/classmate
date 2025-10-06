"use client";
import { useEffect, useState } from "react";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const EducatorPortalForm = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedFirstName, setSelectedFirstName] = useState<string | null>(null);
  const [selectedLastName, setSelectedLastName] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editStudent, setEditStudent] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Pagination indices
  const lastStudentIndex = currentPage * studentsPerPage;
  const firstStudentIndex = lastStudentIndex - studentsPerPage;
  const currentStudents = students.slice(firstStudentIndex, lastStudentIndex);

  // Total pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Fetch all students on page load
  const fetchStudents = async () => {
    try {
      const { data } = await instance.get("/classmate/educator/all-students");
      setStudents(data);
    } catch (err) {
      console.error(`Failed to retrieve students: ${err}`);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Search students endpoint
  const searchStudents = async () => {
    try {
      const { data } = await instance.get("/classmate/educator/search-students", {
        params: { searchTerm }
      });
      setStudents(data);
    } catch (err) {
      console.error(`Failed to retrieve searched students: ${err}`);
    }
  };

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      fetchStudents();
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length >= 1) {
        searchStudents();
      }
    }, 100);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Delete students endpoint
  const deleteStudent = async (firstName: string, lastName: string) => {
    try {
      await instance.delete("/classmate/educator/delete-student", {
        data: { firstName, lastName }
      });
      setStudents((prev) => prev.filter((user) => user.firstName !== firstName && user.lastName !== lastName));
    } catch (err) {
      console.error(`Failed to delete student: ${err}`);
    }
  };

  // Add student route logic
  const handleAddStudent = async () => {
    router.push("/add/student");
  };

  // Logout endpoint
  const handleLogout = async () => {
    try {
      await instance.post("/classmate/logout", {}, { withCredentials: true });
      localStorage.clear();
      router.push("/auth/login");
    } catch (err) {
      console.error(`Failed to log out user: ${err}`);
      alert("Log out failed. Please try again");
    }
  };

  // Modals
  const confirmDelete = (firstName: string, lastName: string) => {
    setSelectedFirstName(firstName);
    setSelectedLastName(lastName);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (selectedFirstName && selectedLastName) {
      deleteStudent(selectedFirstName, selectedLastName);
    }
    setShowConfirm(false);
    setSelectedFirstName(null);
    setSelectedLastName(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedFirstName(null);
    setSelectedLastName(null);
  };

  // Edit student modal
  const openEditModal = (student: any) => {
    setEditStudent({ ...student });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await instance.put("/classmate/educator/update-student", editStudent);
      setStudents((prev) => prev.map((s) => (s._id === editStudent._id ? { ...editStudent } : s)));
      setShowEditModal(false);
      setEditStudent(null);
    } catch (err) {
      console.error("Failed to update student:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#349495] via-gray-400 to-[#349495] text-slate-100 py-10 px-6 sm:px-12 relative">
      {/* Add Student and Logout button */}
      <div className="flex justify-end mb-6 space-x-4">
        <button
          onClick={handleAddStudent}
          className="cursor-pointer px-4 py-2 bg-slate-700 text-white rounded-md border border-slate-600 
               hover:bg-slate-800 transition-colors"
        >
          Add Student
        </button>

        <button
          onClick={handleLogout}
          className="cursor-pointer px-4 py-2 bg-slate-700 text-white rounded-md border border-slate-600 
               hover:bg-slate-800 transition-colors"
        >
          Logout
        </button>
      </div>
      <form className="max-w-7xl mx-auto bg-[#f5f5f6] rounded-xl shadow-lg p-8">
        {/* Header and search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h3 className="text-gray-700 text-5xl font-extrabold tracking-tight">Students</h3>
          <div className="mt-4 sm:mt-0 w-full sm:w-64 relative">
            <input
              type="text"
              placeholder="Find a student"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-4 pr-10 rounded-md border border-slate-600 bg-slate-700 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-[#349495] focus:border-[#349495] transition"
            />
            <button
              type="button"
              onClick={() => {
                if (searchTerm.trim()) {
                  searchStudents();
                } else {
                  fetchStudents();
                }
              }}
              className="cursor-pointer absolute top-1.5 right-1.5 h-7 w-7 flex items-center justify-center rounded hover:bg-slate-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-md bg-gray-700">
          <table className="min-w-full table-auto text-left border-collapse text-slate-100">
            <thead className="bg-slate-600 uppercase text-sm font-semibold text-white">
              <tr>
                <th className="py-3 px-6 border-b border-slate-500">First Name</th>
                <th className="py-3 px-6 border-b border-slate-500">Last Name</th>
                <th className="py-3 px-6 border-b border-slate-500">Age</th>
                <th className="py-3 px-6 border-b border-slate-500">Grade</th>
                <th className="py-3 px-6 border-b border-slate-500">Institution</th>
                <th className="py-3 px-6 border-b border-slate-500">Guardians</th>
                <th className="py-3 px-6 border-b border-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={`${student.firstName}-${student.lastName}`} className="border-b border-slate-600">
                  <td className="py-4 px-6">{student.firstName}</td>
                  <td className="py-4 px-6">{student.lastName}</td>
                  <td className="py-4 px-6">{student.age}</td>
                  <td className="py-4 px-6">{student.grade}</td>
                  <td className="py-4 px-6">{student.institution}</td>

                  {/* Guardians Column */}
                  <td className="py-4 px-6">
                    {student.guardians && student.guardians.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {student.guardians.map((guardian, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-semibold">{guardian.name}</span> — {guardian.relationship}
                            <span className="text-slate-300"> ({guardian.phoneNumber})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="italic text-slate-300">No guardians</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex space-x-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          confirmDelete(student.firstName, student.lastName);
                        }}
                        className="cursor-pointer flex items-center justify-center gap-1 px-3 py-2 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition text-white font-semibold"
                        title="Delete Student"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openEditModal(student);
                        }}
                        className="cursor-pointer flex items-center justify-center gap-1 px-3 py-2 bg-slate-500 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-white font-semibold"
                        title="Edit Student"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
          <div>
            Showing{" "}
            <b>
              {firstStudentIndex + 1}-{Math.min(lastStudentIndex, students.length)}
            </b>{" "}
            of {students.length}
          </div>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="cursor-pointer px-3 py-1 rounded-md bg-slate-600 hover:bg-slate-700 text-white transition disabled:opacity-60"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`cursor-pointer px-3 py-1 rounded-md transition ${
                  currentPage === i + 1 ? "bg-[#349495] text-white" : "bg-slate-600 hover:bg-slate-700 text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="cursor-pointer px-3 py-1 rounded-md bg-slate-600 hover:bg-slate-700 text-white transition disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
        white
      </form>

      {/* Edit student Modal */}
      {showEditModal && editStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full p-6 text-center overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Edit <span className="text-[#349495]">Student</span>
            </h2>
            <div className="space-y-4">
              <h3 className="mb-1 text-left font-bold">First Name:</h3>
              <input
                type="text"
                value={editStudent.firstName}
                onChange={(e) => setEditStudent({ ...editStudent, firstName: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="First Name"
              />
              <h3 className="mb-1 text-left font-bold">Last Name:</h3>
              <input
                type="text"
                value={editStudent.lastName}
                onChange={(e) => setEditStudent({ ...editStudent, lastName: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Last Name"
              />
              <h3 className="mb-1 text-left font-bold">Age:</h3>
              <input
                type="number"
                value={editStudent.age}
                onChange={(e) => setEditStudent({ ...editStudent, age: Number(e.target.value) })}
                className="w-full p-2 border rounded"
                placeholder="Age"
              />
              <h3 className="mb-1 text-left font-bold">Grade:</h3>
              <input
                type="number"
                value={editStudent.grade}
                onChange={(e) => setEditStudent({ ...editStudent, grade: Number(e.target.value) })}
                className="w-full p-2 border rounded"
                placeholder="Grade"
              />
              <h3 className="mb-1 text-left font-bold">Institution:</h3>
              <input
                type="text"
                value={editStudent.institution}
                onChange={(e) => setEditStudent({ ...editStudent, institution: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Institution"
              />

              <div className="flex flex-col md:flex-row gap-4">
                {/* Guardian 1 */}
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="mb-1 text-left font-bold text-white">Guardian 1</h3>

                  <input
                    type="text"
                    value={editStudent.guardian1Name}
                    onChange={(e) => setEditStudent({ ...editStudent, guardian1Name: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Guardian 1 Name"
                  />

                  <input
                    type="text"
                    value={editStudent.guardian1Relationship}
                    onChange={(e) => setEditStudent({ ...editStudent, guardian1Relationship: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Guardian 1 Relationship"
                  />

                  <input
                    type="text"
                    value={editStudent.guardian1Phone}
                    onChange={(e) => setEditStudent({ ...editStudent, guardian1Phone: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Guardian 1 Phone"
                  />
                </div>

                {/* Guardian 2 */}
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="mb-1 text-left font-bold text-white">Guardian 2</h3>

                  <input
                    type="text"
                    value={editStudent.guardian2Name}
                    onChange={(e) => setEditStudent({ ...editStudent, guardian2Name: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Guardian 2 Name"
                  />

                  <input
                    type="text"
                    value={editStudent.guardian2Relationship}
                    onChange={(e) => setEditStudent({ ...editStudent, guardian2Relationship: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Guardian 2 Relationship"
                  />

                  <input
                    type="text"
                    value={editStudent.guardian2Phone}
                    onChange={(e) => setEditStudent({ ...editStudent, guardian2Phone: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Guardian 2 Phone"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditStudent(null);
                }}
                className="cursor-pointer px-4 py-2 bg-gray-500 rounded-md text-white"
              >
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="cursor-pointer px-4 py-2 bg-[#349495] rounded-md text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
            <h2 className="text-3xl font-semibold mb-4 text-white">Are you sure?</h2>
            <p className="mb-6 text-slate-300">Are you sure you want to delete this student? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirm}
                className="cursor-pointer px-5 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="cursor-pointer px-5 py-2 bg-slate-600 rounded-md hover:bg-slate-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducatorPortalForm;
