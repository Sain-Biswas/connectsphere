'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessageBody = () => {
    return (
        <ScrollArea className="h-[calc(100vh-13rem)] md:h-[calc(100vh-10.05rem)] p-2 flex flex-col gap-2 font-mono">
            <div className="py-1 flex gap-2">
                <Avatar className="">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="font-bold">MS</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">Mayank Sharma</p>
                    <p className="p-3 rounded-lg bg-primary text-white max-w-96">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore laudantium earum aut fuga neque. Cum corporis repellendus at, asperiores quos officiis est neque similique magni optio facere rerum perferendis praesentium!</p>
                </div>
            </div>
            <div className="flex justify-end">
                <p className="p-3 bg-muted rounded-lg max-w-96">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt maiores molestiae, quia aut temporibus alias sunt, harum dignissimos incidunt ab debitis! Ea at hic neque officiis officia commodi! Sint molestiae natus ipsam laborum, numquam perferendis doloribus voluptatem sequi a? Ex.</p>
            </div>
        </ScrollArea>
    )
}

export default MessageBody