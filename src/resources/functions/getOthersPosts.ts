import prisma from '@/resources/prisma/prismadb';


export default async function getOthersPosts(id: string) {
    try {

        if (!id) {
            return [];
        }

        const posts = await prisma.posts.findMany({
            where: {
                createdById: id
            },
            include: {
                comments: {
                    include: {
                        commenter: true
                    }
                },
                createdBy: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!posts) {
            return []
        }

        return posts
    } catch (error: any) {
        return []
    }
}