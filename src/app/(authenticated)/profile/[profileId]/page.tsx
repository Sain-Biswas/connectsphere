import getOtherUserProfile from '@/resources/functions/getOtherUserProfile';
import getOthersPosts from '@/resources/functions/getOthersPosts';
import { TokensIcon } from '@radix-ui/react-icons';
import React from 'react'
import UniPosts from '../components/UniPosts';
import getCurrentUser from '@/resources/functions/getCurrentUser';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FriendButton from './components/FriendButton';

interface PageParams {
    profileId: string
}

const Page = async ({ params }: { params: PageParams }) => {
    const { profileId } = params;
    const profile = await getOtherUserProfile(profileId);
    const [posts, user] = await Promise.all([getOthersPosts(profileId), getCurrentUser()]);

    const conversationId = profile?.conversationIds.filter((d) => user?.conversationIds.includes(d))[0];

    return (
        <div className='grid grid-cols-2'>
            <div className='flex flex-col justify-center items-center gap-3 w-full'>
                <div className='flex flex-col items-center gap-2'>
                    <Avatar className='w-48 h-48 rounded-md'>
                        <AvatarImage src={""} alt='' />
                        <AvatarFallback className='w-48 h-48 text-8xl font-mono rounded-md'>{profile?.firstName.charAt(0).toUpperCase()}{profile?.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-center'>
                        <p className='text-4xl font-bold'>{profile?.firstName}{" "}{profile?.lastName}</p>
                        <p className='font-mono text-gray-400 text-lg'>{profile?.username}</p>
                    </div>
                </div>
                <div className='flex justify-around w-full'>
                    <div className='flex flex-col gap-1 items-center'>
                        <p className='text-lg'>{posts.length}</p>
                        <p className='text-xl'>Posts</p>
                    </div>
                    <div className='flex flex-col gap-1 items-center'>
                        <p className='text-lg'>{profile?.friendIds.length}</p>
                        <p className='text-xl'>Friends</p>
                    </div>
                </div>
                <div className='h-20 w-full p-2 text-center'>
                    {
                        (!profile?.bio) ? (<p className=''>Bio not updated by user.</p>) : (<p className=''>{profile?.bio}</p>)
                    }
                </div>
                <div>
                    <FriendButton friendIds={user?.friendIds} acceptRequestIds={user?.acceptrequestIds} sentRequestIds={user?.sentrequestIds} userId={user?.id} profileId={profile?.id} convId={conversationId} />
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