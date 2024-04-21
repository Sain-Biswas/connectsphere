import getCurrentUser from "@/resources/functions/getCurrentUser";
import getOtherUsers from "@/resources/functions/getOtherUsers";
import RightSideBar from "./components/RightSideBar";


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();
    const users = await getOtherUsers();

    return (
        <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-3/5 w-full">
                {children}
            </div>
            <div className="hidden border-l-[1px] md:block w-2/5">
                <RightSideBar users={users} />
            </div>
        </div>
    )
}

export default Layout