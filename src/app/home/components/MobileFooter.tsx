'use client';
import { Button } from "@/components/ui/button";
import Community from "@/resources/Icons/Community";
import Home from "@/resources/Icons/Home";
import Messages from "@/resources/Icons/Messages";
import NewPlus from "@/resources/Icons/NewPlus";
import SavedSolid from "@/resources/Icons/SavedSolid";
import Settings from "@/resources/Icons/Settings";

const MobileFooter = () => {
    const btnClasses = 'hover:text-primary';
    return (
        <div className='h-12 w-full ring-1 flex justify-around md:hidden items-center text-primary'>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {

                }}
            >
                <Home className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {

                }}
            >
                <Community className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {

                }}
            >
                <SavedSolid className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {

                }}
            >
                <Messages className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {

                }}
            >
                <NewPlus className="h-8 w-8" />
            </Button>
            <Button
                variant='ghost'
                size='icon'
                className={btnClasses}
                onClick={() => {

                }}
            >
                <Settings className="h-8 w-8" />
            </Button>
        </div>
    )
}

export default MobileFooter
