import path from 'node:path'
import sharp from 'sharp'

const publicDir = path.resolve('public')
const sourceDir = path.resolve('design/source-assets')

const webpJobs = [
  ['paper-texture-white.png', 'paper-texture-white.webp', { quality: 76, effort: 6 }],
  ['design/torn-paper-sheet-cream-02(1).png', 'design/torn-paper-sheet-cream-02.webp', { quality: 82, alphaQuality: 90, effort: 6 }],
  ['me/me.jpg', 'me/me.webp', { quality: 82, effort: 6 }],
  ['dance/love-letters.jpg', 'dance/love-letters.webp', { quality: 80, effort: 6 }],
  ['dance/untitled.jpg', 'dance/untitled.webp', { quality: 80, effort: 6 }],
  ['dance/untitled-2026.jpg', 'dance/untitled-2026.webp', { quality: 80, effort: 6 }],
  ['research/master_thesis_front_page_compressed.png', 'research/master-thesis.webp', { quality: 80, effort: 6 }],
  ['research/correlations_to_popularity_front_page_compressed.png', 'research/correlations-to-popularity.webp', { quality: 80, effort: 6 }],
  ['research/research_internship_front_page_compressed.png', 'research/research-internship.webp', { quality: 80, effort: 6 }],
  ['research/subdivision_shading_front_page_compressed.png', 'research/subdivision-shading.webp', { quality: 80, effort: 6 }],
  ['animation/painted-figure.png', 'animation/painted-figure.webp', { quality: 80, effort: 6 }],
  ['animation/moon.png', 'animation/moon.webp', { quality: 80, effort: 6 }],
  ['animation/fire.png', 'animation/fire.webp', { quality: 80, effort: 6 }],
  ['animation/creature.png', 'animation/creature.webp', { quality: 80, effort: 6 }],
]

await Promise.all(webpJobs.map(([input, output, options]) =>
  sharp(path.join(sourceDir, input))
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp(options)
    .toFile(path.join(publicDir, output))
))

const leafSources = [
  'image-from-rawpixel-id-13095024-png.png',
  'image-from-rawpixel-id-13095633-png.png',
  'image-from-rawpixel-id-13096138-png.png',
  'image-from-rawpixel-id-14061500-png.png',
]
const cell = 512

async function createLeafTile(source) {
  const input = path.join(sourceDir, 'design', source)
  const { data, info } = await sharp(input)
    .rotate()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: imageWidth, height: imageHeight, channels } = info
  const center = Math.round(imageWidth / 2)
  const rowInset = Math.max(2, Math.round(imageWidth * 0.012))
  const halfWidths = new Float32Array(imageHeight)

  for (let y = 0; y < imageHeight; y++) {
    let left = center
    let right = center
    while (left > 0 && data[(y * imageWidth + left) * channels + 3] >= 220) left--
    while (right < imageWidth - 1 && data[(y * imageWidth + right) * channels + 3] >= 220) right++
    halfWidths[y] = Math.max(0, Math.min(center - left, right - center) - rowInset)
  }

  const firstLeafRow = halfWidths.findIndex(width => width > rowInset)
  const topStart = Math.max(0, firstLeafRow)
  const topEnd = Math.min(Math.round(imageHeight * 0.18), topStart + Math.round(imageHeight * 0.12))
  const bottomStart = Math.round(imageHeight * 0.5)
  const bottomEnd = Math.round(imageHeight * 0.82)
  let best = {
    score: 0,
    top: topStart,
    bottom: Math.round(imageHeight * 0.72),
    width: imageWidth * 0.5,
  }

  for (let top = topStart; top <= topEnd; top += 3) {
    for (let bottom = bottomStart; bottom <= bottomEnd; bottom += 3) {
      const height = bottom - top
      if (height <= 0) continue
      let maxCropWidth = Infinity
      let valid = true

      for (let y = top + 2; y <= bottom; y += 2) {
        const triangleWidthAtRow = (y - top) / height
        if (triangleWidthAtRow < 0.035) continue
        const available = halfWidths[y]
        if (available <= 0) {
          valid = false
          break
        }
        maxCropWidth = Math.min(maxCropWidth, (available * 2) / triangleWidthAtRow)
      }

      if (!valid || !Number.isFinite(maxCropWidth)) continue
      maxCropWidth = Math.min(maxCropWidth, imageWidth * 0.96)
      const score = maxCropWidth * height
      if (score > best.score) best = { score, top, bottom, width: maxCropWidth }
    }
  }

  if (best.score === 0) throw new Error(`No opaque triangular crop found in ${source}`)

  const safeWidth = Math.max(8, best.width * 0.94)
  const verticalInset = Math.max(1, (best.bottom - best.top) * 0.012)
  const left = Math.max(0, Math.round(center - safeWidth / 2))
  const top = Math.max(0, Math.round(best.top + verticalInset))
  const width = Math.min(imageWidth - left, Math.max(8, Math.round(safeWidth)))
  const height = Math.min(imageHeight - top, Math.max(8, Math.round(best.bottom - best.top - verticalInset * 2)))

  return sharp(input)
    .rotate()
    .extract({ left, top, width, height })
    .resize(cell, cell, { fit: 'fill' })
    .webp({ quality: 84, alphaQuality: 100, effort: 6 })
    .toBuffer()
}

const tiles = await Promise.all(leafSources.map(createLeafTile))

await sharp({
  create: { width: cell * 2, height: cell * 2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite(tiles.map((input, index) => ({
    input,
    left: (index % 2) * cell,
    top: Math.floor(index / 2) * cell,
  })))
  .webp({ quality: 84, alphaQuality: 90, effort: 6 })
  .toFile(path.join(publicDir, 'design', 'leaf-atlas.webp'))

console.log('Optimized images and leaf atlas generated.')
