import logo from "@/resources/Images/logo.png";
import getCurrentUser from "@/resources/actions/getCurrentUser";
import Image from "next/image";
import LargeLeftSidebar from "./components/LargeLeftSidebar";
import MobileFooter from "./components/MobileFooter";
import UserDropdown from "./components/UserDropdown";


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();

    return (
        <main
            className="p-1 flex flex-col h-[100vh]"
        >
            <nav
                className="flex justify-between items-center"
            >
                <div
                    className="w-56 h-16"
                >
                    <Image
                        src={logo}
                        alt="ConnectSphere"
                    />
                </div>
                <UserDropdown currentUser={currentUser} />
            </nav>
            <div
                className="flex h-auto flex-col flex-grow md:grid md:grid-cols-10 md:grid-rows-1"
            >
                <div
                    className="lg:col-span-2 md:col-span-1 ring-1"
                >
                    <div
                        className="p-2 md:flex flex-col items-center gap-2 hidden "
                    >
                        <LargeLeftSidebar />
                    </div>
                </div>
                <div className="h-full md:col-span-6 ring-1">
                    {children}
                </div>
                <div className="lg:col-span-2 md:col-span-3 ring-1 hidden md:block">
                    Right Side Bar
                </div>
            </div>
            <MobileFooter />
        </main>
    )
}

export default Layout