import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const out = join(root, 'figma-design')
const desktop = ['home', 'research', 'animation', 'dance', 'me']
const mobile = ['home', 'research', 'animation', 'dance', 'me']

const esc = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
}[char]))

async function dataUri(filename) {
  const bytes = await readFile(join(out, filename))
  return `data:image/png;base64,${bytes.toString('base64')}`
}

const desktopGap = 120
const mobileGap = 80
const margin = 120
const labelHeight = 70
const desktopY = margin + labelHeight
const mobileY = desktopY + 1000 + 180
const width = margin * 2 + desktop.length * 1440 + (desktop.length - 1) * desktopGap
const height = mobileY + 844 + margin

const parts = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
  '<rect width="100%" height="100%" fill="#E9EDE7"/>',
  '<style>text{font-family:"Space Grotesk",Arial,sans-serif;fill:#234839}.section{font-size:36px;font-weight:600}.label{font-size:24px;font-weight:500}</style>',
  `<text class="section" x="${margin}" y="70">Website — Desktop · 1440 × 1000</text>`,
]

for (let i = 0; i < desktop.length; i++) {
  const name = desktop[i]
  const x = margin + i * (1440 + desktopGap)
  parts.push(`<g id="desktop-${name}">`)
  parts.push(`<text class="label" x="${x}" y="${desktopY - 24}">${esc(name[0].toUpperCase() + name.slice(1))}</text>`)
  parts.push(`<rect x="${x - 2}" y="${desktopY - 2}" width="1444" height="1004" fill="#fff" stroke="#C9D1C7" stroke-width="4"/>`)
  parts.push(`<image x="${x}" y="${desktopY}" width="1440" height="1000" href="${await dataUri(`desktop-${name}.png`)}"/>`)
  parts.push('</g>')
}

parts.push(`<text class="section" x="${margin}" y="${mobileY - 78}">Website — Mobile · 390 × 844</text>`)
for (let i = 0; i < mobile.length; i++) {
  const name = mobile[i]
  const x = margin + i * (390 + mobileGap)
  parts.push(`<g id="mobile-${name}">`)
  parts.push(`<text class="label" x="${x}" y="${mobileY - 24}">${esc(name[0].toUpperCase() + name.slice(1))}</text>`)
  parts.push(`<rect x="${x - 2}" y="${mobileY - 2}" width="394" height="848" fill="#fff" stroke="#C9D1C7" stroke-width="4"/>`)
  parts.push(`<image x="${x}" y="${mobileY}" width="390" height="844" href="${await dataUri(`mobile-${name}.png`)}"/>`)
  parts.push('</g>')
}
parts.push('</svg>')

await writeFile(join(out, 'website-figma-import.svg'), parts.join('\n'))

const tokens = {
  meta: {
    name: 'Tom Eijkelenkamp website',
    capturedDesktop: '1440x1000',
    capturedMobile: '390x844',
    note: 'WebGL motion and backdrop blur are preserved in pixel-perfect reference layers.'
  },
  colors: {
    ink: '#234839',
    inkActive: '#173B2B',
    canvas: '#F8FCF8',
    overlay: 'rgba(248,252,248,0.76)',
    triangleLime: '#A9F20D',
    triangleMint: '#C6F887'
  },
  typography: {
    primary: 'Marcellus Local',
    fallback: 'Space Grotesk',
    navigation: { size: 18, weight: 500, letterSpacingEm: -0.035 },
    heading: { size: 17, weight: 500, letterSpacingEm: -0.035 },
    body: { size: 14, weight: 400, lineHeight: 1.55 }
  },
  layout: {
    overlayMaxWidth: 1120,
    overlayWidth: '88vw',
    desktopBreakpoint: 760,
    desktopResearchColumns: 2,
    desktopDanceColumns: 3,
    mobileColumns: 1
  }
}
await writeFile(join(out, 'design-tokens.json'), JSON.stringify(tokens, null, 2))
