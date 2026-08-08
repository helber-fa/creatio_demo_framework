export interface CreateUserRequest {
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
}

export interface User extends CreateUserRequest {
    id: number;
}

export type UpdateUserRequest = Partial<CreateUserRequest>;