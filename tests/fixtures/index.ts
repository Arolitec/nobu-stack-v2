import { test as base } from '@playwright/test'

type Fixture = Record<string, never>

const test = base.extend<Fixture>({})

test.describe.configure({ mode: process.env.CI ? 'parallel' : 'serial' })

export { expect } from '@playwright/test'
export { test }
