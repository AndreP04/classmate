"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import instance from "@/lib/axios";

const AddEducatorForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Modal
  const handleSuccess = () => {
    router.push("/portals/admin");
  };

  // Add educator endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await instance.post("/classmate/admin/register-educator", {
        //! check endpoint
        firstName,
        lastName,
        institution,
        email
      });

      // Show modal
      setShowSuccess(true);
    } catch (err: any) {
      console.error(`Failed to register educator: ${err}`);
      alert("Educator registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Educator Register Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-[#f5f5f6] rounded-2xl shadow space-y-4">
        {/* Logo Image */}
        <Link href="/">
          <Image className="mx-auto border rounded-lg cursor-pointer" src="/LoginLogo.PNG" alt="ClassMate Logo" width={900} height={200} />
        </Link>

        <h1 className="text-3xl font-bold text-center text-gray-700">Register an educator</h1>

        <input
          type="text"
          placeholder="First Name"
          className="w-full p-3 border rounded text-gray-700"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-3 border rounded text-gray-700"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Institution"
          className="w-full p-3 border rounded text-gray-700"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Email Address"
          className="w-full p-3 border rounded text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer">
          Register educator
        </button>
      </form>

      {/* Educator registration success modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-white">Educator registered successfully</h2>
            <p className="mb-6 text-slate-300">
              A new educator have been registered successfully. Please continue to the management portal.
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

export default AddEducatorForm;
