export type TokenType = {
    email: string,
    first_name: string,
    last_name: string,
    role: string,
    user_id: string
    user_type: string,
    exp: number,
    publicKey: string;
}

export interface blogPost {
    id: string,
    title: string,
    content: string,
    imgUrl: string,
    userId: string
    comments: [],
    createdAt: string,
    updatedAt: string,
}