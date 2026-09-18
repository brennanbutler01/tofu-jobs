import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './e2e',
  workers: 1,
  timeout: 120000,
  expect: { timeout: 15000 },
  use: {
    actionTimeout: 15000,
    baseURL: process.env.VISITOR_URL || 'http://127.0.0.1:5216',
    channel: process.env.CI ? undefined : 'chrome',
    screenshot: 'only-on-failure',
  },
  webServer: process.env.VISITOR_URL
    ? undefined
    : {
        command: 'corepack yarn dev:visitor',
        url: 'http://127.0.0.1:5216',
        reuseExistingServer: false,
      },
})
