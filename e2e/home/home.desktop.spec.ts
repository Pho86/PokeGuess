import { test, expect, devices } from '@playwright/test'

let homePage = "http://localhost:3000/"
let pokeDexPage = "http://localhost:3000/pokedex"
let leaderboard = "http://localhost:3000/leaderboard"

test.use({
    browserName: "chromium",
    ...devices['Desktop Chrome']
})

test.describe('Desktop Home page tests', () => {
    test('check navbar routes to pokedex', async ({ page }) => {
        await page.goto(homePage);
        await page.click('text=Pokédex');
        await expect(page).toHaveURL(pokeDexPage)
    });
    
    test('check navbar routes to leaderboard', async ({ page }) => {
        await page.goto(homePage);
        await page.click('text=Leaderboard');
        await expect(page).toHaveURL(leaderboard)
    });

    test('check navbar routes to github and check for a new page', async ({ page, context }) => {
        await page.goto(homePage);
        const pagePromise = context.waitForEvent('page');
        await page.getByText('Made By: Pho86').click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        await expect(newPage).toHaveTitle('Pho86 (Philip Ho) · GitHub')
    });
})

test.describe('start the game', () => {
    test('find the start button and press it and type the wrong answer and find the submit button and look at the styling', async ({ page }) => {
        await page.goto(homePage)
        await page.click('text=Start!')
        const pokemoninput = await page.locator('input').type('meow meow', { delay: 50 });
        await page.click('text=Submit')
        await expect(page.locator('h3').last()).toContainText('You Lost.');
        const nameinput = await page.locator('input').last().type('My name Joe.', { delay: 50 });

        const Submit = await page.locator('button').last();

        const computedStyles = await Submit.evaluate((element) => {
            const styles = window.getComputedStyle(element);
            return {
                background: styles.backgroundColor,
                padding: styles.padding,
                cursor: styles.cursor
            };
        });
        expect(computedStyles.padding).toEqual('13.3333px');
        expect(computedStyles.background).toEqual('rgb(183, 196, 255)');
        expect(computedStyles.cursor).toEqual('pointer');
    })
})