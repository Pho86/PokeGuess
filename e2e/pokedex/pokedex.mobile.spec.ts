import { test, expect, devices } from '@playwright/test'

let homePage = "http://localhost:3000/"
let pokeDexPage = "http://localhost:3000/pokedex"

test.use({
  browserName: "chromium",
  ...devices['iPhone XR']
})

test.describe('Mobile Pokedex page tests', () => {
  test('checking main body for mobile styling changes', async ({ page }) => {
    await page.goto(pokeDexPage);
    const body = page.locator('body');
    const computedStyles = await body.evaluate((element) => {
      const styles = window.getComputedStyle(element);
      return {
        fontSize: styles.fontSize,
        background: styles.backgroundColor
      };
    });
    expect(computedStyles.fontSize).toEqual('14px');
    expect(computedStyles.background).toEqual('rgb(250, 247, 239)');
  });

})


test.describe('interacting with the pokedex area', () => {
  test('find and click Gardevoir in the pokedex and make sure popup appears and find tablet changes', async ({ page }) => {
    await page.goto(pokeDexPage);
    await page.click('text=Gardevoir')

    await expect(page.locator('h2')).toContainText('#282 Gardevoir');
    await expect(page.locator('h4')).toContainText('Embrace Pokemon');
    const pokecard = page.locator('#Gardevoir-popup')

    const computedStyles = await pokecard.evaluate((element) => {
      const styles = window.getComputedStyle(element);
      return {
        display: styles.display,
        borderRadius: styles.borderRadius,
        flexDirection: styles.flexDirection
      };
    });

    expect(computedStyles.display).toEqual('flex');
    expect(computedStyles.borderRadius).toEqual('28px');
    expect(computedStyles.flexDirection).toEqual('column');
  });
})

