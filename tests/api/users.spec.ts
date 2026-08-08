import { test, expect } from '../../fixtures/test';
import { User } from '../../api/models/User';

test('get users returns valid users', async ({ usersClient }) => {
    const response = await usersClient.getUsers();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type'])
        .toContain('application/json');
    const users = await response.json() as User[];

    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    for (const user of users) {
        expect(user.id).toBeDefined();
        expect(typeof user.name).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(['male', 'female']).toContain(user.gender);
        expect(['active', 'inactive']).toContain(user.status);
    }
});