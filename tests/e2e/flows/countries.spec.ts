import { expect, test } from "@playwright/test";

test.describe("Countries list page", () => {
  test("displays country cards after navigation to /en/countries", async ({ page }) => {
    await page.goto("/en/countries");

    const cards = page.locator('[data-testid="country-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("filters country list when user types in the search input", async ({ page }) => {
    await page.goto("/en/countries");

    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible({ timeout: 10_000 });

    await searchInput.fill("Germany");

    const cards = page.locator('[data-testid="country-card"]');
    await expect(cards).toHaveCount(1, { timeout: 5_000 });
    await expect(cards.first().locator('[data-testid="country-name"]')).toContainText("Germany");
  });
});

test.describe("Country detail page", () => {
  test("opens detail page with correct heading after clicking a card", async ({ page }) => {
    await page.goto("/en/countries");

    const firstCard = page.locator('[data-testid="country-card"]').first();
    await expect(firstCard).toBeVisible({ timeout: 10_000 });

    const countryName = (await firstCard.locator('[data-testid="country-name"]').textContent()) ?? "";
    expect(countryName.trim()).toBeTruthy();

    await firstCard.click();

    await expect(page).toHaveURL(/\/en\/countries\/[A-Z]{3}/);
    await expect(page.locator("h1")).toContainText(countryName.trim());
  });
});
