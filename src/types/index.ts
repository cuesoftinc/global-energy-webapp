export type TokenType = {
    id: string,
    iat: number,
    exp: number,
    aud: string,
    iss: string,
    sub: string
}

export interface BlogPost {
    comments: [],
    content: string,
    createdAt: string,
    imgUrl: string,
    subTitle: string,
    title: string,
    updatedAt: string,
    userId: string
    __v: number,
    _id: string,
}

