export interface InvalidUserData {
    description: string;
    data: Record<string, unknown>;
    expectedField?: string;
    expectedMessage?: string;
}

export const invalidUsers: InvalidUserData[] = [
    {
        description: 'invalid email',
        data: {
            email: 'invalid-email',
        },
        expectedField: 'email',
        expectedMessage: 'is invalid',
    },

    {
    description: 'empty name',
    data: {
        name: '',
    },
    expectedField: 'name',
    expectedMessage: "can't be blank",
    },

    {
    description: 'invalid gender',
    data: {
        gender: 'invalid',
    },
    expectedField: 'gender',
    expectedMessage: "can't be blank, can be male of female",
    },

    {
    description: 'invalid status',
    data: {
        status: 'female',
    },
    expectedField: 'status',
    expectedMessage: "can't be blank",
    },
];