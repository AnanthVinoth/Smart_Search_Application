import { test, expect } from "@playwright/test";

test.describe("Smart Search Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders search input with placeholder", async ({ page }) => {
    const input = page.getByPlaceholder("Search...");
    await expect(input).toBeVisible();
  });

  test("displays dropdown results after typing", async ({ page }) => {
    const input = page.getByRole("textbox");
    await input.fill("account");

    // wait for mock async fetch and debounce
    const dropdownItem = page.locator("text=HDFC Savings Account - 1234");
    await expect(dropdownItem).toBeVisible();
  });

  test("allows selecting a result", async ({ page }) => {
    const input = page.getByRole("textbox");
    await input.fill("priya");

    const result = page.locator("text=Priya Sharma");
    await result.click();

    // input value should update
    await expect(input).toHaveValue("Priya Sharma");
  });

  test("clears input with clear button", async ({ page }) => {
    const input = page.getByRole("textbox");
    await input.fill("test");
    await page.getByRole("button", { name: /clear/i }).click();
    await expect(input).toHaveValue("");
  });

  test("supports keyboard navigation (arrow + enter)", async ({ page }) => {
    const input = page.getByRole("textbox");
    await input.fill("account");
    
    // Wait for dropdown to appear and first result to be visible
    await expect(page.locator("text=HDFC Savings Account - 1234")).toBeVisible();
    
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(input).toHaveValue("HDFC Savings Account - 1234");
  });

  test("supports keyboard navigation (arrow + escape)", async ({ page }) => {
    const input = page.getByRole("textbox");
    await input.fill("account");
    
    // Wait for dropdown to appear and first result to be visible
    await expect(page.locator("text=HDFC Savings Account - 1234")).toBeVisible();
    
    // Navigate to highlight an item
    await page.keyboard.press("ArrowDown");
    
    // Verify item is highlighted (you can check for highlighted class or aria-selected)
    await expect(page.locator('[aria-selected="true"]')).toBeVisible();
    
    // Press Escape to clear the highlight
    await page.keyboard.press("Escape");
    
    // Verify no item is highlighted anymore and input value remains unchanged
    await expect(page.locator('[aria-selected="true"]')).not.toBeVisible();
    await expect(input).toHaveValue("account");
  });

  test("shows no results message for invalid query", async ({ page }) => {
    const input = page.getByRole("textbox");
    await input.fill("xxxxxx");
    await expect(page.locator("text=No results found")).toBeVisible();
  });

  test("renders correctly on mobile", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium");
    await page.setViewportSize({ width: 375, height: 812 });
    const input = page.getByRole("textbox");
    await input.fill("acc");
    await expect(page.locator(".search-dropdown")).toBeVisible();
  });
});
