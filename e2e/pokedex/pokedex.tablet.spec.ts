import { test, expect, devices } from '@playwright/test'

let homePage = "http://localhost:3000/"
let pokeDexPage = "http://localhost:3000/pokedex"

test.use({
    browserName: "chromium",
    ...devices['iPad Air']
})

test.describe('Tablet PokeDex Page head content elements', () => {
    test('check the title', async ({ page }) => {
        await page.goto(pokeDexPage)

        await expect(page).toHaveTitle('PokéDex | PokéGuess');
    })
    test('check the meta description tags', async ({ page }) => {
        await page.goto(pokeDexPage)

        const metaDescription = page.locator('meta[name="description"]')
        await expect(metaDescription).toHaveAttribute("content", "Who's that Pokémon? with PokéGuess.")
    })
})

test.describe('Tablet Pokedex page tests', () => {
    test('check pokedex grid for styling and elements changse', async ({ page }) => {
        await page.goto(pokeDexPage);
        const main = page.locator('main > div');
        const computedStyles = await main.evaluate((element) => {
            const styles = window.getComputedStyle(element);
            return {
                gridGap: styles.gap
            };
        });
        expect(computedStyles.gridGap).toEqual('24px');
    })
})


test.describe('interacting with the pokedex area', () => {
    test('find gligar and look at his styling', async ({ page }) => {
        await page.goto(pokeDexPage);
        const pokecard = page.locator('#Gligar-card > div')
        const computedStyles = await pokecard.evaluate((element) => {
            const styles = window.getComputedStyle(element);
            return {
                padding: styles.padding,
                textAlign: styles.textAlign,
                border: styles.border,
                gap: styles.gap
            };
        });

        expect(computedStyles.padding).toEqual('28.8px');
        expect(computedStyles.textAlign).toEqual('center');
        expect(computedStyles.border).toEqual('0px none rgb(0, 0, 0)');
        expect(computedStyles.gap).toEqual('4.8px');
    });
})

