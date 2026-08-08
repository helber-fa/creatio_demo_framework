import { test, expect } from '../../fixtures/test';
import { User, UpdateUserRequest } from '../../api/models/User';
import { createUser } from '../../data/factories/UserFactory';

test('user can be partially updated', async ({ usersClient }) => {
    const userData = createUser();

    const createResponse = await usersClient.createUser(userData);

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json() as User;

    const updateData: UpdateUserRequest = {
        status: 'inactive',
    };

    const patchResponse = await usersClient.patchUser(
        createdUser.id,
        updateData
    );

    expect(patchResponse.status()).toBe(200);

    const updatedUser = await patchResponse.json() as User;

    expect(updatedUser.id).toBe(createdUser.id);
    expect(updatedUser.status).toBe(updateData.status);
    expect(updatedUser.name).toBe(userData.name);
    expect(updatedUser.email).toBe(userData.email);
    expect(updatedUser.gender).toBe(userData.gender);
});