import { FullConversationType } from "@/resources/types/conversation";
import { Users } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";


const useOtherUser = (conversation: FullConversationType | { users: Users[] }) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email;

        const otherUser = conversation.users.filter((user) => user.username !== currentUserEmail);

        return otherUser[0];
    }, [session?.data?.user?.email, conversation.users]);

    return otherUser;
};

export default useOtherUser;