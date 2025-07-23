"use client";
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import instance from '@/lib/axios';
import Link from 'next/link';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const { data } = await instance.post('/auth/login', {
                email,
                password
            });

            // Get user role
            const role = data.role;

            // Redirect based on user role
            if (role === 'admin') router.push('/portals/admin');
            if (role === 'educator') router.push('/portals/educator'); //! Fix


        } catch (err: any) {
            alert('Incorrect email or password entered');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-[#f5f5f6] rounded-2xl shadow space-y-4">

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

                <button type="submit" className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer">
                    Log In
                </button>

                <Link href="/auth/reset-password">
                    <button className="w-full bg-[#349495] text-white p-3 rounded hover:bg-[#287273] transition cursor-pointer">
                        Forgot password?
                    </button>
                </Link>

            </form>
        </div>
    )
};

export default LoginForm;