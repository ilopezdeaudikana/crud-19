import { test, expect } from '@playwright/test'
import type { Item } from '../../src/types'

let items: Item[]
test.describe('CRUD operations', () => {

  test.beforeEach(async ({ page, baseURL, request }) => {
    await page.goto(baseURL ?? '')
    const response = await request.get(`${process.env.API_URL}/items`)
    items = await response.json()
  })

  test('Create an item', async ({ page }) => {
    await page.fill('input[name="title"]', 'New Item')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=New Item')).toBeVisible()
  })

  test('Read items', () => {
    expect(Array.isArray(items)).toBeTruthy()
  })

  test('Update an item', async ({ page, baseURL }) => {
    const firstItem = items[0]
    await page.getByTestId(`edit-button-${firstItem.id}`).click()
    await page.fill('input[name="new-title"]', 'Updated Item')
    await page.getByTestId(`update-button-${firstItem.id}`).click()
    await page.goto(baseURL ?? '')
    await expect(page.locator('text=Updated Item')).toBeVisible()
  })

  test('Delete an item', async ({ page }) => {
    const firstItem = items[0]
    await page.getByTestId(`delete-button-${firstItem.id}`).click()
    await expect(page.locator(`text=${firstItem.title}`)).not.toBeVisible()
  })
})
