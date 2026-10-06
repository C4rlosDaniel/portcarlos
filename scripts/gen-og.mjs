import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#07080d"/><stop offset="1" stop-color="#161927"/>
</linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<circle cx="600" cy="290" r="180" fill="none" stroke="#7c5cff" stroke-width="3" opacity="0.5"/>
<circle cx="600" cy="290" r="120" fill="none" stroke="#7c5cff" stroke-width="3" opacity="0.8"/>
<circle cx="600" cy="290" r="55" fill="#7c5cff"/>
<text x="600" y="312" text-anchor="middle" font-family="monospace" font-size="42" font-weight="bold" fill="#e8eaf2">Carlos Daniel</text>
<text x="600" y="470" text-anchor="middle" font-family="monospace" font-size="26" fill="#22d3ee">Analista de Sistemas &amp; Automação</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(path.join(root, 'public', 'og-image.png'))
console.log('og-image generated')