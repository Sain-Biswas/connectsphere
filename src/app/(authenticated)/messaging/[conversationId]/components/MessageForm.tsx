'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConversation } from "@/resources/hooks/useRoutes";
import { Link2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { ChangeEvent, useState } from "react";

const MessageForm = () => {
    const [message, setMessage] = useState<string>('');
    const { conversationId } = useConversation();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        axios.post('/api/messages', {
            conversationId,
            message
        })

        setMessage('');
    }

    const handleImageUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div
            className="p-2 lg:p-[0.6rem] border-t flex items-center gap-2 lg:gap-4 w-full"
        >
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onSuccess={handleImageUpload}
                uploadPreset="gwzesufu"
            >
                <Link2Icon className="text-sky-500 w-6 h-6" />
            </CldUploadButton>
            <form onSubmit={handleSubmit} className="flex flex-grow gap-2">
                <Input
                    className=""
                    value={message}
                    placeholder="Message..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                />
                <Button
                    disabled={(message === '') ? true : false}
                    className="w-10 h-9"
                    size='icon'
                    onClick={handleSubmit}
                >
                    <PaperPlaneIcon className="-rotate-45 w-5 h-5" />
                </Button>
            </form>
        </div>
    )
}

export default MessageForm;