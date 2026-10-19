export interface UserProfile {
    id: string;
    name: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface SignInInput {
    email: string;
    password: string;
}

export interface SignUpInput {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
