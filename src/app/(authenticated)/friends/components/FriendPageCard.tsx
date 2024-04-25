'use client';
import { AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from '@prisma/client'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

interface FriendPageCardProps {
    data: Users,
    action: 'remove' | 'add' | 'accept' | 'cancel',
    userId: string | undefined,
    user: Users | undefined
}

const FriendPageCard: React.FC<FriendPageCardProps> = ({ data, action, userId, user }) => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const router = useRouter();

    const conversationId = data.conversationIds.filter((d) => { user?.conversationIds.includes(d) });

    async function addFriend() {
        setIsUpdating(true);
        await axios.post('/api/friend/add', { userId, profileId: data.id })
            .then(() => toast.success("Friend request sent."))
            .catch(() => toast.error("Something went wrong."))
            .finally(() => setIsUpdating(false));
        router.refresh();
    }

    async function acceptFriend() {
        setIsUpdating(true);
        await axios.post('/api/friend/accept', { userId, profileId: data.id })
            .then(() => toast.success("Friend request accepted."))
            .catch(() => toast.error("Something went wrong."))
            .finally(() => setIsUpdating(false));
        await axios.post('/api/conversations', {
            userId: data.id,
            isGroup: false
        });
        router.refresh();
    }

    async function cancelFriend() {
        setIsUpdating(true);
        await axios.post('/api/friend/cancel', { userId, profileId: data.id })
            .then(() => toast.success("Friend request canceled."))
            .catch(() => toast.error("Something went wrong."))
            .finally(() => setIsUpdating(false));
        router.refresh();
    }

    async function removeFriend() {
        setIsUpdating(true);
        await axios.post('/api/friend/remove', { userId, profileId: data.id })
            .then(() => toast.success("Friend removed."))
            .catch(() => toast.error("Something went wrong."))
            .finally(() => setIsUpdating(false));
        await axios.delete(`/api/conversations/${conversationId[0]}`);
        router.refresh();
    }

    if (action === 'remove') {
        return (
            <Card className='w-56'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>{data.firstName}{' '}{data.lastName}</CardTitle>
                    <CardDescription>{data.username}</CardDescription>
                </CardHeader>
                <CardContent className=''>
                    <Avatar className='w-40 h-40'>
                        <AvatarImage src={data.image || ''} alt='' />
                        <AvatarFallback className='w-40 text-6xl h-40'>{data.firstName.charAt(0)}{data.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </CardContent>
                <CardFooter className='flex-col gap-2'>
                    <Button onClick={() => router.push(`/profile/${data.id}`)} variant='outline'>View Profile</Button>
                    <Button onClick={removeFriend} disabled={isUpdating}>
                        {
                            (isUpdating) && (<div className='h-4 mx-3 w-4 border-white border-0 rounded-full border-t-2 animate-spin '></div>)
                        }
                        Remove Friend
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    if (action === 'accept') {
        return (
            <Card className='w-56'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>{data.firstName}{' '}{data.lastName}</CardTitle>
                    <CardDescription>{data.username}</CardDescription>
                </CardHeader>
                <CardContent className=''>
                    <Avatar className='w-40 h-40'>
                        <AvatarImage src={data.image || ''} alt='' />
                        <AvatarFallback className='w-40 text-6xl h-40'>{data.firstName.charAt(0)}{data.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </CardContent>
                <CardFooter className='flex-col gap-2'>
                    <Button onClick={() => router.push(`/profile/${data.id}`)} variant='outline'>View Profile</Button>
                    <Button onClick={acceptFriend} disabled={isUpdating}>
                        {
                            (isUpdating) && (<div className='h-4 mx-3 w-4 border-white border-0 rounded-full border-t-2 animate-spin '></div>)
                        }
                        Accept Friend Request
                    </Button>
                </CardFooter>
            </Card>
        )
    }
    if (action === 'cancel') {
        return (
            <Card className='w-56'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>{data.firstName}{' '}{data.lastName}</CardTitle>
                    <CardDescription>{data.username}</CardDescription>
                </CardHeader>
                <CardContent className=''>
                    <Avatar className='w-40 h-40'>
                        <AvatarImage src={data.image || ''} alt='' />
                        <AvatarFallback className='w-40 text-6xl h-40'>{data.firstName.charAt(0)}{data.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </CardContent>
                <CardFooter className='flex-col gap-2'>
                    <Button onClick={() => router.push(`/profile/${data.id}`)} variant='outline'>View Profile</Button>
                    <Button onClick={cancelFriend} disabled={isUpdating}>
                        {
                            (isUpdating) && (<div className='h-4 mx-3 w-4 border-white border-0 rounded-full border-t-2 animate-spin '></div>)
                        }
                        Cancel Friend Request
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className='w-56'>
            <CardHeader className='text-center'>
                <CardTitle className='text-xl'>{data.firstName}{' '}{data.lastName}</CardTitle>
                <CardDescription>{data.username}</CardDescription>
            </CardHeader>
            <CardContent className=''>
                <Avatar className='w-40 h-40'>
                    <AvatarImage src={data.image || ''} alt='' />
                    <AvatarFallback className='w-40 text-6xl h-40'>{data.firstName.charAt(0)}{data.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
            </CardContent>
            <CardFooter className='flex-col gap-2'>
                <Button onClick={() => router.push(`/profile/${data.id}`)} variant='outline'>View Profile</Button>
                <Button onClick={addFriend} disabled={isUpdating}>
                    {
                        (isUpdating) && (<div className='h-4 mx-3 w-4 border-white border-0 rounded-full border-t-2 animate-spin '></div>)
                    }
                    Add Friend
                </Button>
            </CardFooter>
        </Card>
    )
}

export default FriendPageCard