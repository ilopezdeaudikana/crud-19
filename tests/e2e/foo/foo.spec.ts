import { test, expect } from '@playwright/test'
import type { Foo } from '../../../src/foo/types/foo'

let foo: Foo[]
test.describe('Foo operations', () => {
  test.describe.configure({ mode: 'serial', retries: 0 })

  test.beforeEach(async ({ page, baseURL, request }) => {
    await page.goto(`${baseURL}/foo`)
    const response = await request.get(`${process.env.API_URL}/foo`)
    foo = await response.json()
  })

  test('Create a foo', async ({ page, baseURL }) => {
    const title = `New Foo ${Date.now()}`

    await page.getByTestId('create-new-foo').click()
    await page.fill('input[name="bar"]', title)
    await page.fill('input[name="baz"]', 'baz')
    const createResponse = page.waitForResponse(response => {
      return response.url() === `${process.env.API_URL}/foo`
        && response.request().method() === 'POST'
        && response.ok()
    })
    await page.click('button[type="submit"]')
      await createResponse

    await page.goto(`${baseURL}/foo`)
    await expect(page.locator(`text=${title}`)).toBeVisible()
  })

  test('Read Foo', () => {
    expect(Array.isArray(foo)).toBeTruthy()
  })

  test('Update a foo', async ({ page }) => {
    expect(foo.length).toBeGreaterThan(0)
    const firstItem = foo[0]
    const updatedBar = `Updated Foo ${Date.now()}`

    await page.getByTestId(`edit-foo-${firstItem.id}`).click()
    await page.fill('input[name="new-bar"]', updatedBar)

    const updateResponse = page.waitForResponse(response => {
      return response.url() === `${process.env.API_URL}/foo/${firstItem.id}`
        && response.request().method() === 'PUT'
        && response.ok()
    })
    await page.getByTestId(`save-foo-${firstItem.id}`).click()
    await updateResponse

    await expect(page.locator(`text=${updatedBar}`)).toBeVisible()
  })

  test('Delete a foo', async ({ page }) => {
    expect(foo.length).toBeGreaterThan(0)
    const firstItem = foo[0]

    const deleteResponse = page.waitForResponse(response => {
      return response.url() === `${process.env.API_URL}/foo/${firstItem.id}`
        && response.request().method() === 'DELETE'
        && response.ok()
    })
    await page.getByTestId(`delete-foo-${firstItem.id}`).click()
    await deleteResponse
    await expect(page.locator(`text=${firstItem.bar}`)).not.toBeVisible()
  })

})
