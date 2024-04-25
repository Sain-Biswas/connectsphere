import getConversations from "@/resources/functions/getConversations";
import ConversationList from "./components/ConversationList";
import LayoutMessageBox from "./components/LayoutMessageBox";
import getOtherUsers from "@/resources/functions/getOtherUsers";


export default async function LayOut({ children }: { children: React.ReactNode }) {
    const conversations = await getConversations();
    const users = await getOtherUsers()

    return (
        <>
            <div className="hidden w-full min-w-64 h-[calc(100vh-3rem)] lg:flex">
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
            <div className="w-full h-[calc(100vh-3rem)] flex lg:hidden">
                <LayoutMessageBox
                    users={users}
                    conversations={conversations}
                />
                {children}
            </div>
        </>
    )
}