export interface InvalidCheckoutData {
    description: string;
    firstName: string;
    lastName: string;
    postalCode: string;
    expectedError: string;
}

export const invalidCheckoutData: InvalidCheckoutData[] = [
    {
        description: 'empty first name',
        firstName: '',
        lastName: 'Automation',
        postalCode: '21000',
        expectedError: 'Error: First Name is required',
    },
    {
        description: 'empty last name',
        firstName: 'Oleksandr',
        lastName: '',
        postalCode: '21000',
        expectedError: 'Error: Last Name is required',
    },
    {
        description: 'empty postal code',
        firstName: 'Oleksandr',
        lastName: 'Automation',
        postalCode: '',
        expectedError: 'Error: Postal Code is required',
    },
];