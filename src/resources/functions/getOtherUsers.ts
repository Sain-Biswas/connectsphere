import prisma from '@/resources/prisma/prismadb';
import getSession from './getSession';
import getCurrentUser from './getCurrentUser';


export default async function getOtherUsers() {
    try {
        const current = await getCurrentUser();

        const currentUser = await prisma.users.findMany({
            where: {
                NOT: {
                    id: current?.id
                }
            },
        });

        if (!currentUser) {
            return undefined
        }

        return currentUser
    } catch (error: any) {
        return undefined
    }
}