import { test as base, Page } from '@playwright/test';
import { CarsPage } from '../pages/CarsPage';

type TestFixtures = {
  carsPage: CarsPage;
};

export const test = base.extend<TestFixtures>({
  carsPage: async ({ page }, use) => {
    const carsPage = new CarsPage(page);
    await use(carsPage);
  },
});

export { expect } from '@playwright/test';