import { test, expect } from '../../fixtures/test';
import { CreateUserRequest, User } from '../../api/models/User';
import { createUser } from '../../data/factories/UserFactory';

test('created user can be retrieved by id', async ({ usersClient }) => {
    const userData: CreateUserRequest = createUser();

    const createResponse = await usersClient.createUser(userData);

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json() as User;

    const getResponse = await usersClient.getUserById(createdUser.id);

    expect(getResponse.status()).toBe(200);

    const retrievedUser = await getResponse.json() as User;

    expect(retrievedUser.id).toBe(createdUser.id);
    expect(retrievedUser.name).toBe(userData.name);
    expect(retrievedUser.email).toBe(userData.email);
    expect(retrievedUser.gender).toBe(userData.gender);
    expect(retrievedUser.status).toBe(userData.status);
});