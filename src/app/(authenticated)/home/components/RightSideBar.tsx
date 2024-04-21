'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Users } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, use, useMemo, useState } from 'react'

interface RightSideBarProps {
    users: Users[] | undefined
}

const RightSideBar: React.FC<RightSideBarProps> = ({ users }) => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const filteredUsers: Users[] | undefined = users?.filter((user) => {
        if (search === '') return true;
        else return search === user.username.slice(0, search.length);
    })

    return (
        <div className='p-2'>
            <div className='flex flex-col gap-2 mb-3'>
                <div className='flex justify-between items-center'>
                    <p className='text-xl font-bold'>Users</p>
                    <Button size='sm' onClick={() => router.push('/friends')}>Friends</Button>
                </div>
                <Input placeholder='Search...' value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} className='w-full' />
            </div>
            <div className='flex flex-col gap-1'>
                {
                    filteredUsers?.map((user: Users) => (
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className='border-2 border-secondary hover:bg-secondary/50 hover:border-primary flex gap-2 p-2 justify-start rounded-md'>
                                    <Avatar>
                                        <AvatarImage src={user.image || ""} alt='' />
                                        <AvatarFallback className=''>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className=''>
                                        <p>{user.firstName}{' '}{user.lastName}</p>
                                        <p>{user.username}</p>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className=''>
                                <DialogHeader>
                                    <DialogTitle>{user.firstName}{' '}{user.lastName}</DialogTitle>
                                    <DialogDescription>{user.username}</DialogDescription>
                                </DialogHeader>
                                <div className='flex flex-col items-center gap-3'>
                                    <Avatar className='w-36 h-36'>
                                        <AvatarImage src={user.image || ""} alt='' />
                                        <AvatarFallback className='w-36 h-36 text-5xl'>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className='w-full'>
                                        {user.bio || "Bio not Updated"}
                                    </p>
                                </div>
                                <DialogFooter>
                                    <DialogClose className='py-1 px-4 outline-secondary outline-1 rounded-md hover:bg-secondary'>Close</DialogClose>
                                    <Button className='' onClick={() => router.push(`/profile/${user.id}`)}>
                                        View Profile
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ))
                }
            </div>
        </div>
    )
}

export default RightSideBar