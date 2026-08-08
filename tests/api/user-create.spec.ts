import { test, expect } from '../../fixtures/test';
import { CreateUserRequest, User } from '../../api/models/User';
import { createUser } from '../../data/factories/UserFactory';

test('user can be created successfully', async ({ usersClient }) => {
    const userData: CreateUserRequest = createUser();

    const response = await usersClient.createUser(userData);

    expect(response.status()).toBe(201);

    const createdUser = await response.json() as User;

    expect(createdUser.id).toBeDefined();
    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.gender).toBe(userData.gender);
    expect(createdUser.status).toBe(userData.status);
});