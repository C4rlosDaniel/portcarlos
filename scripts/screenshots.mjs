import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const targets = [
  { url: 'https://myfly.vercel.app', out: 'public/projects/myfly/cover.png' },
  { url: 'https://clubingo.vercel.app', out: 'public/projects/clubingo/cover.png' },
  { url: 'https://clubstrategy.clubepirassununga.com.br', out: 'public/projects/clubstrategy/cover.png' },
]

const clubeonDir = path.join(root, 'public/projects/clubeon')

function ensureClubeonPlaceholder() {
  try {
    fs.mkdirSync(clubeonDir, { recursive: true })
    const readme = path.join(clubeonDir, 'README.txt')
    if (!fs.existsSync(readme)) {
      fs.writeFileSync(
        readme,
        'Carlos: place sanitized screenshots here (cover.webp, gallery-1.webp...).\n',
      )
    }
    const existing = fs.readdirSync(clubeonDir).some((f) => /^cover\.(png|webp)$/i.test(f))
    const placeholder = path.join(clubeonDir, 'cover.png')
    if (!existing && !fs.existsSync(placeholder)) {
      const svg = `<svg width="876" height="632" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/>
</linearGradient></defs>
<rect width="876" height="632" fill="url(#g)"/>
<rect x="40" y="40" width="796" height="552" fill="none" stroke="white" stroke-opacity="0.4" stroke-width="2" rx="14"/>
<text x="438" y="310" text-anchor="middle" font-family="monospace" font-size="46" font-weight="bold" fill="white">CLUBEON</text>
<text x="438" y="360" text-anchor="middle" font-family="monospace" font-size="20" fill="white" fill-opacity="0.85">screenshot em breve</text>
</svg>`
      void sharp(Buffer.from(svg)).png().toFile(placeholder)
      console.log('clubeon placeholder created')
    }
  } catch (err) {
    console.warn('clubeon placeholder failed:', err.message)
  }
}

ensureClubeonPlaceholder()

let browser
try {
  browser = await chromium.launch()
} catch (err) {
  console.warn('screenshots: could not launch chromium:', err.message)
  process.exit(0)
}

for (const target of targets) {
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 })
    try {
      await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 })
    } catch {
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await page.waitForTimeout(6000)
    }
    await page.waitForTimeout(2000)
    fs.mkdirSync(path.dirname(path.join(root, target.out)), { recursive: true })
    await page.screenshot({ path: path.join(root, target.out) })
    await page.close()
    console.log(`screenshots: ok ${target.url} -> ${target.out}`)
  } catch (err) {
    console.warn(`screenshots: failed ${target.url} (${err.message})`)
  }
}

await browser.close()