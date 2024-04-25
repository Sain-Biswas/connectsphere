'use client';
import { FullCommentType, FullPostType } from '@/resources/types/posts'
import React from 'react'
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
import axios, { AxiosError } from 'axios';
import { Comment } from '@prisma/client';

interface UniPostsProps {
    data: FullPostType[],
    userId: string | undefined
}

const UniPosts: React.FC<UniPostsProps> = ({ data, userId }) => {
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

    async function postCommentFunction(postId: string) {
        await axios.post('/api/comment', {
            text: comment,
            postId,
            commenterId: userId
        }).catch((error: AxiosError) => console.log(error))

        setComment('');
    }

    return (
        <div className='w-full m-auto p-3'>
            {
                data.map((post: FullPostType) => (
                    <Card key={post.id} className="max-w-[26rem] w-full m-auto font-mono mb-2">
                        <CardHeader className="flex flex-row flex-wrap justify-end p-3">
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
                                                            post.media.map((url, i) => (
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
                                            <CarouselPrevious className="translate-x-14 bg-transparent disabled:hidden" />
                                            <CarouselNext className="-translate-x-14 bg-transparent disabled:hidden" />
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
                                                post.media.map((url, i) => (
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
                                <CarouselPrevious className="translate-x-14 bg-transparent disabled:hidden" />
                                <CarouselNext className="-translate-x-14 bg-transparent disabled:hidden" />
                            </Carousel>

                            <div className="flex flex-row items-center">
                                <p className={`text-justify w-full ${(expand) ? '' : 'h-12 overflow-hidden'}`}>
                                    {post.description}
                                </p>
                                <Button onClick={() => setExpand(current => !current)} variant='outline' size='icon' className="w-9 ml-1">
                                    <CaretSortIcon className="w-9" />
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="p-2 grid grid-cols-3">
                            <Button variant='ghost'>
                                <HeartOutline className="" />
                                <span className="mx-1 sm:mx-2 text-sm sm:text-base hidden sm:inline">
                                    Like
                                </span>
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant='ghost'>
                                        <Messages className="" />
                                        <span className="mx-1 sm:mx-2 text-sm sm:text-base hidden sm:inline">Comments</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[600px] font-mono p-5">
                                    <DialogHeader className="">
                                        <DialogTitle className="text-2xl">Comments</DialogTitle>
                                    </DialogHeader>
                                    <ScrollArea className="max-h-[60vh] pr-6">
                                        {
                                            post.comments.map((comment: FullCommentType) => (
                                                <div key={comment.id} className={cn('my-2 flex gap-2 flex-row',
                                                    (userId === comment.commenter.id) && 'flex-row-reverse text-right',
                                                )}>
                                                    <Avatar className="w-12 h-12 rounded-md">
                                                        <AvatarImage src={comment.commenter.image || ""} alt="" />
                                                        <AvatarFallback className="h-12 w-12 rounded-md text-2xl bg-primary">{comment.commenter.firstName.charAt(0)}{comment.commenter.lastName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <p className="font-mono">{comment.commenter.firstName}{' '}{comment.commenter.lastName}</p>
                                                        <div className="text-left bg-accent m-1 rounded-md p-2">{comment.text}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </ScrollArea>
                                    <div className="flex gap-1 p-1">
                                        <Input placeholder="Write your comment here ..." value={comment} onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)} />
                                        <Button
                                            size='icon'
                                            variant='outline'
                                            onClick={() => postCommentFunction(post.id)}
                                        >
                                            <PaperPlaneIcon className="-rotate-45" />
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button variant='ghost' >
                                <SavedOutline className="" />
                                <span className="mx-1 sm:mx-2 text-sm sm:text-base hidden sm:inline">
                                    Save
                                </span>
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}

export default UniPosts