import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CarsPage extends BasePage {
  private addCarButton = 'button:has-text("Add Car")';
  private carList = '[data-testid="car-list"]';
  private carItems = '.car-item';
  private brandInput = 'input[placeholder*="Brand"]';
  private modelInput = 'input[placeholder*="Model"]';
  private priceInput = 'input[placeholder*="Price"]';
  private submitButton = 'button[type="submit"]';
  private deleteButton = 'button:has-text("Delete")';

  constructor(page: Page) {
    super(page);
  }

  async navigateToCars() {
    await this.goto('/cars');
    await this.waitForLoadState('networkidle');
  }

  async isPageLoaded() {
    return this.page.isVisible(this.carList);
  }

  async getPageTitle() {
    return this.getTitle();
  }

  async clickAddCarButton() {
    await this.page.click(this.addCarButton);
  }

  async getCarCount() {
    return this.page.locator(this.carItems).count();
  }

  async addCar(brand: string, model: string, price: string) {
    await this.clickAddCarButton();
    await this.page.fill(this.brandInput, brand);
    await this.page.fill(this.modelInput, model);
    await this.page.fill(this.priceInput, price);
    await this.page.click(this.submitButton);
  }

  async getCarListText() {
    return this.page.textContent(this.carList);
  }
}