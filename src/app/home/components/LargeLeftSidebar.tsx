'use client';
import { Button } from "@/components/ui/button";
import Community from "@/resources/Icons/Community";
import Home from "@/resources/Icons/Home";
import Messages from "@/resources/Icons/Messages";
import NewPlus from "@/resources/Icons/NewPlus";
import SavedSolid from "@/resources/Icons/SavedSolid";
import Settings from "@/resources/Icons/Settings";

const LargeLeftSidebar = () => {
    return (
        <>
            <Button
                onClick={() => {

                }}
                variant='ghost'
                className="h-10 flex justify-center md:w-10 lg:w-full dark:hover:text-white dark:hover:bg-darkmode-200"
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <Home className="h-8 w-8" />
                    <p className="hidden lg:block ml-5 text-xl font-mono font-bold">Home</p>
                </div>
            </Button>
            <Button
                onClick={() => {

                }}
                variant='ghost'
                className="h-10 flex justify-center md:w-10 lg:w-full dark:hover:text-white dark:hover:bg-darkmode-200"
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <Community className="h-8 w-8" />
                    <p className="hidden lg:block ml-5 text-xl font-mono font-bold">Community</p>
                </div>
            </Button>
            <Button
                onClick={() => {

                }}
                variant='ghost'
                className="h-10 flex justify-center md:w-10 lg:w-full dark:hover:text-white dark:hover:bg-darkmode-200"
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <SavedSolid className="h-8 w-8" />
                    <p className="hidden lg:block ml-5 text-xl font-mono font-bold">Saved</p>
                </div>
            </Button>
            <Button
                onClick={() => {

                }}
                variant='ghost'
                className="h-10 flex justify-center md:w-10 lg:w-full dark:hover:text-white dark:hover:bg-darkmode-200"
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <Messages className="h-8 w-8" />
                    <p className="hidden lg:block ml-5 text-xl font-mono font-bold">Messages</p>
                </div>
            </Button>
            <Button
                onClick={() => {

                }}
                variant='ghost'
                className="h-10 flex justify-center md:w-10 lg:w-full dark:hover:text-white dark:hover:bg-darkmode-200"
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <NewPlus className="h-8 w-8" />
                    <p className="hidden lg:block ml-5 text-xl font-mono font-bold">New Post</p>
                </div>
            </Button>
            <Button
                onClick={() => {

                }}
                variant='ghost'
                className="h-10 flex justify-center md:w-10 lg:w-full dark:hover:text-white dark:hover:bg-darkmode-200"
            >
                <div className="flex w-[9.4rem] justify-start ">
                    <Settings className="h-8 w-8" />
                    <p className="hidden lg:block ml-5 text-xl font-mono font-bold">Settings</p>
                </div>
            </Button>
        </>
    )
}

export default LargeLeftSidebar