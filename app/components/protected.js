"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicPaths = ["/login", "/signup"];

export default function Protected({ children }) {
    const { status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const isPublic = publicPaths.includes(pathname);

    useEffect(() => {
        if (!isPublic && status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router, isPublic]);

    if (isPublic) {
        return children;
    }

    if (status === "loading") return <p>Loading...</p>;

    if (status === "authenticated") return children;

    return null;
}
