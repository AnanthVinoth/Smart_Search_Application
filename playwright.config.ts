import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: "http://localhost:5173", // or your React dev server port
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "Chromium", use: { browserName: "chromium" } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  ],
});