'use client';
import { FullConversationType } from "@/resources/types/conversation";
import ConversationList from "./ConversationList";
import { Users } from "@prisma/client";
import { usePathname } from "next/navigation";

interface LayoutMessageBoxProps {
    users: Users[] | undefined,
    conversations: FullConversationType[],
}

const LayoutMessageBox: React.FC<LayoutMessageBoxProps> = ({ users, conversations }) => {
    const path = usePathname();

    if (path === '/conversations') {
        return (
            <div className="w-80 h-full flex">
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
            </div>
        )
    }

    return (
        <>
        </>
    )
}

export default LayoutMessageBox