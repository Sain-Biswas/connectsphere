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

    const updatedUser = await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            sentrequestIds: user?.sentrequestIds.filter((u) => u !== profileId)
        }
    });

    const updatedOther = await prisma.users.update({
        where: {
            id: profileId
        },
        data: {
            acceptrequestIds: other?.acceptrequestIds.filter((o) => o !== userId)
        }
    });

    return NextResponse.json({ updatedOther, updatedUser })
}