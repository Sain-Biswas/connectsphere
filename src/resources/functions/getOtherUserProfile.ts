import prisma from '@/resources/prisma/prismadb';
import getSession from './getSession';


export default async function getOtherUserProfile(id: string) {
    try {
        if (!id) {
            return []
        }

        const profile = await prisma.users.findUnique({
            where: {
                id: id
            },
        });

        if (!profile) {
            return []
        }

        return profile
    } catch (error: any) {
        return []
    }
}