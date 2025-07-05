"use client";

import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // todo Connect educator login endpoint  
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded shadow space-y-4">
                <h2 className="text-2xl font-bold text-center">Log In</h2>

                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">
                    Log In
                </button>
            </form>
        </div>
    )
};

export default LoginForm;