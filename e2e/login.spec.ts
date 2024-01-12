import { test, expect } from "@playwright/test";

test("should login success", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByLabel("username").fill("username");
  await page.getByLabel("password").fill("password");
  await page.click("button");
  await expect(page).toHaveURL("http://localhost:3000/dashboard");
  await expect(
    await page.locator(".greetings").first().allTextContents()
  ).toContain("Welcome John !");
});
