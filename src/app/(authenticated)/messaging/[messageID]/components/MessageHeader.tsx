'use client';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Trash from "@/resources/Icons/Trash";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { ChevronLeftIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';

const MessageHeader = () => {
    const router = useRouter();

    return (
        <div className='border-b h-14 flex justify-between items-center px-1 sm:px-2'>
            <div className='flex items-center'>
                <Button className='md:hidden w-6 h-6' size='icon' variant="ghost" onClick={() => router.push("/messaging")}>
                    <ChevronLeftIcon className="text-4xl w-5 h-5" />
                </Button>
                <Avatar className="">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="font-bold">MS</AvatarFallback>
                </Avatar>
                <div className="px-2 flex flex-col justify-center">
                    <p className="text-lg p-0 m-0 font-bold">Mayank Sharma</p>
                    <p className="text-sm p-0 m-0 text-gray-500">mayank.sharma@gmail.com</p>
                </div>
            </div>

            <div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size='icon'> <DotsHorizontalIcon className="" /> </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="text-center text-3xl font-bold">Mayank Sharma</SheetTitle>
                            <SheetDescription className="text-center text-gray-500">
                                mayank.sharma@gmail.com
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-2 items-center">
                            <Avatar className="my-5 h-36 w-36">
                                <AvatarImage src="/" alt="" />
                                <AvatarFallback className="h-36 w-36 text-4xl">MS</AvatarFallback>
                            </Avatar>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant='destructive'
                                        className="text-lg font-mono text-red-600 hover:text-white ring-1 px-1"
                                    >
                                        <Trash className="hover:stroke-white" /> <span className="hidden md:inline pl-2">Delete</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="font-mono border-background">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            conversation and remove your conversation data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="border-accent">Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600/95 hover:bg-red-600">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default MessageHeader