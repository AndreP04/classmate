"use client";
import Image from 'next/image'
import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // todo Connect educator login endpoint  
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded shadow space-y-4">

                {/* Logo Image */}
                <Image
                    className="mx-auto border rounded-lg"
                    src="/LoginLogo.PNG"
                    alt="Log In Image"
                    width={900}
                    height={200}
                />

                <h1 className="text-3xl font-bold text-center text-gray-700">Welcome to ClassMate</h1>

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

                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-800 transition">
                    Log In
                </button>

                <a className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-800 transition"  href="/auth/reset-password">
                    Forgot password?
                </a>

            </form>
        </div>
    )
};

export default LoginForm;