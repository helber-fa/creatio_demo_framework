import { test, expect } from '../../fixtures/test';
import { User } from '../../api/models/User';
import { createUser } from '../../data/factories/UserFactory';

test('user can be deleted successfully', async ({ usersClient }) => {
    const userData = createUser();
    const createResponse = await usersClient.createUser(userData);
    expect(createResponse.status()).toBe(201);
    const createdUser = await createResponse.json() as User;
    const deleteResponse = await usersClient.deleteUser(createdUser.id);
    expect(deleteResponse.status()).toBe(204);
    const getResponse = await usersClient.getUserById(createdUser.id);
    expect(getResponse.status()).toBe(404);
});