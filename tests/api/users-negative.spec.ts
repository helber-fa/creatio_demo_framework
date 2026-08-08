import { createUser } from '../../data/factories/UserFactory';
import { test, expect } from '../../fixtures/test';
import { ApiError, ValidationError } from '../../api/models/ApiError';
import { invalidUsers } from '../../data/negativeUsers';

test('get non-existing user returns 404', async ({ usersClient }) => {
    const response = await usersClient.getUserById(999999999);
    expect(response.status()).toBe(404);
    const body = await response.json() as ApiError;
    expect(body.message).toBe('Resource not found');
});

for (const testData of invalidUsers) {
    test(`user cannot be created with ${testData.description}`, async ({
        usersClient,
    }) => {
        const userData = {
            ...createUser(),
            ...testData.data,
        };

        const response = await usersClient.createUser(userData);

        expect(response.status()).toBe(422);

        const errors = await response.json() as ValidationError[];

        expect(errors).toContainEqual({
            field: testData.expectedField,
            message: testData.expectedMessage,
        });
    });
}

test('user cannot be updated if user does not exist', async ({ usersClient }) => {
    const response = await usersClient.patchUser(999999999, {
        status: 'inactive',
    });
    expect(response.status()).toBe(404);
    const body = await response.json() as ApiError;
    expect(body.message).toBe('Resource not found');
});

test('user cannot be deleted if user does not exist', async ({ usersClient }) => {
    const response = await usersClient.deleteUser(999999999);
    expect(response.status()).toBe(404);
    const body = await response.json() as ApiError;
    expect(body.message).toBe('Resource not found');
});