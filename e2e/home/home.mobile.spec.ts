import { test, expect, devices } from '@playwright/test'

let homePage = "http://localhost:3000/"
let pokeDexPage = "http://localhost:3000/pokedex"

test.use({
    browserName: "chromium",
    ...devices['iPhone XR']
})

test.describe('check the pokecard mobile', () => {
    test('check amount of images before and after starting the game', async ({ page }) => {
        await page.goto(homePage);
        await expect(page.locator('img')).toHaveCount(0);
        await page.click('text=Start!')
        await expect(page.locator('img')).toHaveCount(1);
    })
    
    test('check the top tabs text and start', async ({ page }) => {
        await page.goto(homePage);
        await expect(page.locator('p').first()).toContainText('Time: 0');
        await expect(page.locator('p').getByText('Score: 0')).toContainText('Score: 0');
        await page.click('text=Start!');

    })
    
    test('check the input styling after starting', async ({page})=> {
        await page.goto(homePage);
        await page.click('text=Start!')
        const input = await page.locator('input')
        const pokemoninput = await page.locator('input').type('meow meow', { delay: 50 });
        const computedStyles = await input.evaluate((element) => {
            const styles = window.getComputedStyle(element);
            return {
                padding: styles.padding,
                outline: styles.outline
            };
        });
        expect(computedStyles.padding).toEqual('13.3333px');
        expect(computedStyles.outline).toEqual('rgb(0, 0, 0) none 0px');
    })
})