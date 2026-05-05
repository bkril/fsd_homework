---
paths: ["tests/**/*.ts"]
---

# E2E Testing Rules

E2E only (Playwright). No unit tests exist in this project.

## File location

`tests/e2e/flows/<feature>.spec.ts` — one file per feature flow.

## Auth

Auth is handled globally via `tests/e2e/global.setup.ts` and stored in
`tests/e2e/.auth/user.json`. All tests in `chromium` project run pre-authenticated.
Never repeat the login flow inside spec files — the storage state handles it.

## Structure

```typescript
import { expect, test } from "@playwright/test";

test.describe("<Feature> <page>", () => {
  test("<describes what user sees or does>", async ({ page }) => {
    await page.goto("/en/<route>");
    // assertions
  });
});
```

- Always use `/en/<route>` in `page.goto` (locale prefix required).
- Group related tests in `test.describe`.
- Test descriptions: present tense, user perspective ("displays ...", "filters ... when ...").

## Selectors

Use `data-testid` attributes exclusively:

```typescript
page.locator('[data-testid="country-card"]')
page.locator('[data-testid="search-input"]')
```

Never use CSS classes, tag names, or text selectors — they break on refactor.
When adding tests for new UI, add `data-testid` to the component first.

## Async assertions

Async content needs explicit timeout:

```typescript
await expect(cards.first()).toBeVisible({ timeout: 10_000 });
```

Default Playwright timeout is too short for server-rendered pages with data fetching.

## Common assertions

```typescript
await expect(page).toHaveURL(/\/en\/countries\/[A-Z]{3}/);
await expect(el).toContainText("Germany");
await expect(el).toHaveCount(1, { timeout: 5_000 });
await expect(el).toBeVisible({ timeout: 10_000 });
```

## What to test

- Happy path navigation (goto → visible content)
- User interactions that change visible state (search, filter, click → navigate)
- URL changes after navigation

Do not test: loading spinners, exact styling, implementation details.
