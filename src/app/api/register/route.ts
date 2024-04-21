import prisma from '@/resources/prisma/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            firstName,
            lastName,
            username,
            password,
            gender,
            dateOfBirth,
        } = body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.users.create({
            data: {
                firstName,
                lastName,
                username,
                hashedPassword,
                gender,
                dateOfBirth
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error, 'REGISTRATION ERROR');
        return new NextResponse(error, { status: 500 });
    }
}