import axios from "axios";
import { NextResponse } from "next/server";


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

    const userFriend = user?.friendIds;
    userFriend?.push(profileId);

    const updatedUser = await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            acceptrequestIds: user?.acceptrequestIds.filter((u) => u !== profileId),
            friendIds: userFriend
        }
    });

    const otherFriend = other?.friendIds;
    otherFriend?.push(userId);

    const updatedOther = await prisma.users.update({
        where: {
            id: profileId
        },
        data: {
            sentrequestIds: other?.sentrequestIds.filter((o) => o !== userId),
            friendIds: otherFriend

        }
    });

    return NextResponse.json({ updatedOther, updatedUser });
}