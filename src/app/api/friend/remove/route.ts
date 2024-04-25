import { NextResponse } from "next/server";
import prisma from '@/resources/prisma/prismadb';
import axios from "axios";

export async function POST(request: Request) {
    const body = await request.json();
    const { userId, profileId } = body;

    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        }
    });

    const other = await prisma.users.findUnique({
        where: {
            id: profileId
        }
    });

    const conversationId = user?.conversationIds.map((id: string) => other?.conversationIds.includes(id));

    const updatedUser = await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            friendIds: user?.friendIds.filter((u) => u !== profileId)
        }
    });

    const updatedOther = await prisma.users.update({
        where: {
            id: profileId
        },
        data: {
            friendIds: other?.friendIds.filter((o) => o !== userId)
        }
    });

    return NextResponse.json({ updatedOther, updatedUser })
}