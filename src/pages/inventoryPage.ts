import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly cartButton: Locator;
  readonly itemLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_list');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.itemLink = page.locator('.inventory_item');
  }

  async addItemToCart(itemName: string) {
    const itemKey = itemName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const addButton = this.page.locator(`[data-test="add-to-cart-${itemKey}"]`);
    await addButton.click();
  }

  async openCart() {
    await this.cartButton.click();
  }
}
