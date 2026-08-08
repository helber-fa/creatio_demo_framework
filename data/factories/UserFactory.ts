import { CreateUserRequest } from '../../api/models/User';

export function createUser(
    overrides: Partial<CreateUserRequest> = {}
): CreateUserRequest {
    return {
        name: 'Oleksandr Automation',
        email: `oleksandr.${Date.now()}@example.com`,
        gender: 'male',
        status: 'active',
        ...overrides,
    };
}