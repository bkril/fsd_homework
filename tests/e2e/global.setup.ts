import { test as setup } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, ".auth/user.json");

setup("authenticate", async ({ page }) => {
  const email = process.env.TEST_EMAIL ?? "";
  const password = process.env.TEST_PASSWORD ?? "";

  if (!email || !password) {
    throw new Error("TEST_EMAIL and TEST_PASSWORD env vars must be set before running E2E tests");
  }

  await page.goto("/en/sign-in");
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('button[type="submit"]').click();

  await page.waitForURL("**/countries", { timeout: 15_000 });

  await page.context().storageState({ path: authFile });
});
