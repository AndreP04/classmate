"use client";
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import instance from '@/lib/axios';
import Link from 'next/link';

const AdminSignUpForm = () => {
    const router = useRouter();

    // TODO implement admin register endpoint
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [institution, setInstitution] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = async (e: React.FormEvent) => { // TODO implement admin registration endpoint
        // e.preventDefault();

        // try {
        //     await instance.post('/auth/login', {
        //         email,
        //         password
        //     });

        //     // Redirect to admin management page
        //     router.push('/portals/admin');


        // } catch (err: any) {
        //     alert('Incorrect email or password entered');
        // }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-[#f5f5f6] rounded-2xl shadow space-y-4">

                {/* Logo Image */}
                <Image
                    className="mx-auto border rounded-lg"
                    src="/LoginLogo.PNG"
                    alt="ClassMate Logo"
                    width={900}
                    height={200}
                />

                <h1 className="text-3xl font-bold text-center text-gray-700">Welcome to ClassMate</h1>

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
                        Already a member? Log In
                    </button>
                </Link>

            </form>
        </div>
    )
};

export default AdminSignUpForm;