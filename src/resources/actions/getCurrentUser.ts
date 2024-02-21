import prisma from '@/resources/prisma/prismadb';
import getSession from './getSession';


export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return undefined;
        }

        const currentUser = await prisma.users.findUnique({
            where: {
                id: session.user.email || undefined
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