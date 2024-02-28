'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ContextMenu, ContextMenuContent } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import HeartOutline from "@/resources/Icons/HeartOutline";
import Messages from "@/resources/Icons/Messages";
import SavedOutline from "@/resources/Icons/SavedOutline";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";
import { CaretSortIcon, DotsHorizontalIcon, PaperPlaneIcon, PersonIcon, Share1Icon, SizeIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

const dummyImages: string[] = [
    'https://r4.wallpaperflare.com/wallpaper/284/226/389/genshin-impact-anime-boys-zhongli-genshin-impact-xiao-genshin-impact-hd-wallpaper-1cffb2b9378312048cc75fc4c06f0779.jpg',
    'https://r4.wallpaperflare.com/wallpaper/585/921/170/genshin-impact-xiao-genshin-impact-lumine-genshin-impact-paimon-zhongli-genshin-impact-hd-wallpaper-df8b15986b9b17fc9b3ce0af22a77566.jpg',
    'https://r4.wallpaperflare.com/wallpaper/408/404/34/genshin-impact-anime-boys-xiao-genshin-impact-hd-wallpaper-dbb6bcbd73417fe985b45b09ed6c1c90.jpg',
    'https://r4.wallpaperflare.com/wallpaper/902/354/483/anime-girls-genshin-impact-ningguang-genshin-impact-chinese-dress-cheongsam-hd-wallpaper-727eb2a51218fd5503a04913cdfdaba3.jpg',
    'https://r4.wallpaperflare.com/wallpaper/366/543/668/genshin-impact-focalors-genshin-impact-furina-genshin-impact-hd-wallpaper-57f7fd4768088072401efec7c8e3f749.jpg'
];

const Post = () => {
    const [comment, setComment] = useState<string>('');
    const [expand, setExpand] = useState<boolean>(false);

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    function postCommentFunction() {
        console.log(comment)

        setComment('');
    }

    return (
        <Card className="max-w-[38rem] w-full m-auto font-mono mb-2">
            <CardHeader className="flex flex-row flex-wrap justify-between p-3">
                <div className="flex gap-2">
                    <Avatar className="h-10 md:h-14 w-10 md:w-14 block">
                        <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <AvatarFallback className="bg-primary text-3xl">SB</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-around">
                        <CardTitle className="text-sm sm:text-base ">Jaideep Singh Kumar</CardTitle>
                        <CardDescription className="text-sm sm:text-base hidden sm:block ">jaideep.sihgh.kumar145@gmail.com</CardDescription>
                    </div>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='ghost' size='icon'>
                                <SizeIcon className="" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="p-0 max-w-[96vw]">
                            <Carousel setApi={setApi} className="p-2 max-w-[95vw]">
                                <ContextMenu>
                                    <ContextMenuTrigger asChild>
                                        <CarouselContent>
                                            {
                                                dummyImages.map((url, i) => (
                                                    <CarouselItem className="flex items-center" key={i}>
                                                        <Image src={url} alt="" width={2000} height={2000} className="max-h-[90vh] m-auto object-contain" />
                                                    </CarouselItem>
                                                ))
                                            }
                                        </CarouselContent>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="ring-0 bg-transparent border-none">

                                    </ContextMenuContent>
                                </ContextMenu>
                                <CarouselPrevious className="translate-x-14 bg-transparent" />
                                <CarouselNext className="-translate-x-14 bg-transparent" />
                            </Carousel>
                            {
                                (count !== 1) && (
                                    <Badge className="absolute top-5 left-5 font-mono">Photo {current}/{count}</Badge>
                                )
                            }
                        </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon'>
                                <DotsHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="font-mono w-48">
                            <DropdownMenuItem className="text-sm">
                                See Profile
                                <DropdownMenuShortcut>
                                    <PersonIcon className="" />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sm">
                                Share
                                <DropdownMenuShortcut>
                                    <Share1Icon className="" />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sm">
                                Send
                                <DropdownMenuShortcut>
                                    <PaperPlaneIcon className="-rotate-45" />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="">
                <Carousel className="">
                    <ContextMenu>
                        <ContextMenuTrigger asChild>
                            <CarouselContent>
                                {
                                    dummyImages.map((url, i) => (
                                        <CarouselItem className="flex items-center" key={i}>
                                            <Image src={url} alt="" width={2000} height={2000} className="max-h-[32rem] m-auto object-contain" />
                                        </CarouselItem>
                                    ))
                                }
                            </CarouselContent>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="ring-0 bg-transparent border-none">

                        </ContextMenuContent>
                    </ContextMenu>
                    <CarouselPrevious className="translate-x-14 bg-transparent" />
                    <CarouselNext className="-translate-x-14 bg-transparent" />
                </Carousel>

                <div className="flex flex-row items-center">
                    <p className={`text-justify ${(expand) ? '' : 'h-12 overflow-hidden'}`}>
                        kchkw weihcewoihc ieoiwecoewih iqehfoiweho oqwiehowei iehfoweihewo owiehoweifh iowqehfowiefn iowehfowein wioqehfoweihfwoeifhweoih wiehfowei woiehfowiehf
                    </p>
                    {
                        !expand && <p>...</p>
                    }
                    <Button onClick={() => setExpand(current => !current)} variant='outline' size='icon' className="w-9 ml-1">
                        <CaretSortIcon className="w-9" />
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="p-2 grid grid-cols-3">
                <Button variant='ghost'>
                    <HeartOutline className="" />
                    <span className="mx-1 sm:mx-2 text-sm sm:text-base">
                        Like
                    </span>
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='ghost'>
                            <Messages className="" />
                            <span className="mx-1 sm:mx-2 text-sm sm:text-base">Comments</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[600px] font-mono p-5">
                        <DialogHeader className="">
                            <DialogTitle className="text-2xl">Comments</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-[60vh] pr-6">
                            <div className={cn('my-2 flex gap-2 flex-row',
                                (false) && 'flex-row-reverse text-right',
                            )}>
                                <Avatar className="w-12 h-12 rounded-md">
                                    <AvatarImage src="https://plus.unsplash.com/premium_photo-1708110921253-7eed6d2ecb78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    <AvatarFallback className="h-12 w-12 rounded-md text-2xl bg-primary">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="font-mono"> Mayank sharma </p>
                                    <div className="text-left bg-accent m-1 rounded-md p-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam porro ad accusamus et repellat possimus, pariatur dolor repellendus atque facere quaerat fugit ex, aut magnam! </div>
                                </div>
                            </div>
                            <div className={cn('my-2 flex gap-2 flex-row',
                                (true) && 'flex-row-reverse text-right',
                            )}>
                                <Avatar className="w-12 h-12 rounded-md">
                                    <AvatarImage src="https://images.unsplash.com/photo-1583604898860-306cd52731d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="" />
                                    <AvatarFallback className="h-12 w-12 rounded-md text-2xl bg-primary">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="font-mono"> Mayank sharma </p>
                                    <div className="text-left bg-accent m-1 rounded-md p-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam porro ad accusamus et repellat possimus, pariatur dolor repellendus atque facere quaerat fugit ex, aut magnam! </div>
                                </div>
                            </div>
                            <div className={cn('my-2 flex gap-2 flex-row',
                                (false) && 'flex-row-reverse text-right',
                            )}>
                                <Avatar className="w-12 h-12 rounded-md">
                                    <AvatarImage src="https://plus.unsplash.com/premium_photo-1708110921253-7eed6d2ecb78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    <AvatarFallback className="h-12 w-12 rounded-md text-2xl bg-primary">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="font-mono"> Mayank sharma </p>
                                    <div className="text-left bg-accent m-1 rounded-md p-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam porro ad accusamus et repellat possimus, pariatur dolor repellendus atque facere quaerat fugit ex, aut magnam! </div>
                                </div>
                            </div>
                            <div className={cn('my-2 flex gap-2 flex-row',
                                (true) && 'flex-row-reverse text-right',
                            )}>
                                <Avatar className="w-12 h-12 rounded-md">
                                    <AvatarImage src="https://images.unsplash.com/photo-1583604898860-306cd52731d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="" />
                                    <AvatarFallback className="h-12 w-12 rounded-md text-2xl bg-primary">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="font-mono"> Mayank sharma </p>
                                    <div className="text-left bg-accent m-1 rounded-md p-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam porro ad accusamus et repellat possimus, pariatur dolor repellendus atque facere quaerat fugit ex, aut magnam! </div>
                                </div>
                            </div>
                        </ScrollArea>
                        <div className="flex gap-1 p-1">
                            <Input placeholder="Write your comment here ..." value={comment} onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)} />
                            <Button
                                size='icon'
                                variant='outline'
                                onClick={postCommentFunction}
                            >
                                <PaperPlaneIcon className="-rotate-45" />
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <Button variant='ghost' >
                    <SavedOutline className="" />
                    <span className="mx-1 sm:mx-2 text-sm sm:text-base">
                        Save
                    </span>
                </Button>
            </CardFooter>
        </Card>
    )
}


export default Post