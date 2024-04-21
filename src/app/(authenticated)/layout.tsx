import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import logo from "@/resources/Images/logo.png";
import getCurrentUser from "@/resources/functions/getCurrentUser";
import Image from "next/image";
import LargeLeftSidebar from "./home/components/LargeLeftSidebar";
import MobileFooter from "./home/components/MobileFooter";
import UserDropdown from "./home/components/UserDropdown";


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();

    return (
        <main
            className="flex flex-col h-screen "
        >
            <nav
                className="flex justify-between items-center border-b-[1px] px-1"
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
                className="flex md:h-[calc(100vh-4rem)] flex-col h-full"
            >
                <ResizablePanelGroup
                    direction='horizontal'
                    className="flex-grow w-full"
                >
                    <ResizablePanel defaultSize={20} className="hidden md:block md:max-w-14 lg:max-w-52" >
                        <div className="w-full p-2 flex flex-col justify-center items-center gap-2">
                            <LargeLeftSidebar />
                        </div>
                    </ResizablePanel>
                    <ResizableHandle className="hidden md:flex" />
                    <ResizablePanel defaultSize={80}>
                        <div className="w-full">
                            {children}
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
                <MobileFooter />
            </div>
        </main>
    )
}

export default Layout