'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";

const MessageFooter = () => {
    const [message, setMessage] = useState<string>('');

    function messageSendFunction() {
        console.log(message);

        setMessage('');
    }

    return (
        <div className="flex p-1 gap-2 border-t">
            <Input
                className=""
                value={message}
                placeholder="Message..."
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            />
            <Button
                disabled={(message === '') ? true : false}
                className="w-8 h-8"
                size='icon'
                onClick={messageSendFunction}
            >
                <PaperPlaneIcon className="-rotate-45 w-5 h-5" />
            </Button>
        </div>
    )
}

export default MessageFooter