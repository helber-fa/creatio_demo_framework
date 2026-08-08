import { test, expect } from '../../fixtures/test';
import { CreateUserRequest, User } from '../../api/models/User';
import { createUser } from '../../data/factories/UserFactory';

test('user can be fully updated', async ({ usersClient }) => {
    const userData = createUser();
    const createResponse = await usersClient.createUser(userData);

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json() as User;
    const updateData: CreateUserRequest = createUser({
        name: 'Updated Automation User',
        gender: 'female',
        status: 'inactive',
    });

    const putResponse = await usersClient.updateUser(
        createdUser.id,
        updateData
    );

    expect(putResponse.status()).toBe(200);

    const updatedUser = await putResponse.json() as User;

    expect(updatedUser.id).toBe(createdUser.id);
    expect(updatedUser.name).toBe(updateData.name);
    expect(updatedUser.email).toBe(updateData.email);
    expect(updatedUser.gender).toBe(updateData.gender);
    expect(updatedUser.status).toBe(updateData.status);
});