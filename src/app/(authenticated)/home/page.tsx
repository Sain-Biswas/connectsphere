import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ScrollAreaThumb } from "@radix-ui/react-scroll-area"
import Post from "./components/Post"


const Page = async () => {

    return (
        <div className="h-full w-full">
            <ScrollArea className="flex flex-col md:h-[calc(100vh-4.35rem)] h-[calc(100vh-7.5rem)] w-full justify-center items-center p-2 pr-5 overflow-y-auto">
                <Post />
            </ScrollArea>
        </div>
    )
}

export default Page