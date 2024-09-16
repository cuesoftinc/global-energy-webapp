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

export interface User {
    id: string,
    name: string,
    email: string,
    userName: string,
    accountType: string,
    address: string,
    phoneNumber: string,
    subscriptionType: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
}

