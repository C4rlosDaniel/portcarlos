import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..', 'public', 'projects')

const sourceImage = (file) => /\.(png|jpe?g)$/i.test(file)

const resizeOpts = (width, height) => ({
  width,
  ...(height ? { height, fit: 'cover' } : { withoutEnlargement: true }),
})

if (!fs.existsSync(root)) {
  console.log('thumbs: no project images yet')
  process.exit(0)
}

const projects = fs.readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory())

for (const project of projects) {
  const dir = path.join(root, project.name)
  const files = fs.readdirSync(dir).filter(sourceImage)
  for (const file of files) {
    const base = path.parse(file).name
    const src = path.join(dir, file)
    const emit = async (name, width, height) => {
      await sharp(src).resize(resizeOpts(width, height)).webp({ quality: 80 }).toFile(path.join(dir, name))
    }
    try {
      if (base === 'cover') {
        await emit('cover.webp', 876, 632)
        await emit('gallery-1.webp', 1600)
        await emit('gallery-1-thumb.webp', 220, 160)
      } else if (base.startsWith('gallery')) {
        const suffix = base.slice('gallery'.length)
        await emit(`gallery${suffix}.webp`, 1600)
        await emit(`gallery${suffix}-thumb.webp`, 220, 160)
      } else {
        continue
      }
      fs.rmSync(src)
      console.log(`thumbs: ${project.name}/${file} -> webp`)
    } catch (err) {
      console.warn(`thumbs: failed ${file} (${err.message})`)
    }
  }
}