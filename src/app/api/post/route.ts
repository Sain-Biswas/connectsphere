import getCurrentUser from '@/resources/functions/getCurrentUser';
import prisma from '@/resources/prisma/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            media,
            description,
        } = body;

        const user = await getCurrentUser();
        const createdById = user?.id as string;

        const post = await prisma.posts.create({
            data: {
                media,
                description,
                createdById
            },
            include: {
                createdBy: true
            }
        });

        return NextResponse.json(post);
    } catch (error: any) {
        console.log(error, 'REGISTRATION ERROR');
        return new NextResponse(error, { status: 500 });
    }
}