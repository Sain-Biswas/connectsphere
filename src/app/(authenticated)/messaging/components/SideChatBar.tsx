'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area";


const SideChatBar = () => {
    return (
        <div className="w-full flex justify-between flex-col gap-3">
            <div>
                <p className="text-3xl text-center">Conversations</p>
                <div className="px-1">
                    <Input className="" placeholder="Search..." />
                </div>
            </div>
            <ScrollArea className="h-[80vh] p-1 flex flex-col">
                <div className="flex h-16 p-1 border-[1px] rounded-lg border-gray-500 items-center gap-1 mb-1">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className="w-12 h-12">SA</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">Sain Biswas</p>
                        <div className="text-gray-500 text-sm flex">
                            <p className="w-3/4 overflow-hidden h-5 overflow-ellipsis">ladkck akj ladc laj vadjv mc asjc asj casj cvadjv adkj</p>
                            <p className="w-1/4">17:25</p>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default SideChatBar