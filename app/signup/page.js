"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUp() {
    const [activeLink, setActiveLink] = useState('signup');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const router = useRouter();
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, phonenumber }),
            });
            const data = await response.json();

            if (response.ok) {
                alert("Signup successful!");
                e.preventDefault();
                const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });
                console.log(result)
                console.log(email);
                if (result.error) {
                    console.log("Login failed:", result.error);
                    console.log("error bro")
                } else {
                    console.log("Login successful!");
                    router.push("/");
                }
                setusername("");
                setemail("");
                setpassword("");
                setphonenumber("");
            } else {
                alert(data.message || "Signup failed!");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Something went wrong!");
        }
    };
    return (
        <div>
            <div className="flex justify-center items-center mx-auto my-10 border-2 p-10 border-lime-400 border-solid rounded w-[900px] h-[600px] ">
                <div className="relative bg-cover bg-center flex flex-row">
                    {/*<Image className="opacity-25 ml-32 " src="https://i.pinimg.com/736x/aa/cf/f1/aacff1402ca1b9c72bf3022327710084.jpg" alt="" width={550} height={430}/>
                    <Image className="z-10 " src="https://i.pinimg.com/236x/43/6a/12/436a12647430d88a13e2106e35c8f0e4.jpg" alt="" width={500} height={500}/>*/}
                </div>
                <div className="border rounded border-lime-500 w-[350px] bg-slate-200 h-[460px]">
                    <form onSubmit={handlesubmit}>
                        <Image className="ml-36 mt-3" src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%230dbc26%22%20d%3D%22M11.5%2C8%20C12.3284271%2C8%2013%2C8.67157288%2013%2C9.5%20L13%2C10%20C13%2C11.9714437%2011.14049%2C14%208%2C14%20C4.85950997%2C14%203%2C11.9714437%203%2C10%20L3%2C9.5%20C3%2C8.67157288%203.67157288%2C8%204.5%2C8%20L11.5%2C8%20Z%20M8%2C1.5%20C9.51878306%2C1.5%2010.75%2C2.73121694%2010.75%2C4.25%20C10.75%2C5.76878306%209.51878306%2C7%208%2C7%20C6.48121694%2C7%205.25%2C5.76878306%205.25%2C4.25%20C5.25%2C2.73121694%206.48121694%2C1.5%208%2C1.5%20Z%22%20class%3D%22color212121%20svgShape%22%2F%3E%3C%2Fsvg%3E" alt="" width={60} height={60} />
                        <div className="ml-32 text-lime-600">
                            <span className={` ${activeLink === 'signup' ? 'underline' : ''}`}>SignUp</span>
                            <span>/</span>
                            <span className={` ${activeLink === 'login' ? 'underline' : ''}`}><Link onClick={() => setActiveLink('login')} href="/login">Login</Link></span>
                        </div>
                        <div className="mt-5 ml-10">
                            <label htmlFor="username">username</label><br />
                            <input className="w-[250px]" value={username} onChange={(e) => setusername(e.target.value)} required type="text" id="username" autoComplete="off" />
                        </div>
                        <div className="mt-5 ml-10">
                            <label htmlFor="email">email</label><br />
                            <input className="w-[250px]" value={email} onChange={(e) => setemail(e.target.value)} required type="email" id="email" />
                        </div>
                        <div className="mt-5 ml-10">
                            <label htmlFor="password">Password</label><br />
                            <input className="w-[250px]" value={password} onChange={(e) => setpassword(e.target.value)} required type="password" id="password" />
                        </div>
                        <div className="mt-5 ml-10">
                            <label htmlFor="phone">PhoneNumber</label><br />
                            <input className="w-[250px]" value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} required type="tel" id="phone" />
                        </div>
                        <button type="submit" className="bg-lime-500 rounded-xl w-[70px] h-[30px] ml-56 mt-7">SignUp</button>
                    </form>


                </div>
            </div>
        </div>
    )
}
