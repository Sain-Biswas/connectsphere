import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokensIcon } from "@radix-ui/react-icons";
import FriendCard from "./components/FriendCard";
import getUserPosts from "@/resources/functions/getUserPosts";
import UniPosts from "./components/UniPosts";
import getCurrentUser from "@/resources/functions/getCurrentUser";


export default async function Page() {
    const posts = await getUserPosts();
    const currentUser = await getCurrentUser();

    return (
        <ScrollArea className="md:h-[calc(100vh-4.35rem)] h-[calc(100vh-7.5rem)] px-2 pt-1">
            <div className="flex flex-col md:flex-row" >
                <div className="w-full md:h-full md:p-4 md:w-1/2">
                    <div className="flex flex-col justify-center items-center gap-1 md:gap-2">
                        <Avatar className="w-56 h-56 rounded-md flex justify-center overflow-hidden">
                            <AvatarImage src={currentUser?.image || undefined} alt="" />
                            <AvatarFallback className="h-56 w-56 rounded-md text-7xl font-mono">{currentUser?.firstName.charAt(0)}{currentUser?.lastName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex justify-center items-center flex-col gap-1 md:gap-2">
                            <p className="text-2xl md:text-4xl font-mono">{currentUser?.firstName}{' '}{currentUser?.lastName}</p>
                            <p className="text-slate-500 text-lg md:text-xl font-mono">{currentUser?.username}</p>
                            <div className="grid grid-cols-2 w-80">
                                <div className="flex items-center flex-col">
                                    <p className="text-base font-mono">250048</p>
                                    <p className="text-xl font-bold font-mono">Posts</p>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex items-center flex-col">
                                            <p className="text-base cursor-pointer font-mono">250048</p>
                                            <p className="text-xl cursor-pointer font-bold font-mono">Friends</p>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="rounded-md h-[70vh] max-w-[95vw] p-4">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl md:text-4xl font-mono text-left">Friends</DialogTitle>
                                        </DialogHeader>
                                        <ScrollArea className="h-[55vh] pr-3">

                                            <div className="p-2 flex justify-between items-center rounded-lg bg-accent mb-2">
                                                <div className="flex gap-2">
                                                    <Avatar className="w-16 h-16 rounded-md flex justify-center overflow-hidden">
                                                        <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                                        <AvatarFallback className="h-16 w-16 rounded-md text-7xl font-mono">JD</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex justify-center font-mono flex-col">
                                                        <p className="text-base">Mayank Sharma Pantt</p>
                                                        <p className="text-sm">mayanksharmarrk@gmail.com</p>
                                                    </div>
                                                </div>
                                                <FriendCard />
                                            </div>

                                        </ScrollArea>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <p className="text-md text-justify">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni quas, in natus quis ea dicta perspiciatis laudantium laboriosam asperiores expedita nostrum iste facere dolores sapiente ipsa provident est earum, excepturi deserunt. Laborum nemo beatae perferendis, accusantium iusto, repellendus odit, reprehenderit eius tempore nulla illo enim? Laudantium ab facere non sed!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:h-full md:w-1/2">
                    <Tabs defaultValue="uniposts" className="font-mono font-extrabold">
                        <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="media" className="px-0">
                                <TokensIcon className="mr-2 md:hidden lg:block" />
                                <span className="hidden sm:inline p-0 m-0">Media Posts</span>
                            </TabsTrigger>
                            <TabsTrigger value="uniposts" className="px-0">
                                <TokensIcon className="mr-2 md:hidden lg:block" />
                                <span className="hidden sm:inline p-0 m-0">All Posts</span>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="media" className="h-[calc(100vh-10.6rem)]">

                        </TabsContent>
                        <TabsContent value="uniposts" className="h-[calc(100vh-10.6rem)]">
                            <ScrollArea className="h-[calc(100vh-7.5rem)]">
                                <UniPosts data={posts} userId={currentUser?.id} />
                                <ScrollBar className="w-0" />
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div >
        </ScrollArea>
    );
};

const images = [
    'https://r4.wallpaperflare.com/wallpaper/284/226/389/genshin-impact-anime-boys-zhongli-genshin-impact-xiao-genshin-impact-hd-wallpaper-1cffb2b9378312048cc75fc4c06f0779.jpg',
    'https://r4.wallpaperflare.com/wallpaper/585/921/170/genshin-impact-xiao-genshin-impact-lumine-genshin-impact-paimon-zhongli-genshin-impact-hd-wallpaper-df8b15986b9b17fc9b3ce0af22a77566.jpg',
    'https://r4.wallpaperflare.com/wallpaper/408/404/34/genshin-impact-anime-boys-xiao-genshin-impact-hd-wallpaper-dbb6bcbd73417fe985b45b09ed6c1c90.jpg',
    'https://r4.wallpaperflare.com/wallpaper/902/354/483/anime-girls-genshin-impact-ningguang-genshin-impact-chinese-dress-cheongsam-hd-wallpaper-727eb2a51218fd5503a04913cdfdaba3.jpg',
    'https://r4.wallpaperflare.com/wallpaper/366/543/668/genshin-impact-focalors-genshin-impact-furina-genshin-impact-hd-wallpaper-57f7fd4768088072401efec7c8e3f749.jpg',
]
