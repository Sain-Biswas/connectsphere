'use client';
import { Button } from '@/components/ui/button'
import { Users } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

interface FriendButtonProps {
    friendIds: string[] | undefined,
    acceptRequestIds: string[] | undefined,
    sentRequestIds: string[] | undefined,
    userId: string | undefined,
    profileId: string | undefined,
    convId: string | undefined
}

const FriendButton: React.FC<FriendButtonProps> = ({ friendIds, acceptRequestIds, sentRequestIds, userId, profileId, convId }) => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const router = useRouter();

    async function addFriend() {
        setIsUpdating(true);
        await axios.post('/api/friend/add', { userId, profileId })
            .then(() => toast.success("Friend request sent."))
            .catch(() => toast.error("Something went wrong."))
            .finally(() => setIsUpdating(false));
        router.refresh();
    }

    async function acceptFriend() {
        setIsUpdating(true);
        await axios.post('/api/friend/accept', { userId, profileId })
            .then(() => toast.success("Friend request accepted."))
            .catch(() => toast.error("Something went wrong."))
            .finally(() => setIsUpdating(false));
        await axios.post('/api/conversations', {
            userId: profileId,
            isGroup: false
        });
        router.refresh();
    }

    async function cancelFriend() {
        setIsUpdating(true);
        await axios.post('/api/friend/cancel', { userId, profileId })
            .then(() => toast.success("Friend request canceled."))
            .catch(() => toast.error("Something went wrong."))
            .finally(() => setIsUpdating(false));
        router.refresh();
    }

    async function removeFriend() {
        setIsUpdating(true);
        await axios.post('/api/friend/remove', { userId, profileId })
            .then(() => toast.success("Friend removed."))
            .catch(() => toast.error("Something went wrong."))
            .finally(() => setIsUpdating(false));
        await axios.delete(`/api/conversations/${convId || ""}`);
        router.refresh();
    }

    if (friendIds?.includes(profileId || '')) {
        return (
            <Button onClick={removeFriend} disabled={isUpdating}>
                {
                    (isUpdating) && (<div className='h-4 mx-3 w-4 border-white border-0 rounded-full border-t-2 animate-spin '></div>)
                }
                Remove Friend
            </Button>
        )
    }

    if (acceptRequestIds?.includes(profileId || '')) {
        return (
            <Button onClick={acceptFriend} disabled={isUpdating}>
                {
                    (isUpdating) && (<div className='h-4 mx-3 w-4 border-white border-0 rounded-full border-t-2 animate-spin '></div>)
                }
                Accept Friend Request
            </Button>
        )
    }
    if (sentRequestIds?.includes(profileId || '')) {
        return (
            <Button onClick={cancelFriend} disabled={isUpdating}>
                {
                    (isUpdating) && (<div className='h-4 mx-3 w-4 border-white border-0 rounded-full border-t-2 animate-spin '></div>)
                }
                Cancel Friend Request
            </Button>
        )
    }

    return (
        <Button onClick={addFriend} disabled={isUpdating}>
            {
                (isUpdating) && (<div className='h-4 mx-3 w-4 border-white border-0 rounded-full border-t-2 animate-spin '></div>)
            }
            Add Friend
        </Button>
    )
}

export default FriendButton