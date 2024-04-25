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

    const sentrequestIds: string[] | undefined = user?.sentrequestIds;
    sentrequestIds?.push(profileId);

    const updatedUser = await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            sentrequestIds: sentrequestIds
        }
    });

    const acceptrequestIds: string[] | undefined = other?.acceptrequestIds;
    acceptrequestIds?.push(userId);

    const updatedOther = await prisma.users.update({
        where: {
            id: profileId
        },
        data: {
            acceptrequestIds: acceptrequestIds
        }
    })

    return NextResponse.json({ updatedOther, updatedUser });
}