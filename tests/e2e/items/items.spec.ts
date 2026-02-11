import { test, expect } from '@playwright/test'
import type { Item } from '../../../src/items/types/items'

let items: Item[]
test.describe('Items suite', () => {
  test.describe.configure({ mode: 'serial', retries: 0 })

  test.beforeEach(async ({ page, baseURL, request }) => {
    await page.goto(baseURL ?? '')
    const response = await request.get(`${process.env.API_URL}/items`)
    items = await response.json()
  })

  test('Create an item', async ({ page, baseURL }) => {
    const title = `New Item ${Date.now()}`

    await page.getByTestId('create-new-item').click()
    await page.fill('input[name="title"]', title)

    const createResponse = page.waitForResponse(response => {
      return response.url() === `${process.env.API_URL}/items`
        && response.request().method() === 'POST'
        && response.ok()
    })
    await page.click('button[type="submit"]')
    await createResponse

    await page.goto(baseURL ?? '')
    await expect(page.locator(`text=${title}`)).toBeVisible()
  })

  test('Read items', () => {
    expect(Array.isArray(items)).toBeTruthy()
  })

  test('Update an item', async ({ page, baseURL }) => {
    expect(items.length).toBeGreaterThan(0)
    const firstItem = items[0]
    const updatedTitle = `Updated Item ${Date.now()}`

    await page.getByTestId(`edit-button-${firstItem.id}`).click()
    await page.fill('input[name="new-title"]', updatedTitle)

    const updateResponse = page.waitForResponse(response => {
      return response.url() === `${process.env.API_URL}/items/${firstItem.id}`
        && response.request().method() === 'PUT'
        && response.ok()
    })
    await page.getByTestId(`update-button-${firstItem.id}`).click()
    await updateResponse

    await page.goto(baseURL ?? '')
    await expect(page.locator(`text=${updatedTitle}`)).toBeVisible()
  })

  test('Delete an item', async ({ page }) => {
    expect(items.length).toBeGreaterThan(0)
    const firstItem = items[0]
    await page.getByTestId(`delete-button-${firstItem.id}`).click()
    const confirmButton = page.getByTestId(`delete-confirm-button-${firstItem.id}`)
    await expect(confirmButton).toBeVisible()
    const deleteResponse = page.waitForResponse(response => {
      return response.url() === `${process.env.API_URL}/items/${firstItem.id}`
        && response.request().method() === 'DELETE'
        && response.ok()
    })
    await confirmButton.click()
    await deleteResponse
    await expect(page.locator(`text=${firstItem.title}`)).not.toBeVisible()
  })
})
