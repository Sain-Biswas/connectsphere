import { Conversation, Message, Users } from "@prisma/client";

export type FullMessageType = Message & {
    sender: Users,
    seen: Users[]
};

export type FullConversationType = Conversation & {
    users: Users[],
    messages: FullMessageType[],
};