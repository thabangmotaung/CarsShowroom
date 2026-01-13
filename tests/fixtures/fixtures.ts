import { test as base } from '@playwright/test';
import { CarsPage } from '../pages/CarsPage';

interface TestFixtures {
  carsPage: CarsPage;
}

export const test = base.extend<TestFixtures>({
  carsPage: async ({ page }, use) => {
    try {
      const carsPage = new CarsPage(page);
      await use(carsPage);
    } catch (error) {
      console.error('Fixture setup failed:', error);
      throw error;
    }
  },
});