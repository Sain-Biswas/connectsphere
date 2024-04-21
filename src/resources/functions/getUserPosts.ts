import prisma from '@/resources/prisma/prismadb';
import getSession from './getSession';
import getCurrentUser from './getCurrentUser';


export default async function getUserPosts() {
    try {
        const user = await getCurrentUser();

        if (!user?.id) {
            return [];
        }

        const posts = await prisma.posts.findMany({
            where: {
                createdById: user.id
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

        console.log(posts || "Not Found")

        if (!posts) {
            return []
        }

        return posts
    } catch (error: any) {
        return []
    }
}