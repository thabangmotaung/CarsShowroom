import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForLoadState(state: Parameters<Page['waitForLoadState']>[0] = 'load') {
    await this.page.waitForLoadState(state);
  }

  async getTitle() {
    return this.page.title();
  }
}