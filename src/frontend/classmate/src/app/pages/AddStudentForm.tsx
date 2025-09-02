"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import instance from "@/lib/axios";

const AddStudentForm = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [institution, setInstitution] = useState("");
  const [guardian1, setGuardian1] = useState({ name: "", phone: "", relationship: "" });
  const [guardian2, setGuardian2] = useState({ name: "", phone: "", relationship: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  // Modal
  const handleSuccess = () => {
    router.push("/portals/educator");
  };

  // Return to portal button
  const routeToPortal = () => {
    router.push("/portals/educator");
  };

  // Add student endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const guardians = [guardian1, guardian2];

    try {
      await instance.post("/classmate/educator/register-student", {
        firstName,
        lastName,
        age,
        grade,
        institution,
        guardians
      });

      // Show modal
      setShowSuccess(true);
    } catch (err: any) {
      console.error(`Failed to register student: ${err}`);
      alert("Student registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Student Register Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-[#f5f5f6] rounded-2xl shadow space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-700">Register a student</h1>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="p-3 border rounded text-gray-700"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="p-3 border rounded text-gray-700"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Age"
            className="p-3 border rounded text-gray-700"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Grade"
            className="p-3 border rounded text-gray-700"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Institution"
            className="col-span-2 p-3 border rounded text-gray-700"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
          />

          {/* Guardian 1 */}
          <input
            type="text"
            placeholder="Guardian 1 Name"
            className="p-3 border rounded text-gray-700"
            value={guardian1.name}
            onChange={(e) => setGuardian1({ ...guardian1, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Guardian 1 Phone"
            className="p-3 border rounded text-gray-700"
            value={guardian1.phone}
            onChange={(e) => setGuardian1({ ...guardian1, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Guardian 1 Relationship"
            className="col-span-2 p-3 border rounded text-gray-700"
            value={guardian1.relationship}
            onChange={(e) => setGuardian1({ ...guardian1, relationship: e.target.value })}
          />

          {/* Guardian 2 */}
          <input
            type="text"
            placeholder="Guardian 2 Name"
            className="p-3 border rounded text-gray-700"
            value={guardian2.name}
            onChange={(e) => setGuardian2({ ...guardian2, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Guardian 2 Phone"
            className="p-3 border rounded text-gray-700"
            value={guardian2.phone}
            onChange={(e) => setGuardian2({ ...guardian2, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Guardian 2 Relationship"
            className="col-span-2 p-3 border rounded text-gray-700"
            value={guardian2.relationship}
            onChange={(e) => setGuardian2({ ...guardian2, relationship: e.target.value })}
          />

          {/* Buttons */}
          <button
            type="submit"
            className="col-span-2 w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer"
          >
            Register student
          </button>

          <button
            onClick={routeToPortal}
            type="button"
            className="col-span-2 w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer"
          >
            Return to portal
          </button>
        </div>
      </form>

      {/* Student registration success modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-white">Student registered successfully</h2>
            <p className="mb-6 text-slate-300">
              A new student have been registered successfully. Please continue to the management portal.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSuccess}
                className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer"
              >
                Proceed to management portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudentForm;
