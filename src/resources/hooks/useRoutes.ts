import { signOut } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { PersonIcon, ChatBubbleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";



const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(() => {
        if (!params?.conversationId) {
            return '';
        }

        return params.conversationId as string;
    }, [params?.conversationId]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]);

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId]);
};

const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/user/chats/conversations',
            Icon: ChatBubbleIcon,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/user/chats',
            Icon: PersonIcon,
            active: pathname === '/user/chats'
        }
    ], [pathname, conversationId]);

    return routes;
}

export { useConversation, useRoutes };


