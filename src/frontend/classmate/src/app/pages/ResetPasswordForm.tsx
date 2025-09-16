"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPW, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPW !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await instance.patch("/auth/reset-password", {
        email,
        newPassword: newPW
      });

      alert("Password reset successful! Please log in.");

      // Redirect to Login page
      router.push("/");
    } catch (err: any) {
      console.error(`Failed to reset password: ${err}`);
      alert("Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-[#f5f5f6] rounded-2xl shadow space-y-4">
        <h1 className="text-5xl font-bold text-center text-gray-700">
          Reset <span className="text-[#349495]">Password</span>
        </h1>

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
          placeholder="New Password"
          className="w-full p-3 border rounded text-gray-700"
          value={newPW}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-3 border rounded text-gray-700"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer">
          Reset Password
        </button>

        <Link href="/auth/login">
          <button className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer">
            Back to Log In
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
