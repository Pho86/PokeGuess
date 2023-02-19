import { test, expect, devices } from '@playwright/test'

let homePage = "http://localhost:3000/"
let pokeDexPage = "http://localhost:3000/pokedex"

test.use({
    browserName: "chromium",
    ...devices['Desktop Chrome']
})

test.describe('Desktop Home page tests', () => {
    test('check navbar routes', async ({ page }) => {
        await page.goto(homePage);
        await page.click('text=Pokédex');
        await expect(page).toHaveURL(pokeDexPage)
    });
})