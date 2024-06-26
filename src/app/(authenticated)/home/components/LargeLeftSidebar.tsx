'use client';
import { Button } from "@/components/ui/button";
import Community from "@/resources/Icons/Community";
import Home from "@/resources/Icons/Home";
import Messages from "@/resources/Icons/Messages";
import NewPlus from "@/resources/Icons/NewPlus";
import SavedSolid from "@/resources/Icons/SavedSolid";
import Settings from "@/resources/Icons/Settings";
import { useRouter } from "next/navigation";

const LargeLeftSidebar = () => {
    const router = useRouter();
    const defClasses = "ml-5 hidden lg:block text-xl font-mono font-bold"
    const btnClasses = 'text-primary h-10 flex justify-center md:w-10 lg:w-full hover:text-primary';
    return (
        <>
            <Button
                onClick={() => {
                    router.push('/home');
                }}
                variant='ghost'
                className={btnClasses}
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <Home className="h-8 w-8" />
                    <p className={defClasses}>Home</p>
                </div>
            </Button>
            <Button
                onClick={() => {
                    router.push('/friends');
                }}
                variant='ghost'
                className={btnClasses}
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <Community className="h-8 w-8" />
                    <p className={defClasses}>Friends</p>
                </div>
            </Button>
            <Button
                onClick={() => {
                    router.push('/saved');
                }}
                variant='ghost'
                className={btnClasses}
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <SavedSolid className="h-8 w-8" />
                    <p className={defClasses}>Saved</p>
                </div>
            </Button>
            <Button
                onClick={() => {
                    router.push('/messaging');
                }}
                variant='ghost'
                className={btnClasses}
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <Messages className="h-8 w-8" />
                    <p className={defClasses}>Messages</p>
                </div>
            </Button>
            <Button
                onClick={() => {
                    router.push('/post');
                }}
                variant='ghost'
                className={btnClasses}
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <NewPlus className="h-8 w-8" />
                    <p className={defClasses}>New Post</p>
                </div>
            </Button>
        </>
    )
}

export default LargeLeftSidebar