import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const PORT = 4399
const BASE = `http://localhost:${PORT}`

if (!fs.existsSync(path.join(root, 'dist', 'index.html'))) {
  console.error('assistant-check: dist/index.html missing — run `npm run build` first')
  process.exit(1)
}

const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')
const server = spawn(process.execPath, [viteBin, 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: root,
  stdio: 'ignore',
})

async function waitForServer(timeoutMs = 30000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(BASE)
      if (res.ok) return
    } catch {
      /* not up yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 300))
  }
  throw new Error('preview server did not start')
}

const failures = []
function check(label, ok, detail = '') {
  if (ok) {
    console.log(`assistant-check: ok ${label}`)
  } else {
    failures.push(label)
    console.error(`assistant-check: FAIL ${label}${detail ? ` — ${detail}` : ''}`)
  }
}

let browser
try {
  await waitForServer()
  browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 })

  await page.getByRole('button', { name: /assist/i }).click()
  const dialog = page.locator('[role="dialog"]')
  await dialog.waitFor({ state: 'visible', timeout: 5000 })

  const body = () => dialog.evaluate((el) => el.textContent ?? '')
  const countIn = (text, needle) => text.split(needle).length - 1

  const greeting = await body()
  check('greeting mentions Carlos', greeting.includes('Carlos'), greeting.slice(0, 160))

  const chips = dialog.locator('button').filter({ hasText: /Carlos/i })
  if ((await chips.count()) > 0) {
    const handle = await dialog.elementHandle()
    const min = countIn(await body(), 'Carlos Daniel da Silva Alencar') + 1
    await chips.first().click()
    const ok = await page
      .waitForFunction(
        ({ el, needle, minCount }) => {
          const text = el.textContent ?? ''
          return text.split(needle).length - 1 >= minCount
        },
        { el: handle, needle: 'Carlos Daniel da Silva Alencar', minCount: min },
        { timeout: 6000 },
      )
      .then(() => true)
      .catch(() => false)
    check('chip question answers who Carlos is', ok, (await body()).slice(-240))
  } else {
    check('chip question answers who Carlos is', false, 'no Carlos chip found')
  }

  async function ask(question, expected) {
    const input = dialog.locator('input')
    const before = await body()
    const min = countIn(before, expected) + 1
    await input.fill(question)
    await input.press('Enter')
    const handle = await dialog.elementHandle()
    const ok = await page
      .waitForFunction(
        ({ el, needle, minCount }) => {
          const text = el.textContent ?? ''
          return text.split(needle).length - 1 >= minCount
        },
        { el: handle, needle: expected, minCount: min },
        { timeout: 6000 },
      )
      .then(() => true)
      .catch(() => false)
    check(`"${question}" -> contains "${expected}"`, ok, (await body()).slice(-240))
  }

  await ask('qual a stack do clubeon?', 'PostgreSQL')
  await ask('quem usou supabase?', 'Supabase')
  await ask('zxcvbnm', 'ClubeON')
} catch (err) {
  failures.push('runtime')
  console.error('assistant-check: error', err)
} finally {
  if (browser) await browser.close().catch(() => {})
  server.kill()
}

if (failures.length > 0) {
  console.error(`assistant-check: ${failures.length} failure(s)`)
  process.exit(1)
}
console.log('assistant-check: all good')
