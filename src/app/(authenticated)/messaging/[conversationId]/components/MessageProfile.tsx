import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import useOtherUser from "@/resources/hooks/useOtherUser"
import { useConversation } from "@/resources/hooks/useRoutes"
import { Conversation, Users as USER } from "@prisma/client"
import { Cross1Icon, PersonIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { toast } from "sonner"

interface MessageProfileProprs {
    data: Conversation & {
        users: USER[]
    },
    statusText: string;
}

const MessageProfile: React.FC<MessageProfileProprs> = ({ data, statusText }) => {
    const otherUser = useOtherUser(data);
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser.username;
    }, [data.name, otherUser.username]);

    const onDelete = useCallback(() => {
        setIsDeleting(true);

        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                router.push('/user/chats/conversations');
                router.refresh();
            })
            .catch(() => toast.error("Something went wrong! \n Can't delete"))
            .finally(() => setIsDeleting(false))
    }, [conversationId, router])

    return (
        <div
            className="p-4 flex flex-col lg:flex-row"
        >
            <div
                className="flex flex-col flex-grow items-center justify-center"
            >
                <Avatar className="w-56 h-56">
                    <AvatarImage src={data.image || undefined} alt="" />
                    <AvatarFallback className="w-56 h-56"><PersonIcon className="w-36 h-36" /></AvatarFallback>
                </Avatar>
                <p
                    className="text-2xl font-semibold mt-4"
                >
                    {data.name || otherUser.username}
                </p>
                {
                    !data.isGroup && (
                        <p
                            className="text-xs text-gray-500"
                        >
                            {otherUser.username}
                        </p>
                    )
                }
                <p
                    className="text-sm text-gray-500 mb-4"
                >
                    {statusText}
                </p>
                {
                    false && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant='outline' className="flex gap-2 hover:bg-red-600">
                                    <Cross1Icon className="" />
                                    <p>Delete</p>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <p className="text-black dark:text-white text-lg">
                                        <Cross1Icon
                                            className='text-red-700 bg-red-100 p-1 rounded-full inline mr-3'
                                        />
                                        Delete Conversation
                                    </p>
                                </DialogHeader>
                                <div className="flex flex-col" >
                                    <div
                                        className="text-md text-center text-gray-500"
                                    >
                                        Are you sure you want to delete this conversation? This action cannot be undone.
                                    </div>
                                    <div
                                        className="flex gap-2 justify-end"
                                    >
                                        <Button
                                            variant="ghost"
                                            onClick={onDelete}
                                            disabled={isDeleting}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )
                }
            </div>
            <div
                className="flex flex-col flex-grow"
            >
                <div>
                    <p
                        className="text-gray-400 text-lg font-bold inline"
                    >
                        {(data.isGroup) ? 'Group chat started on : ' : 'Chat started on : '}
                    </p>
                    <p
                        className="text-black dark:text-white inline"
                    >
                        {joinedDate}
                    </p>
                </div>
                {
                    data.isGroup && (
                        <div>
                            <p className="text-gray-400 text-lg font-bold">Project Group Members</p>
                            <ScrollArea
                                className="w-full h-56 flex items-start flex-col gap-2"
                            >
                                {
                                    data.isGroup && data.users.map((user) => (
                                        <div key={user.id} className="flex gap-3 my-2">
                                            <Avatar>
                                                <AvatarImage src={user.image || undefined} alt="" />
                                                <AvatarFallback><PersonIcon className="" /></AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-base">{user.firstName}{' '}{user.lastName}</p>
                                                <p className="text-xs">{user.username}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ScrollArea>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default MessageProfile