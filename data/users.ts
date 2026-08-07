export interface User {
    username: string;
    password: string;
}

export const users = {
    standard: {
        username: 'standard_user',
        password: 'secret_sauce',
    } satisfies User,

    invalid: {
        username: 'invalid_user',
        password: 'invalid_password',
    } satisfies User,
};