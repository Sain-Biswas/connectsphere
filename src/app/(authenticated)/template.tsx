'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (session?.status === 'unauthenticated') {
            router.push('/');
        }
    });
    return (
        <div>
            {children}
        </div>
    )
}

export default Template