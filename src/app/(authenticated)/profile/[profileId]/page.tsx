import getOtherUserProfile from '@/resources/functions/getOtherUserProfile';
import getOthersPosts from '@/resources/functions/getOthersPosts';
import { TokensIcon } from '@radix-ui/react-icons';
import React from 'react'
import UniPosts from '../components/UniPosts';
import getCurrentUser from '@/resources/functions/getCurrentUser';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PageParams {
    profileId: string
}

const Page = async ({ params }: { params: PageParams }) => {
    const { profileId } = params;
    const profile = await getOtherUserProfile(profileId);
    const [posts, user] = await Promise.all([getOthersPosts(profileId), getCurrentUser()]);

    return (
        <div className='grid grid-cols-2'>
            <div className='flex justify-center items-center gap-3'>
                <div>
                    <Avatar className='w-36 h-36 rounded-md'>
                        <AvatarImage src={""} alt='' />
                        <AvatarFallback className='w-36 h-36 text-2xl rounded-md'>SS</AvatarFallback>
                    </Avatar>
                    <p>Other User</p>
                </div>
            </div>
            <div className='p-2'>
                <div className='h-8  w-full bg-primary rounded-md flex justify-center items-center gap-2'> <TokensIcon className='w-6 h-6' /> <p className='font-bold text-xl'>All Posts</p></div>
                <ScrollArea className='h-[calc(100vh-7rem)]'>
                    <UniPosts data={posts} userId={user?.id} />
                    <ScrollBar className='w-0' />
                </ScrollArea>
            </div>
        </div>
    )
}

export default Page