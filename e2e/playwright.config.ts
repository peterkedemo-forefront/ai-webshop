import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  workers: 1, // Run tests serially for full isolation
  webServer: {
    command: 'PORT=4000 NODE_ENV=test npm run start:test --workspace=server',
    url: 'http://localhost:4000',
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
  use: {
    baseURL: 'http://localhost:4000',
  },
}); 