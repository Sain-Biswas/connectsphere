import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
    var prisma: PrismaClient;
}

const client = globalThis.prisma || new PrismaClient().$extends(withAccelerate());
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;