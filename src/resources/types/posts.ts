import { Comment, Posts, Users } from "@prisma/client";

export type FullPostType = Posts & {
    createdBy: Users,
    comments: FullCommentType[]
}

export type FullCommentType = Comment & {
    commenter: Users
}