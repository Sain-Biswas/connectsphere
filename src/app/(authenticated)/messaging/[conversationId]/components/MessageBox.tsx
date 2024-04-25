'use client';
import { FullMessageType } from "@/resources/types/conversation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { PersonIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";


interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
    const session = useSession();
    const isOwn = session?.data?.user?.email === data?.sender?.username;
    const seenList = (data.seen || [])
        .filter((user) => user.username !== data?.sender?.username)
        .map((user) => user.firstName)
        .join(', ');


    const container = `flex gap-3 p-4 ${isOwn && 'justify-end'}`;
    const avatar = `${isOwn && 'order-2'}`;
    const body = `flex flex-col gap-2 ${isOwn && 'items-end'}`;
    const message = `text-sm w-fit overflow-hidden ${(isOwn && !data.image) ? 'bg-primary text-white' : 'bg-secondary'} ${data.image ? 'rounded-md bg-transparent p-0' : 'rounded-xl py-2 px-3'}`

    return (
        <div
            className={container}
        >
            <div
                className={avatar}
            >
                <Avatar className="">
                    <AvatarImage src={data.sender.image || undefined} alt="" />
                    <AvatarFallback className=""><PersonIcon className="" /></AvatarFallback>
                </Avatar>
            </div>
            <div
                className={body}
            >
                <div
                    className="flex items-center gap-1"
                >
                    <div
                        className="text-sm text-gray-500"
                    >
                        {data.sender.firstName}{' '}{data.sender.lastName}
                    </div>
                    <div
                        className="text-xs text-gray-400"
                    >
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div
                    className={message}
                >
                    {data.image ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="overflow-hidden rounded-md"
                                    variant='outline'
                                >
                                    {/* <Image
                                        src={data.image}
                                        alt="Can't load Image"
                                        fill
                                        className="h-36 z-0 max-w-80 overflow-hidden object-contain"
                                    /> */}
                                    Open Image
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="h-[90vh] max-w-[80vw]">
                                <Image
                                    src={data.image}
                                    layout="fill"
                                    alt="Can't load Image"
                                    className="object-contain"
                                />
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <div
                            className="h-fit"
                        >
                            {data.body}
                        </div>
                    )}
                </div>
                {
                    isLast && isOwn && (seenList.length > 0) && (
                        <div
                            className="text-gray-400 text-sm"
                        >
                            {`Seen by ${seenList}`}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MessageBox