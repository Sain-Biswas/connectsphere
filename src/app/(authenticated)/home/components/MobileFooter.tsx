'use client';
import { Button } from "@/components/ui/button";
import Community from "@/resources/Icons/Community";
import Home from "@/resources/Icons/Home";
import Messages from "@/resources/Icons/Messages";
import NewPlus from "@/resources/Icons/NewPlus";
import SavedSolid from "@/resources/Icons/SavedSolid";
import Settings from "@/resources/Icons/Settings";
import { useRouter } from "next/navigation";

const MobileFooter = () => {
    const router = useRouter();
    const btnClasses = 'hover:text-primary';
    return (
        <div className='h-12 w-full flex justify-around border-t-2 md:hidden items-center text-primary'>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {
                    router.push('/home');
                }}
            >
                <Home className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {
                    router.push('/community');
                }}
            >
                <Community className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {
                    router.push('/saved');
                }}
            >
                <SavedSolid className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {
                    router.push('/messaging');
                }}
            >
                <Messages className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {
                    router.push('/post');
                }}
            >
                <NewPlus className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {
                    router.push('/settings');
                }}
            >
                <Settings className="h-8 w-8" />
            </Button>
        </div>
    )
}

export default MobileFooter
