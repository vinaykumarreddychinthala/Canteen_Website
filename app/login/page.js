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
    const [error, setError] = useState(""); // Add error state
    const router = useRouter(); // Get the router
    const handleSubmit = async (e) => {
        e.preventDefault();
        const redirectTo = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? "/admin" : "/";
            const result = await signIn("credentials", {
                email,
                password,
                callbackUrl:redirectTo,
            });
    
            if (result?.error) {
                setError(result.error);
                console.error("Login failed:", result.error);  // Use console.error for errors
            } else {
                // Login successful
                console.log("Login successful!");
            }
    

    };

    return (
        <div>
            <div className="flex justify-center items-center mx-auto my-10 border-2 p-10 border-lime-400 border-solid rounded w-[900px] h-[600px]">
                <div className="relative bg-cover bg-center flex flex-row"></div>
                <div className="border rounded border-lime-500 w-[350px] bg-slate-200 h-[460px]">
                    <form onSubmit={handleSubmit}>
                        <Image
                            className="ml-36 mt-3"
                            src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%230dbc26%22%20d%3D%22M11.5%2C8%20C12.3284271%2C8%2013%2C8.67157288%2013%2C9.5%20L13%2C10%20C13%2C11.9714437%2011.14049%2C14%208%2C14%20C4.85950997%2C14%203%2C11.9714437%203%2C10%20L3%2C9.5%20C3%2C8.67157288%203.67157288%2C8%204.5%2C8%20L11.5%2C8%20Z%20M8%2C1.5%20C9.51878306%2C1.5%2010.75%2C2.73121694%2010.75%2C4.25%20C10.75%2C5.76878306%209.51878306%2C7%208%2C7%20C6.48121694%2C7%205.25%2C5.76878306%205.25%2C4.25%20C5.25%2C2.73121694%206.48121694%2C1.5%208%2C1.5%20Z%22%20class%3D%22color212121%20svgShape%22%2F%3E%3C%2Fsvg%3E"
                            alt=""
                            width={60}
                            height={60}
                        />
                        <div className="ml-32 text-lime-600">
                            <span className={`${activeLink === "signup" ? "underline" : ""}`}>
                                <Link href="/signup">SignUp</Link>
                            </span>
                            <span>/</span>
                            <span className={`${activeLink === "login" ? "underline" : ""}`}>
                                <Link href="/login">Login</Link>
                            </span>
                        </div>
                        <div className="mt-5 ml-10">
                            <label htmlFor="email">email</label>
                            <br />
                            <input
                                className="w-[250px]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type="text"
                                id="email"
                            />
                        </div>
                        <div className="mt-5 ml-10">
                            <label htmlFor="password">Password</label>
                            <br />
                            <input
                                className="w-[250px]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                id="password"
                            />
                        </div>
                        {error && <p className="text-red-500 ml-10">{error}</p>} {/* Display error message */}
                        <button
                            type="submit"
                            className="bg-lime-500 rounded-xl w-[70px] h-[30px] ml-56 mt-7"
                        >
                            Login
                        </button>
                    </form>
                    <div className="my-4">OR</div>

                    {/* Social Logins */}
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="bg-red-500 text-white p-2 rounded w-64"
                    >
                        Sign in with Google
                    </button>

                </div>
            </div>
        </div>
    );
}