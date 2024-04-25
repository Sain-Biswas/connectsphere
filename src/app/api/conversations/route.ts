import getCurrentUser from "@/resources/functions/getCurrentUser";
import prisma from "@/resources/prisma/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";
import { Users } from "@prisma/client";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            image,
            name,
            id
        } = body;

        if (!currentUser?.id || !currentUser?.username) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid Data', { status: 400 });
        }

        // if (isGroup) {
        //     const newConversation = await prisma.conversation.create({
        //         data: {
        //             name,
        //             image,
        //             isGroup,
        //             users: {
        //                 connect: [
        //                     ...members.map((member: string) => ({
        //                         id: member
        //                     })),
        //                 ]
        //             }
        //         },
        //         include: {
        //             users: true
        //         }
        //     });

        //     const updatedProject = await prisma.project.update({
        //         where: {
        //             id: id
        //         },
        //         data: {
        //             chatAllowed: true,
        //             conversationID: newConversation.id
        //         }
        //     });

        //     newConversation.users.forEach((user) => {
        //         if (user.email) {
        //             pusherServer.trigger(user.email, 'conversation:new', newConversation)
        //         }
        //     })

        //     return NextResponse.json(newConversation);
        // }

        const existingConversation = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        })

        const singleConversation = existingConversation[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        newConversation.users.map((user : Users) => {
            if (user.username) {
                pusherServer.trigger(user.username, 'conversation:new', newConversation);
            }
        })

        return NextResponse.json(newConversation);

    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}





