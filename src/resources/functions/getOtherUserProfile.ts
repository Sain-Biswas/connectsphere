import prisma from '@/resources/prisma/prismadb';
import getSession from './getSession';


export default async function getOtherUserProfile(id: string) {
    try {
        if (!id) {
            return null
        }

        const profile = await prisma.users.findFirst({
            where: {
                id: id
            },
        });

        if (!profile) {
            return null
        }

        return profile
    } catch (error: any) {
        return null
    }
}