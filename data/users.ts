export interface User {
    username: string;
    password: string;
}

export interface InvalidLoginData {
    username: string;
    password: string;
    expectedError: string;
}

export const users = {
    standard: {
        username: 'standard_user',
        password: 'secret_sauce',
    } satisfies User,

    problem: {
        username: 'problem_user',
        password: 'secret_sauce',
    } satisfies User,
};

export const invalidLoginData: InvalidLoginData[] = [
    {
        username: 'invalid_user',
        password: 'invalid_password',
        expectedError:
            'Epic sadface: Username and password do not match any user in this service',
    },

    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedError:
            'Epic sadface: Sorry, this user has been locked out.',
    },
];