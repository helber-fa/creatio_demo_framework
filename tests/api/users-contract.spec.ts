import { test, expect } from '../../fixtures/test';
import { CreateUserRequest, User } from '../../api/models/User';
import { createUser } from '../../data/factories/UserFactory';

test('user can be created successfully without unknown fields', async ({ usersClient }) => {
    const userData = {
        ...createUser(),
        age: 30, 
    };
    const response = await usersClient.createUser(userData);
    expect(response.status()).toBe(201);
    const createdUser = await response.json() as User;
    expect(createdUser).not.toHaveProperty('age');
});