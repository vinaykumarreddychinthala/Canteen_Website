"use client";

import Image from "next/image";
import Link from "next/link";
import fimage from "./images/pic1.jpg";
import simage from "./images/pic2.jpg";
import timage from './images/pic3.jpeg';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use next/navigation for App Router
import { useEffect } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // If status is not loading and there's no session, redirect
        if (status === "unauthenticated") {
            router.push("/login"); // Redirect to your login page
        }
    }, [status, router]); // Depend on status and router

    // Optional: Show a loading state while session is being checked
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    // Only render the protected content if authenticated
    if (status === "authenticated") {
      return (
            <div>
              <div className="main">
                <div className="font-medium tracking-wider text-2xl font-serif text-center mt-12 text-lime-900">Delivering Food, Service, and Experience, Backed by Industry-Leading Technology</div>
              </div> 
              <div className="flex flex-row">
                  <Image className="m-10 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.8)]" src={fimage} alt="picture2" width={430} height={350}/>
                  <Image className="m-10 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.8)]" src={simage} alt="picture3" width={430}  height={350}/>
                  <Image className="m-10 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.8)]" src={timage} alt="pic4" width={430} height={350} />
              </div>
              <div className="font-medium tracking-wider text-2xl font-serif text-center mt-1 text-lime-900">Discover the best food & drinks in our website</div>
              <Link href="/Menu">
              <button className='bg-lime-400 w-[170px] tracking-wider text-white rounded-xl h-[40px] ml-[700px]  mt-7 text-2xl'>Place Order</button>
              </Link>
              <br/><br/><br />
              <hr />
              
              <br />
            </div>
          );
    }

    // Fallback (or null) if not loading and not authenticated (though useEffect should redirect)
    return null;
}