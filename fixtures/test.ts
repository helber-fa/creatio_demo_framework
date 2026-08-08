import {
    test as base,
    request,
} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UsersClient } from '../api/clients/UsersClient';
import { environment } from '../config/environment';

type Fixtures = {
    loginPage: LoginPage;
    usersClient: UsersClient;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    usersClient: async ({}, use) => {
        const token = process.env.GOREST_TOKEN;

        if (!token) {
            throw new Error('GOREST_TOKEN environment variable is not set');
        }

        const apiContext = await request.newContext({
            baseURL: environment.apiBaseUrl,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        const usersClient = new UsersClient(apiContext);

        await use(usersClient);

        await apiContext.dispose();
    },
});

export { expect } from '@playwright/test';