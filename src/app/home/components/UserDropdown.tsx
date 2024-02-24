'use client';

import { ModeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users } from "@prisma/client";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";



const UserDropdown = (
    { currentUser }: { currentUser: Users | undefined }
) => {

    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push("/");
        }
    }, []);

    function logout() {
        signOut().then((res) => {
            toast.success('Logged out successfully', {
                description: 'Sending you to Login page'
            });
            router.push(`/`);
        }).catch((error) => {
            toast.error("Can't Logout right now", {
                description: 'Try again'
            });
        })
    }

    return (
        <div className="flex gap-1 md:gap-4 justify-center items-center md:pr-4 pr-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="hover:dark:bg-darkmode-200 p-1 hover:bg-lightmode-200 dark:text-white hover:dark:text-white h-14 flex items-center gap-1 focus-visible:ring-0">
                        <Avatar className="h-12 w-12 rounded-md">
                            <AvatarImage className="h-12 w-12 rounded-md" src={currentUser?.image || undefined} alt="" />
                            <AvatarFallback className="h-12 w-12 rounded-md text-white bg-primary dark:bg-darkmode-100">{currentUser?.firstName.charAt(0).toUpperCase()}{currentUser?.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="p">
                            <p className="hidden md:block font-mono text-lg">{currentUser?.firstName} {currentUser?.lastName}</p>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-darkmode-300">
                    <DropdownMenuLabel className="flex items-center gap-1 flex-col">
                        <Avatar className="h-20 w-20 rounded-md">
                            <AvatarImage className="h-20 w-20 rounded-md" src={currentUser?.image || undefined} alt="" />
                            <AvatarFallback className="h-20 w-20 text-3xl text-white rounded-md bg-primary">{currentUser?.firstName.charAt(0).toUpperCase()}{currentUser?.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <p className="font-mono dark:text-white text-xl font-extrabold">{currentUser?.firstName} {currentUser?.lastName}</p>
                        <p className="text-slate-500">{currentUser?.username}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="dark:text-white">
                            Profile
                            <DropdownMenuShortcut>
                                <PersonIcon />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="transition-colors focus:text-white focus:bg-red-600 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            onClick={logout}
                        >
                            Logout
                            <DropdownMenuShortcut>
                                <ExitIcon />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
        </div>
    )
}

export default UserDropdown