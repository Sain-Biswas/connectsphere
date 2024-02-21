import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/resources/prisma/prismadb";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'text' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Invalid Credentials');
                    }

                    const user = await prisma.users.findUnique({
                        where: {
                            username: credentials.email
                        },
                    });

                    if (!user || !user?.hashedPassword) {
                        throw new Error('User not Registered. \n Please Register and try again');
                    }

                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    )

                    if (!isCorrectPassword) {
                        throw new Error('Incorrect Password \n Please try again');
                    }

                    console.log(user)

                    return {
                        email: user.id,
                    } as any;
                } catch (error: any) {
                    console.log(error);
                }
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
}