"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [activeLink, setActiveLink] = useState("login");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const redirectTo = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? "/admin" : "/";
        const result = await signIn("credentials", {
            email,
            password,
            callbackUrl: redirectTo,
        });

        if (result?.error) {
            setError(result.error);
            console.error("Login failed:", result.error);
        } else {
            console.log("Login successful!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-2">
            <div className="w-full max-w-md md:max-w-2xl bg-white border-2 border-lime-400 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-stretch p-4 md:p-10 my-10">
                <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-lime-100 to-lime-300 rounded-l-xl">
                    {/* You can add an illustration or logo here */}
                    <Image
                        src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%230dbc26%22%20d%3D%22M11.5%2C8%20C12.3284271%2C8%2013%2C8.67157288%2013%2C9.5%20L13%2C10%20C13%2C11.9714437%2011.14049%2C14%208%2C14%20C4.85950997%2C14%203%2C11.9714437%203%2C10%20L3%2C9.5%20C3%2C8.67157288%203.67157288%2C8%204.5%2C8%20L11.5%2C8%20Z%20M8%2C1.5%20C9.51878306%2C1.5%2010.75%2C2.73121694%2010.75%2C4.25%20C10.75%2C5.76878306%209.51878306%2C7%208%2C7%20C6.48121694%2C7%205.25%2C5.76878306%205.25%2C4.25%20C5.25%2C2.73121694%206.48121694%2C1.5%208%2C1.5%20Z%22%20class%3D%22color212121%20svgShape%22%2F%3E%3C%2Fsvg%3E"
                        alt=""
                        width={80}
                        height={80}
                        className="mb-4"
                    />
                    <span className="text-lime-700 font-bold text-2xl">Welcome Back!</span>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center bg-slate-100 rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="flex justify-center md:hidden mb-4">
                            <Image
                                src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%230dbc26%22%20d%3D%22M11.5%2C8%20C12.3284271%2C8%2013%2C8.67157288%2013%2C9.5%20L13%2C10%20C13%2C11.9714437%2011.14049%2C14%208%2C14%20C4.85950997%2C14%203%2C11.9714437%203%2C10%20L3%2C9.5%20C3%2C8.67157288%203.67157288%2C8%204.5%2C8%20L11.5%2C8%20Z%20M8%2C1.5%20C9.51878306%2C1.5%2010.75%2C2.73121694%2010.75%2C4.25%20C10.75%2C5.76878306%209.51878306%2C7%208%2C7%20C6.48121694%2C7%205.25%2C5.76878306%205.25%2C4.25%20C5.25%2C2.73121694%206.48121694%2C1.5%208%2C1.5%20Z%22%20class%3D%22color212121%20svgShape%22%2F%3E%3C%2Fsvg%3E"
                                alt=""
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className="flex justify-center text-lime-600 mb-4 space-x-2">
                            <span className={`${activeLink === "signup" ? "underline" : ""}`}>
                                <Link href="/signup">SignUp</Link>
                            </span>
                            <span>/</span>
                            <span className={`${activeLink === "login" ? "underline" : ""}`}>
                                <Link href="/login">Login</Link>
                            </span>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                className="w-full px-3 py-2 border border-lime-400 rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type="text"
                                id="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                            <input
                                className="w-full px-3 py-2 border border-lime-400 rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <button
                            type="submit"
                            className="bg-lime-500 hover:bg-lime-600 rounded-xl w-full h-10 mt-2 text-white font-semibold transition"
                        >
                            Login
                        </button>
                    </form>
                    <div className="my-4 text-center text-gray-500">OR</div>
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded w-full font-semibold transition"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
