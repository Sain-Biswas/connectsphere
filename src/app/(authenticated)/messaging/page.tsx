import getConversations from "@/resources/functions/getConversations";
import getOtherUsers from "@/resources/functions/getOtherUsers";
import EmptyState from "./components/EmptyState";


export default async function Home() {
    const conversations = await getConversations();
    const users = await getOtherUsers();

    return (
        <div className="w-full hidden lg:block">
            <EmptyState />
        </div>
    )
}