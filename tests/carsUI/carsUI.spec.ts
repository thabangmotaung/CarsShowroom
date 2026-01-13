import { test, expect } from '../fixtures/fixtures';

test.describe('Cars Showroom UI Tests', () => {
  test.beforeEach(async ({ carsPage }) => {
    await carsPage.navigateToCars();
  });

  test('should verify page title', async ({ carsPage }) => {
    const title = await carsPage.getPageTitle();
    expect(title).toBeDefined();
    expect(title).toContain('Cars');
  });

  test('should display car list', async ({ carsPage, page }) => {
    const carList = page.locator('#car-list');
    await expect(carList).toBeVisible();
  });

  test('should have add car button', async ({ carsPage, page }) => {
    const addButton = page.locator('button:has-text("Add Car")');
    await expect(addButton).toBeVisible();
  });

  test('should get car count', async ({ carsPage }) => {
    const count = await carsPage.getCarCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
