'use client';

import { useConversation } from "@/resources/hooks/useRoutes";
import { pusherClient } from "@/lib/pusher";
import { FullConversationType } from "@/resources/types/conversation";
import { Users } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ConversationBox from "./ConversationBox";
import { find } from 'lodash';



export default function ConversationList({ initialItems, users }: { initialItems: FullConversationType[], users: Users[] | undefined }) {
    const [items, setItems] = useState(initialItems);
    const session = useSession();
    const { conversationId, isOpen } = useConversation();
    const router = useRouter();
    const [isGroupLoading, setIsGroupLoading] = useState<boolean>(false);

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }

                return [conversation, ...current];
            });
        };

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }

                return currentConversation;
            }));
        }

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((con) => con.id !== conversation.id)]
            });

            if (conversationId === conversation.id) {
                router.push('/user/chats/conversations')
            }
        }

        pusherClient.subscribe(pusherKey);
        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', newHandler);
            pusherClient.unbind('conversation:update', updateHandler);
            pusherClient.unbind('conversation:remove', removeHandler);
        }
    }, [pusherKey, conversationId, router])

    const onGroupCreation = (onClose: () => void) => {
        setIsGroupLoading(true);

        axios.post('/api/conversations', {
            isGroup: true,
        })
            .then(() => {
                onClose();
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went Wrong \n Group not created')
            })
            .finally(() => {
                setIsGroupLoading(false);
            })
    }

    return (
        <aside
            className="pb-10 lg:p-0 px-3 lg:pb-0 lg:left-10 lg:w-96 lg:block overflow-y-auto border-r border-2 block w-full left-0"
        >
            <div
                className="px-1"
            >
                <div
                    className="flex-col"
                >
                    <div
                        className="text-4xl font-bold p-4 lg:p-2 flex flex-row justify-between"
                    >
                        <div>
                            Conversations
                        </div>
                    </div>
                    {
                        items.map((item) => (
                            <ConversationBox
                                key={item.id}
                                data={item}
                                selected={conversationId === item.id}
                            />
                        )
                        )
                    }
                </div>
            </div>
        </aside>
    )
}