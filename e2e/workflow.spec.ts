import { test, expect } from '@playwright/test'

for (const mobile of [false, true])
  test(`job application workflow (${mobile ? 'mobile' : 'desktop'})`, async ({
    page,
    context,
    browser,
    baseURL,
  }) => {
    if (mobile) await page.setViewportSize({ width: 390, height: 844 })
    const api = process.env.VISITOR_API_URL || 'http://127.0.0.1:5215'
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/companies')
    await expect
      .poll(() =>
        page.evaluate(() => sessionStorage.getItem('tofu-jobs-visitor-session'))
      )
      .not.toBeNull()
    const session = await page.evaluate(() =>
      JSON.parse(sessionStorage.getItem('tofu-jobs-visitor-session') || '{}')
    )
    const headers = { Authorization: `Bearer ${session.accessToken}` }
    try {
      await page
        .getByRole('button', { name: 'Create Company', exact: true })
        .click()
      const dialog = page.getByRole('dialog')
      await dialog
        .getByLabel('Name', { exact: false })
        .fill('Synthetic Company')
      await dialog
        .getByLabel('Location', { exact: false })
        .fill('San Francisco')
      await page.route('**/Company', route =>
        route.request().method() === 'POST'
          ? route.fulfill({
              status: 503,
              contentType: 'application/json',
              body: '{"error":"Temporary demo failure"}',
            })
          : route.continue()
      )
      await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
      await expect(
        page.getByText('Temporary demo failure', { exact: true })
      ).toBeVisible()
      await expect(dialog.getByLabel('Name', { exact: false })).toHaveValue(
        'Synthetic Company'
      )
      await page.unroute('**/Company')
      await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
      await expect(
        page.getByRole('row').filter({ hasText: 'Synthetic Company' })
      ).toHaveCount(1)
      await page.goto('/jobs')
      await page
        .getByRole('button', { name: 'Create Job List', exact: true })
        .click()
      await dialog.getByLabel('Title', { exact: false }).fill('Applied')
      await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
      await expect(page.getByText('Applied', { exact: true })).toBeVisible()
      await page
        .getByRole('button', { name: 'Create job', exact: true })
        .last()
        .click()
      await dialog.getByRole('searchbox', { name: 'Company', exact: true }).fill('Synthetic')
      await page
        .getByRole('option', { name: 'Synthetic Company', exact: true })
        .click()
      await dialog
        .getByLabel('Title', { exact: false })
        .fill('Product Engineer')
      await dialog.getByLabel('Location', { exact: false }).fill('Remote')
      await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
      await expect(
        page.getByText('Product Engineer', { exact: true })
      ).toBeVisible()
      await page.reload()
      await expect(
        page.getByText('Product Engineer', { exact: true })
      ).toBeVisible()
      await page.goto('/activities')
      await page
        .getByRole('button', { name: 'Create Activity', exact: true })
        .click()
      await dialog.getByLabel('Title', { exact: false }).fill('Follow up')
      await dialog.getByRole('searchbox', { name: 'Job', exact: true }).fill('Product')
      await page
        .getByRole('option', { name: 'Product Engineer', exact: true })
        .click()
      await dialog.getByLabel('Notes').fill('Send an update tomorrow')
      await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
      const activity = page.getByRole('article', {
        name: 'Follow up',
        exact: true,
      })
      await expect(activity.getByText('Send an update tomorrow')).toBeVisible()
      await activity.getByRole('button', { name: 'Edit', exact: true }).click()
      await dialog.getByLabel('Notes').fill('Updated follow-up note')
      await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
      await expect(dialog).toHaveCount(0)
      await expect(activity.getByText('Updated follow-up note')).toBeVisible()
      await page.reload()
      await expect(activity.getByText('Updated follow-up note')).toBeVisible()
      await page.goto('/cover-letters')
      await page
        .getByRole('button', { name: 'Create Cover Letter', exact: true })
        .click()
      await dialog
        .getByLabel('Title', { exact: false })
        .fill('Product role letter')
      await dialog
        .getByLabel('Document URL')
        .fill('https://example.invalid/letter')
      await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
      await expect(
        page.getByRole('link', { name: 'Open document' })
      ).toHaveAttribute('href', 'https://example.invalid/letter')
      await page.goto('/interviews')
      await page
        .getByRole('button', { name: 'Create Interview', exact: true })
        .click()
      await dialog.getByRole('searchbox', { name: 'Job', exact: true }).fill('Product')
      await page
        .getByRole('option', { name: 'Product Engineer', exact: true })
        .click()
      const date = new Date().toISOString().slice(0, 10)
      await dialog.getByLabel('Start', { exact: false }).fill(`${date}T10:00`)
      await dialog.getByLabel('End', { exact: false }).fill(`${date}T11:00`)
      await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
      await expect(dialog).toHaveCount(0)
      await expect(
        page.getByText(
          'Company: Synthetic Company Job: Product Engineer, Round: 1',
          { exact: true }
        )
      ).toBeVisible()
      await page.reload()
      await expect(
        page.getByText(
          'Company: Synthetic Company Job: Product Engineer, Round: 1',
          { exact: true }
        )
      ).toBeVisible()
      const other = await browser.newContext({ baseURL })
      try {
        const otherPage = await other.newPage()
        await otherPage.goto('/companies')
        await expect
          .poll(() =>
            otherPage.evaluate(() =>
              sessionStorage.getItem('tofu-jobs-visitor-session')
            )
          )
          .not.toBeNull()
        await expect(
          otherPage.getByText('Synthetic Company', { exact: true })
        ).toHaveCount(0)
        const otherSession = await otherPage.evaluate(() =>
          JSON.parse(
            sessionStorage.getItem('tofu-jobs-visitor-session') || '{}'
          )
        )
        await other.request.delete(`${api}/demo/session`, {
          headers: { Authorization: `Bearer ${otherSession.accessToken}` },
        })
      } finally {
        await other.close()
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      ).toBe(true)
      await page
        .getByRole('button', { name: 'Reset demo', exact: true })
        .click()
      await expect
        .poll(async () =>
          (await context.request.get(`${api}/Company`, { headers })).status()
        )
        .toBe(401)
      expect(errors).toEqual([])
    } finally {
      await context.request.delete(`${api}/demo/session`, { headers })
    }
  })
