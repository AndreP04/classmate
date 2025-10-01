"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/lib/axios";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

const SignUpForm = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Modal
  const handleSuccess = () => {
    router.push("/auth/login");
  };

  // User register endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await instance.post("/classmate/register", {
        firstName,
        lastName,
        institution,
        email,
        password
      });

      // Show modal
      setShowSuccess(true);
    } catch (err: any) {
      console.error(`User registration failed: ${err}`);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Link href="/" className="absolute top-6 right-6 p-3 rounded-lg bg-[#f5f5f6] hover:bg-slate-700 transition">
        <HomeIcon className="w-6 h-6 text-[#349495]" />
      </Link>
      {/* Register Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-[#f5f5f6] rounded-2xl shadow space-y-4">
        <h1 className="text-5xl font-bold text-center text-gray-700">
          Welcome to <span className="text-[#349495]">ClassMate</span>
        </h1>

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
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded text-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer">
          Sign Up
        </button>

        <Link href="/auth/login">
          <button className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer">
            Already a member?
          </button>
        </Link>
      </form>

      {/* Registration Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-white">Welcome to ClassMate!</h2>
            <p className="mb-6 text-slate-300">You have been successfully registered. Please continue to the log in form.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSuccess}
                className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer"
              >
                Proceed to log in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
