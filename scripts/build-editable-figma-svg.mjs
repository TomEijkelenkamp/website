import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const outDir = join(root, 'figma-design')
await mkdir(outDir, { recursive: true })

const image64 = (await readFile(join(root, 'public', 'me', 'me.jpg'))).toString('base64')

async function icon(name, x, y, size) {
  const source = await readFile(join(root, 'public', 'icons', `${name}.svg`), 'utf8')
  const viewBox = source.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 512 512'
  const path = source.match(/<path d="([^"]+)"/)?.[1] ?? ''
  return `<svg id="Social / ${name}" x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${viewBox}" fill="#234839"><path id="${name} vector" d="${path}"/></svg>`
}

function navigation(prefix) {
  const items = [
    ['Research', 1047], ['Animation', 1158], ['Dance', 1285], ['Me', 1376]
  ]
  return `<g id="${prefix} / Navigation">${items.map(([label, x]) =>
    `<text id="Nav / ${label}" x="${x}" y="36" fill="url(#${prefix}-nav-gradient)" font-family="Marcellus" font-size="21" font-weight="700" letter-spacing="-0.735">${label}</text>`
  ).join('')}</g>`
}

function triangles(prefix, opacity = 1) {
  const defs = [
    ['01', '1282,0 1440,0 1408,132', '#9EE605'],
    ['02', '965,108 1020,56 1039,128', '#EAFFD8'],
    ['03', '1118,114 1140,126 1118,137', '#9EE605'],
    ['04', '686,423 737,307 812,407', '#EAFFD8'],
    ['05', '497,575 586,361 727,548', '#9EE605'],
    ['06', '1074,402 1245,347 1207,523', '#EAFFD8'],
    ['07', '903,535 1184,534 1045,781', '#EAFFD8'],
    ['08', '226,803 644,654 578,1000 464,1000', '#9EE605']
  ]
  return `<g id="${prefix} / Editable triangles" opacity="${opacity}">${defs.map(([n,p,c]) => `<polygon id="Triangle ${n}" points="${p}" fill="${c}"/>`).join('')}</g>`
}

const linkedin = await icon('linkedin', 712, 510.5, 38)
const github = await icon('github', 770, 510.5, 38)
const instagram = await icon('instagram', 828, 510.5, 38)
const email = await icon('email', 886, 510.5, 38)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="3040" height="1160" viewBox="0 0 3040 1160">
  <rect id="File canvas" width="3040" height="1160" fill="#E9EDE7"/>
  <text id="Label / Landing" x="80" y="48" fill="#234839" font-family="Space Grotesk" font-size="26" font-weight="500">Landing · 1440 × 1000</text>
  <text id="Label / Me" x="1600" y="48" fill="#234839" font-family="Space Grotesk" font-size="26" font-weight="500">Me overlay · 1440 × 1000</text>

  <g id="Screen / Landing" transform="translate(80 80)">
    <defs>
      <linearGradient id="Landing-text-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#720004"/><stop offset="1" stop-color="#FF7091"/></linearGradient>
      <linearGradient id="Landing-nav-gradient" gradientUnits="userSpaceOnUse" x1="1049" y1="0" x2="1410" y2="0"><stop offset="0" stop-color="#720004"/><stop offset="1" stop-color="#FF7091"/></linearGradient>
    </defs>
    <rect id="Landing / Background" width="1440" height="1000" fill="#FBFDF9"/>
    ${triangles('Landing')}
    <g id="Landing / Hero">
      <text id="Hero / Title" x="93.6" y="871.4" fill="url(#Landing-text-gradient)" font-family="Marcellus" font-size="54" font-weight="700">Tom Eijkelenkamp</text>
      <text id="Hero / Subtitle" x="93.6" y="906.4" fill="url(#Landing-text-gradient)" font-family="Marcellus" font-size="20" font-weight="600">Artist · Graphics · Algorithmic Design</text>
    </g>
    ${navigation('Landing')}
  </g>

  <g id="Screen / Me" transform="translate(1600 80)">
    <defs><linearGradient id="Me-nav-gradient" gradientUnits="userSpaceOnUse" x1="1049" y1="0" x2="1410" y2="0"><stop offset="0" stop-color="#720004"/><stop offset="1" stop-color="#FF7091"/></linearGradient></defs>
    <rect id="Me / Background" width="1440" height="1000" fill="#FBFDF9"/>
    ${triangles('Me background', 0.18)}
    <rect id="Me / Overlay wash" y="53" width="1440" height="947" fill="#F8FCF8" opacity="0.76"/>
    ${navigation('Me')}
    <g id="Me / Profile content">
      <image id="Me / Portrait" x="516" y="375.8625" width="160" height="301.275" preserveAspectRatio="xMidYMid meet" href="data:image/jpeg;base64,${image64}"/>
      <g id="Me / Social icons" opacity="0.72">${linkedin}${github}${instagram}${email}</g>
    </g>
  </g>
</svg>`

await writeFile(join(outDir, 'landing-and-me-editable-for-figma.svg'), svg)
