import prisma from '@/resources/prisma/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            text,
            commenterId,
            postId
        } = body;


        const comment = await prisma.comment.create({
            data: {
                text,
                commenterId,
                postId
            },
            include: {
                commenter: true,
                post: true
            }
        });

        return NextResponse.json(comment);
    } catch (error: any) {
        console.log(error, 'REGISTRATION ERROR');
        return new NextResponse(error, { status: 500 });
    }
}