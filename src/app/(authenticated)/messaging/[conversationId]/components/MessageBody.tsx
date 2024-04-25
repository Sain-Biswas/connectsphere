'use client';

import { useConversation } from "@/resources/hooks/useRoutes";
import { pusherClient } from "@/lib/pusher";
import { FullMessageType } from "@/resources/types/conversation";
import axios from "axios";
import { find } from "lodash";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { ScrollArea } from "@/components/ui/scroll-area";


interface BodyProps {
    initialMessages: FullMessageType[]
}

const MessageBody: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView(false);

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`);

            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }

                return [...current, message];
            });

            bottomRef?.current?.scrollIntoView(true);
        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                };

                return currentMessage;
            }));
        };

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('message:update', updateMessageHandler)

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler)
            pusherClient.unbind('message:update', updateMessageHandler)
        }
    }, [conversationId])

    return (
        <ScrollArea
            ref={bottomRef}
            className="flex flex-1 flex-col h-[calc(82.7vh-3rem)]"
        >
            {
                messages.map((message, i) => (
                    <MessageBox
                        isLast={i === messages.length - 1}
                        key={message.id}
                        data={message}
                    />
                ))
            }
            <div ref={bottomRef} className="pt-10" />
        </ScrollArea>
    )
}

export default MessageBody