import { test, expect, devices } from '@playwright/test'

let homePage = "http://localhost:3000/"
let pokeDexPage = "http://localhost:3000/pokedex"

test.use({
    browserName: "chromium",
    ...devices['iPad Air']
})

// these tests will take time to allow colours to fully change to their expected color 

test.describe('guess pokemon page filters', () => {
    test('press filters on right side and check for it classes', async ({ page }) => {
        await page.goto(homePage);
        await page.click('text=Gen 1');
        await page.click('text=Gen 3');
        await page.click('text=Gen 5');
        await page.click('text=Gen 7');

        const Gen3Tab = await page.locator('div', { has: page.locator('text="Gen 3"') }).last();
        await page.waitForTimeout(5000);
        const computedStyles = await Gen3Tab.evaluate((element) => {
            const styles = window.getComputedStyle(element);
            return {
                background: styles.backgroundColor,
                marginLeft: styles.marginLeft
            };
        });

        expect(computedStyles.marginLeft).toEqual('-8px');
        expect(computedStyles.background).toEqual('rgb(255, 146, 141)');
    })

    test('press filters on left side and check for it classes', async ({ page }) => {
        await page.goto(homePage);
        await page.click('text=B&W');
        await page.click('text=1 Sec');
        await page.click('text=Blur');
        await page.waitForTimeout(5000);
        const BlurTab = await page.locator('div', { has: page.locator('text="Blur"') }).last();
        const computedStyles = await BlurTab.evaluate((element) => {
            const styles = window.getComputedStyle(element);
            return {
                background: styles.backgroundColor,
                marginRight: styles.marginRight
            };
        });

        expect(computedStyles.marginRight).toEqual('-8px');
        expect(computedStyles.background).toEqual('rgb(113, 217, 105)');
    })
})

test.describe('check card styling', () => {
    test('check h1 styling font size', async ({ page }) => {
        await page.goto(homePage);
        const h1 = page.locator('h1').last();
        await expect(h1).toContainText("Who's That Pokémon?")
        const computedStyles = await h1.evaluate((element) => {
            const styles = window.getComputedStyle(element);
            return {
                fontSize: styles.fontSize,
                textAlign: styles.textAlign
            };
        });
        expect(computedStyles.textAlign).toEqual('center');
        expect(computedStyles.fontSize).toEqual('32px');
    })
})