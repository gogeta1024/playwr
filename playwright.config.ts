import { defineConfig, devices } from '@playwright/test';
import test from 'node:test';
/*import dotenv from 'dotenv'
import path from 'path'

const envPath = process.env.ENV ? `.env.${process.env.ENV}`:`.env.dev`

dotenv.config({path:path.resolve(__dirname,envPath)})
*/
// Dòng này để debug: Hãy xóa sau khi chạy thông
//console.log(`>>> Đang sử dụng môi trường: ${envPath}`);
//console.log(`>>> Base URL lấy được: ${process.env.BASE_URL}`);

/**
* Read environment variables from file.
* https://github.com/motdotla/dotenv
*/
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
* See https://playwright.dev/docs/test-configuration.
*/
export default defineConfig({
testDir: './tests',
/* Run tests in files in parallel */
fullyParallel: true,
/* Fail the build on CI if you accidentally left test.only in the source code. */
forbidOnly: !!process.env.CI,
/* Retry on CI only */
retries: process.env.CI ? 2 : 0,
/* Opt out of parallel tests on CI. */
workers: process.env.CI ? 1 : undefined,
/* Reporter to use. See https://playwright.dev/docs/test-reporters */
reporter: 'html',
/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
use: {
/* Base URL to use in actions like `await page.goto('')`. */
baseURL: process.env.BASE_URL,

/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
trace: 'on-first-retry',
screenshot: 'only-on-failure',
//video: 'retain-on-failure',
},
/* Configure projects for major browsers */
projects: [
{
name:'globalSetup',
testMatch:'tests/auth/global-setup.ts',

},

{
name: 'chromium',
use: { ...devices['Desktop Chrome'] , baseURL: process.env.BASE_URL,
    // File lưu session sẽ nằm trong thư mục auth/ để gọn gàng
storageState: `playwright/.auth/${process.env.ENV_NAME}.json`,
},
dependencies:['globalSetup']
},

/*
{
name: 'firefox',
use: { ...devices['Desktop Firefox'] },
},

{
name: 'webkit',
use: { ...devices['Desktop Safari'] },
},
*/

/* Test against mobile viewports. */
// {
// name: 'Mobile Chrome',
// use: { ...devices['Pixel 5'] },
// },
// {
// name: 'Mobile Safari',
// use: { ...devices['iPhone 12'] },
// },

/* Test against branded browsers. */
// {
// name: 'Microsoft Edge',
// use: { ...devices['Desktop Edge'], channel: 'msedge' },
// },
// {
// name: 'Google Chrome',
// use: { ...devices['Desktop Chrome'], channel: 'chrome' },
// },
],

/* Run your local dev server before starting the tests */
// webServer: {
// command: 'npm run start',
// url: 'http://localhost:3000',
// reuseExistingServer: !process.env.CI,
// },
});
