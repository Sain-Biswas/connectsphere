import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import getCurrentUser from '@/resources/functions/getCurrentUser'
import getOtherUsers from '@/resources/functions/getOtherUsers'
import React from 'react'
import FriendPageCard from './components/FriendPageCard'

const Page = async () => {
    const [currentUser, otherUser] = await Promise.all([getCurrentUser(), getOtherUsers()]);
    const friends = otherUser?.filter((user) => currentUser?.friendIds.includes(user.id));
    const accept = otherUser?.filter((user) => currentUser?.acceptrequestIds.includes(user.id));
    const sent = otherUser?.filter((user) => currentUser?.sentrequestIds.includes(user.id));

    return (
        <div className='w-[100vw-5rem] p-2'>
            <Tabs defaultValue="friend" className="w-full">
                <TabsList className='w-full grid grid-cols-3'>
                    <TabsTrigger value="friend">Friends</TabsTrigger>
                    <TabsTrigger value="accept">Pending Friend Requests</TabsTrigger>
                    <TabsTrigger value="sent">Sent Friend Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="friend">
                    <div className='flex-wrap gap-3 justify-stretch'>
                        {
                            friends?.map((f) => (
                                <FriendPageCard data={f} action='remove' userId={currentUser?.id} user={currentUser} />
                            ))
                        }
                    </div>
                </TabsContent>
                <TabsContent value="accept">
                    <div className='flex-wrap gap-3 justify-stretch'>
                        {
                            accept?.map((f) => (
                                <FriendPageCard data={f} action='accept' userId={currentUser?.id} user={currentUser} />
                            ))
                        }
                    </div>
                </TabsContent>
                <TabsContent value="sent">
                    <div className='flex-wrap gap-3 justify-stretch'>
                        {
                            sent?.map((f) => (
                                <FriendPageCard data={f} action='cancel' userId={currentUser?.id} user={currentUser} />
                            ))
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </div>

    )
}

export default Page