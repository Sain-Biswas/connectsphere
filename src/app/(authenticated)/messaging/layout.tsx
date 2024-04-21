'use client';
import React from 'react'
import SideChatBar from './components/SideChatBar'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Layout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const path = usePathname();

    return (
        <div className='h-[calc(100vh-7.05rem)] md:h-[calc(100vh-4.1rem)] w-full flex'>
            <div className={cn('w-full md:w-64 md:border-r md:border-primary', (path !== '/messaging') && 'hidden md:block')}>
                <SideChatBar />
            </div>
            <div className={cn('flex-grow', (path === '/messaging') ? 'hidden md:block' : 'block')}>
                {children}
            </div>
        </div>
    )
}

export default Layout