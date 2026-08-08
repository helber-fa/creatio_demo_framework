import { defineConfig, devices } from '@playwright/test';
import { environment } from './config/environment';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '.env'),
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: environment.uiBaseUrl,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
        name: 'chromium',
        testDir: './tests/ui',
        use: { ...devices['Desktop Chrome'] },
    },

    {
        name: 'firefox',
        testDir: './tests/ui',
        use: { ...devices['Desktop Firefox'] },
    },

    {
        name: 'webkit',
        testDir: './tests/ui',
        use: { ...devices['Desktop Safari'] },
    },

    {
        name: 'api',
        testDir: './tests/api',
    },
],
});
