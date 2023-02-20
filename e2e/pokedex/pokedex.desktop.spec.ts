import { test, expect, devices } from '@playwright/test'

let homePage = "http://localhost:3000/"
let pokeDexPage = "http://localhost:3000/pokedex"

test.use({
  browserName: "chromium",
  ...devices['Desktop Chrome']
})

test.describe('Desktop Pokedex page tests', () => {
  test('checking main body styling', async ({ page }) => {
    await page.goto(pokeDexPage);
    const body = page.locator('body');
    const computedStyles = await body.evaluate((element) => {
      const styles = window.getComputedStyle(element);
      return {
        fontSize: styles.fontSize,
        background: styles.backgroundColor
      };
    });
    expect(computedStyles.fontSize).toEqual('16px');
    expect(computedStyles.background).toEqual('rgb(250, 247, 239)');
  });

  test('check pokedex grid for styling and elements', async ({ page }) => {
    await page.goto(pokeDexPage);
    const main = page.locator('main > div');
    const computedStyles = await main.evaluate((element) => {
      const styles = window.getComputedStyle(element);
      return {
        display: styles.display,
        gridGap: styles.gap
      };
    });
    expect(computedStyles.display).toEqual('grid');
    expect(computedStyles.gridGap).toEqual('24px');

  })
  test('check pokedex grid elements for until generation 8', async ({ page }) => {
    await page.goto(pokeDexPage)

    await expect(page.locator('div > h3')).toHaveCount(898);
  })
})


test.describe('interacting with the pokedex area | Desktop', () => {
  test('find and click Garchomp in the pokedex and make sure popup appears', async ({ page }) => {
    await page.goto(pokeDexPage);
    await page.click('text=Garchomp')
    await expect(page.locator('h2')).toContainText('#445 Garchomp');
    await expect(page.locator('h4')).toContainText('The Mach Pokemon');
    const pokecard = page.locator('#Garchomp-popup')

    const computedStyles = await pokecard.evaluate((element) => {
      const styles = window.getComputedStyle(element);
      return {
        padding: styles.padding,
        opacity: styles.opacity,
        pointer: styles.pointerEvents,
        borderRadius: styles.borderRadius
      };
    });

    expect(computedStyles.padding).toEqual('56px');
    expect(computedStyles.borderRadius).toEqual('32px');
    expect(computedStyles.pointer).toEqual('auto');
    expect(Number(computedStyles.opacity)).toBeGreaterThan(0);
  });
})

