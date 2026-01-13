import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();


process.env.PW_CODEGEN_NO_INSPECTOR = '1';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  webServer: undefined,
  use: {
    baseURL: process.env.API_BASE_URL || 'https://practice.expandtesting.com/api/cars',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
    timeout: parseInt(process.env.API_TIMEOUT || '30000'),
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
 
});