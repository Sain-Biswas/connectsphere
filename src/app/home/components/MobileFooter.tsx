'use client';
import { Button } from "@/components/ui/button";
import Community from "@/resources/Icons/Community";
import Home from "@/resources/Icons/Home";
import Messages from "@/resources/Icons/Messages";
import NewPlus from "@/resources/Icons/NewPlus";
import SavedSolid from "@/resources/Icons/SavedSolid";
import Settings from "@/resources/Icons/Settings";

const MobileFooter = () => {
    return (
        <div className='h-12 w-full ring-1 flex justify-around md:hidden items-center'>
            <Button
                variant='ghost'
                size='icon'
                className="dark:hover:bg-darkmode-300 dark:hover:text-white"
                onClick={() => {

                }}
            >
                <Home className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className="dark:hover:bg-darkmode-300 dark:hover:text-white"
                onClick={() => {

                }}
            >
                <Community className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className="dark:hover:bg-darkmode-300 dark:hover:text-white"
                onClick={() => {

                }}
            >
                <SavedSolid className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className="dark:hover:bg-darkmode-300 dark:hover:text-white"
                onClick={() => {

                }}
            >
                <Messages className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className="dark:hover:bg-darkmode-300 dark:hover:text-white"
                onClick={() => {

                }}
            >
                <NewPlus className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className="dark:hover:bg-darkmode-300 dark:hover:text-white"
                onClick={() => {

                }}
            >
                <Settings className="h-8 w-8" />
            </Button>
        </div>
    )
}

export default MobileFooter
