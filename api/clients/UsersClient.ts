import { APIRequestContext } from '@playwright/test';
import { CreateUserRequest, UpdateUserRequest } from '../models/User';

export class UsersClient {
    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getUsers() {
        const response = await this.request.get('users');
        return response;
    }

    async createUser(user: CreateUserRequest) {
        return this.request.post('users', {
            data: user,
        });
    }

    async getUserById(id: number) {
        return this.request.get(`users/${id}`);
    }

    async updateUser(
        id: number,
        user: CreateUserRequest
    ) {
        return this.request.put(`users/${id}`, {
            data: user,
        });
    }

    async patchUser(
        id: number,
        user: UpdateUserRequest
    ) {
        return this.request.patch(`users/${id}`, {
            data: user,
        });
    }

    async deleteUser(id: number) {
        return this.request.delete(`users/${id}`);
    }
}