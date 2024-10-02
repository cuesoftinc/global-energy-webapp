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
export interface Subscription {
    id: string,
    type: string,
    userId: string,
    paymentId: string,
    amount: string,
    createdAt: string,
    updatedAt: string,
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

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    address: string;
    phoneNumber: string;
    accountType: string;
    password: string;
    confirmPassword: string;
}

export interface FlutterwaveConfig {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options: string;
    customer: {
        email: string;
        phone_number: string;
        name: string;
    };
    customizations: {
        title: string;
        description: string;
        logo: string;
    };
    redirect_url?: string;
    headers?: {
        Authorization: string;
        'Content-Type': string;
    };
}

export interface ChartResponse {
    date: Record<string, string>;
    subscriptions: Record<string, any[]>;
    users: Record<string, string[]>;
}


