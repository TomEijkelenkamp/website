<template>
  <div class="app">
    <div ref="container" class="canvas-container"></div>

    <!-- top bar -->
    <div class="top-bar">
      <button
        @click="openOverlay('research')"
        :class="{ active: activeOverlay === 'research' }"
      >
        Research
      </button>

      <button
        @click="openOverlay('animation')"
        :class="{ active: activeOverlay === 'animation' }"
      >
        Animation
      </button>

      <button
        @click="openOverlay('dance')"
        :class="{ active: activeOverlay === 'dance' }"
      >
        Dance
      </button>

      <button
        @click="openOverlay('me')"
        :class="{ active: activeOverlay === 'me' }"
      >
        Me
      </button>
    </div>

    <!-- overlay -->
    <div v-show="activeOverlay" class="overlay" :class="{ prewarm: isPrewarming }">
      <div class="overlay-content">
        <div class="overlay-body">
          <!-- Research tab -->
          <div v-show="activeOverlay === 'research'" class="research-list">
            <article
              v-for="item in researchItems"
              :key="item.id"
              :class="['research-item', { 'no-image': !item.image }]"
            >
              <!-- image, only if provided -->
              <div v-if="item.image" class="research-image">
                <img :src="item.image" :alt="item.title" />
              </div>

              <!-- text -->
              <div class="research-text">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>

          <div v-show="activeOverlay === 'animation'" class="animation-grid">
          <article
            v-for="item in animationItems"
            :key="item.id"
            class="animation-item"
            @click="openExternal(item.url)"
          >
            <div class="animation-thumb">
              <img :src="item.thumbnail" :alt="item.title" />
            </div>
          </article>
        </div>


          <div v-show="activeOverlay === 'dance'" class="dance-grid">
          <!-- Love letters to robots -->
          <div
            class="dance-item"
            @click="openVideo('https://www.youtube.com/watch?v=s-8xOs1JN6A')"
          >
            <div class="dance-image-wrapper">
              <img src="/dance/love-letters.jpg" alt="Love letters to robots" />
            </div>
            <!-- <div class="dance-caption">Love letters to robots</div> -->
          </div>

          <!-- untitled -->
          <div
            class="dance-item"
            @click="openVideo('https://www.youtube.com/watch?v=ZS1LA9eGNXo')"
          >
            <div class="dance-image-wrapper">
              <img src="/dance/untitled.png" alt="Untitled" />
            </div>
            <!-- <div class="dance-caption">untitled</div> -->
          </div>
        </div>


          <div v-show="activeOverlay === 'me'" class="me-text">
            <div class="me-image-wrapper">
              <img src="/me/me.jpg" alt="Me"/>
            </div>
            <!-- <p>© 2025 Tom Eijkelenkamp</p> -->
            <div class="social-buttons">
              <a href="https://www.linkedin.com/in/tomeijkelenkamp/" target="_blank" aria-label="LinkedIn">
                <img src="/icons/linkedin.svg" alt="LinkedIn" class="icon">
              </a>
              <a href="https://github.com/TomEijkelenkamp" target="_blank" aria-label="GitHub">
                <img src="/icons/github.svg" alt="GitHub" class="icon">
              </a>
              <a href="https://www.instagram.com/electronic_graphic/" target="_blank" aria-label="Instagram">
                <img src="/icons/instagram.svg" alt="Instagram" class="icon">
              </a>
              <a href="mailto:tomeijkelenkamp@hotmail.com" aria-label="Email">
                <img src="/icons/email.svg" alt="Email" class="icon">
              </a>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div class="control-panel">
      <section>
        <label>
          Square count: {{ squareRes }} × {{ squareRes }} ({{ squareRes * squareRes }} squares)
          <input type="range" min="8" max="48" step="8" v-model.number="squareRes" />
        </label>
      </section>

      <div class="two-columns">
        <section>
          <label>
            Mouse swirl: {{ mouseTangentialStrength.toFixed(1) }}
            <input
              type="range"
              min="0"
              max="100.0"
              step="0.1"
              v-model.number="mouseTangentialStrength"
            />
          </label>
          <label>
            Mouse pull: {{ mouseRadialStrength.toFixed(1) }}
            <input
              type="range"
              min="0"
              max="100.0"
              step="0.1"
              v-model.number="mouseRadialStrength"
            />
          </label>
          <label>
            Side gravity: {{ sideGravityStrength.toFixed(1) }}
            <input
              type="range"
              min="0"
              max="100.0"
              step="0.1"
              v-model.number="sideGravityStrength"
            />
          </label>
        </section>

        <section>
          <label>
            Ground level: {{ groundLevel.toFixed(1) }}
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.1"
              v-model.number="groundLevel"
            />
          </label>
          <label>
            Ground bounce: {{ groundBounce.toFixed(1) }}
            <input
              type="range"
              min="0"
              max="100.0"
              step="0.1"
              v-model.number="groundBounce"
            />
          </label>
          <label>
            Ground friction: {{ groundFriction.toFixed(1) }}
            <input
              type="range"
              min="0.5"
              max="100.0"
              step="0.1"
              v-model.number="groundFriction"
            />
          </label>
        </section>
      </div>

      <div class="two-columns">
        <section>
          <h3>Color A (HSV)</h3>
          <label>{{ colorALabel }}</label>
          <label>
            <input type="range" min="0" max="360" v-model.number="colorA.h" />
          </label>
          <label>
            <input type="range" min="0" max="1" step="0.01" v-model.number="colorA.s" />
          </label>
          <label>
            <input type="range" min="0" max="1" step="0.01" v-model.number="colorA.v" />
          </label>
        </section>

        <section>
          <h3>Color B (HSV)</h3>
          <label>{{ colorBLabel }}</label>
          <label>
            <input type="range" min="0" max="360" v-model.number="colorB.h" />
          </label>
          <label>
            <input type="range" min="0" max="1" step="0.01" v-model.number="colorB.s" />
          </label>
          <label>
            <input type="range" min="0" max="1" step="0.01" v-model.number="colorB.v" />
          </label>
        </section>
      </div>
        <section>
          <div class="gradient-bar" :style="{ background: gradientCss }"></div>
        </section>

      <div class="two-columns">
        <section>
          <label>
            Min size: {{ sizeMin.toFixed(1) }}
            <input type="range" min="1.0" max="400.0" step="0.1" v-model.number="sizeMin" />
          </label>
          <label>
            Max size: {{ sizeMax.toFixed(1) }}
            <input type="range" min="1.0" max="400.0" step="0.1" v-model.number="sizeMax" />
          </label>
        </section>

        <section>
          <label>
            Min mass: {{ massMin.toFixed(1) }}
            <input
              type="range"
              min="0.1"
              max="400.0"
              step="0.1"
              v-model.number="massMin"
            />
          </label>
          <label>
            Max mass: {{ massMax.toFixed(1) }}
            <input
              type="range"
              min="0.1"
              max="400.0"
              step="0.1"
              v-model.number="massMax"
            />
          </label>
        </section>
      </div>

      <div class="two-columns">
        <section>
          <h3>Text Color A (HSV)</h3>
          <label>{{ textColorALabel }}</label>
          <label>
            <input type="range" min="0" max="360" v-model.number="textColorA.h" />
          </label>
          <label>
            <input type="range" min="0" max="1" step="0.01" v-model.number="textColorA.s" />
          </label>
          <label>
            <input type="range" min="0" max="1" step="0.01" v-model.number="textColorA.v" />
          </label>
        </section>

        <section>
          <h3>Text Color B (HSV)</h3>
          <label>{{ textColorBLabel }}</label>
          <label>
            <input type="range" min="0" max="360" v-model.number="textColorB.h" />
          </label>
          <label>
            <input type="range" min="0" max="1" step="0.01" v-model.number="textColorB.s" />
          </label>
          <label>
            <input type="range" min="0" max="1" step="0.01" v-model.number="textColorB.v" />
          </label>
        </section>
      </div>
      <section>
        <div class="gradient-bar" :style="{ background: textGradientCss }"></div>
      </section>

      
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js'
const activeOverlay = ref(null) // 'research' | 'animation' | 'dance' | 'me' | null

// NEW: flag to hide overlay while we prewarm
const isPrewarming = ref(true)

function openOverlay(which) {
  // toggle behavior: click same button again -> close
  activeOverlay.value = activeOverlay.value === which ? null : which
}

function closeOverlay() {
  activeOverlay.value = null
}

function openExternal(url) {
  window.open(url, '_blank')
}

const overlayTitle = computed(() => {
  switch (activeOverlay.value) {
    case 'research':
      return 'Research'
    case 'animation':
      return 'Animation'
    case 'dance':
      return 'Dance'
    case 'me':
      return 'Me'
    default:
      return ''
  }
})

const researchItems = ref([
  {
    id: 1,
    title: 'Composition in AI Art',
    text: 'A study on improving artistic composition in generated images, looking at building blocks and theories to create effects like focal point, balance, and visual flow.',
    image: '/research/master_thesis_front_page_compressed.png', // put PNGs in /public/research/
  },
  {
    id: 2,
    title: 'What causes Fine-Art to gain Popularity',
    text: 'Using bayesian networks to analyze which visual features relate to popularity in fine-art images and creating a causal diagram out of this.',
    image: '/research/correlations_to_popularity_front_page_compressed.png',
  },
  {
    id: 3,
    title: 'Lighting in AI Art',
    text: 'Pilot study on measuring light realism in generated images.',
    image: '/research/research_internship_front_page_compressed.png',
  },
  {
    id: 4,
    title: 'Subdivision Shading',
    text: 'Phong shading leads to artifacts on irregular vertices. Subdivision shading aims to address these issues by smoothing normals around irregularities.',
    image: '/research/subdivision_shading_front_page_compressed.png', // 👈 no picture for this one
  },
  {
    id: 5,
    title: 'Iconic and Symbolic Language in Art',
    text: 'Taking an artwork of Picasso as example to analyze the use of iconic and symbolic language in fine-arts.',
    image: '',
  },
  {
    id: 6,
    title: 'AI Melody Sampler',
    text: 'Training a large language model on sheet music to generate new melodies.',
    image: '',
  },
  {
    id: 7,
    title: 'AI Drum Computer',
    text: 'Linear regression based drum pattern generator.',
    image: '',
  },
])

const animationItems = ref([
  {
    id: 1,
    title: 'Dance piece – fragment 1',
    url: 'https://www.instagram.com/p/DHDockUOp5g/',
    thumbnail: '/animation/dance.jpg', // from script
  },
  {
    id: 2,
    title: 'Generative art experiment 2',
    url: 'https://www.instagram.com/p/DRK6Hf5jnfd/',
    thumbnail: '/animation/flux.jpg',
  },
  {
    id: 3,
    title: 'Projection + movement test',
    url: 'https://www.instagram.com/p/DKO7ZbPs9O6/',
    thumbnail: '/animation/fire.png',
  },
  {
    id: 4,
    title: 'Light play study',
    url: 'https://www.instagram.com/p/DN2zWV93JW0/',
    thumbnail: '/animation/matrix.jpg',
  },
  {
    id: 5,
    title: 'Generative art experiment',
    url: 'https://www.instagram.com/p/DMkLJEeu8YD/',
    thumbnail: '/animation/moon.png',
  },
  {
    id: 6,
    title: 'Algorithmic art piece',
    url: 'https://www.instagram.com/p/DKMJjqQITft/',
    thumbnail: '/animation/creature.png',
  },
])

// if your dance images are inline in the template, you can define them here:
const danceImageUrls = [
  '/dance/love-letters.jpg',
  '/dance/untitled.png',
]

// collect all URLs into one array
const allImageUrls = computed(() => {
  const research = (researchItems?.value || [])
    .map(i => i.image)
  const animation = (animationItems?.value || [])
    .map(i => i.thumbnail || i.image)
  const dance = danceImageUrls

  return [...research, ...animation, ...dance].filter(Boolean)
})

function openVideo(url) {
  window.open(url, '_blank')
}


const mouseEnabled = computed(() => activeOverlay.value === null)


const colorALabel = computed(() => {
  const h = Math.round(colorA.h)
  const s = colorA.s.toFixed(2)
  const v = colorA.v.toFixed(2)
  return `(${h}°, ${s}, ${v})`
})

const colorBLabel = computed(() => {
  const h = Math.round(colorB.h)
  const s = colorB.s.toFixed(2)
  const v = colorB.v.toFixed(2)
  return `(${h}°, ${s}, ${v})`
})

const textColorALabel = computed(() => {
  const h = Math.round(textColorA.h)
  const s = textColorA.s.toFixed(2)
  const v = textColorA.v.toFixed(2)
  return `(${h}°, ${s}, ${v})`
})

const textColorBLabel = computed(() => {
  const h = Math.round(textColorB.h)
  const s = textColorB.s.toFixed(2)
  const v = textColorB.v.toFixed(2)
  return `(${h}°, ${s}, ${v})`
})

const container = ref(null)
const hasPointer = ref(false)

// UI state
const squareRes = ref(16) // 16x16 = 256
const damping = ref(0.9)
const massMin = ref(5.0)
const massMax = ref(10.0)

const colorA = reactive({ h: 258, s: 1.0, v: 0.2 })
const colorB = reactive({ h: 160, s: 1.0, v: 1.0 })
const textColorA = reactive({ h: 318, s: 1.0, v: 1.0 })  // example: red
const textColorB = reactive({ h: 94, s: 1.0, v: 1.0 })  // example: cyan

// Responsive particle sizes based on viewport width
const sizeMin = computed(() => {
  // min: 12px, max: 40px, scales with width
  return Math.round(clamp(12, window.innerWidth * 0.08, 40))
})

const sizeMax = computed(() => {
  // min: 80px, max: 350px, scales with width
  return Math.round(clamp(80, window.innerWidth * 0.40, 350))
})

function clamp(min, val, max) {
  return Math.min(Math.max(val, min), max)
}

// Responseive forces
const mouseTangentialStrength = computed(() => {
  // scales with width
  return clamp(10.0, window.innerWidth * 0.06, 100.0)
})

const mouseRadialStrength = computed(() => {
  // scales with width
  return clamp(5.0, window.innerWidth * 0.03, 50.0)
})

const sideGravityStrength = ref(0.0)
const groundLevel = ref(0.9)
const groundBounce = ref(30.0)
const groundFriction = ref(80.0)

const textHueShift = ref(0.50)
const textSatMult = ref(2.0)
const textValMult = ref(1.0)


const gradientCss = computed(() => {
  const ca = hsvToCss(colorA.h, colorA.s, colorA.v)
  const cb = hsvToCss(colorB.h, colorB.s, colorB.v)
  return `linear-gradient(to right, ${ca}, ${cb})`
})

const textGradientCss = computed(() => {
  const ca = hsvToCss(textColorA.h, textColorA.s, textColorA.v)
  const cb = hsvToCss(textColorB.h, textColorB.s, textColorB.v)
  return `linear-gradient(to right, ${ca}, ${cb})`
})

// three.js objects
let renderer, scene, camera
let gpuCompute, velVar, posVar
let renderMesh
let animationId = null
let mouse = new THREE.Vector2(0, 0)
let bounds = new THREE.Vector2(1, 1)
let clock

// extra for text overlay
let simRenderTarget   // offscreen render of squares
let postScene         // scene for the post / screen quad
let postMesh          // the quad
let textTexture       // canvas text
function createTextTexture(
  text = "HELLO\nWORLD",
  width = 1024,
  height = 512,
  options = {}
) {
  const {
    fontSize = 200,
    fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight = 'bold',
    color = 'white',
    lineHeight = 1.2,
    align = 'left',
    background = 'transparent', // can be a color if you want a background
  } = options

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // clear or fill background
  if (background === 'transparent') ctx.clearRect(0, 0, width, height)
  else {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
  }

  // setup text style
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.textBaseline = 'middle'
  ctx.font = `bold ${fontSize}px "Mohave", sans-serif`

  // handle multiple lines
  const lines = text.split(/\r?\n/)
  const lineHeightPx = fontSize * lineHeight
  const totalHeight = lines.length * lineHeightPx
  let y = height / 2 - totalHeight / 2 + lineHeightPx / 2

  const x =
    align === 'center'
      ? width / 2 + 400
      : align === 'left'
      ? 400
      : width

  for (const line of lines) {
    ctx.fillText(line, x, y)
    y += lineHeightPx
  }

  // turn into a texture
  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.needsUpdate = true
  return tex
}

function loadSvgAsTexture(img, targetWidth = 1024, targetHeight = 512) {
  const dpr = window.devicePixelRatio || 1

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth * dpr
  canvas.height = targetHeight * dpr
  const ctx = canvas.getContext('2d')

  // work in CSS pixel space
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, targetWidth, targetHeight)

  // SVG intrinsic size (try natural size first)
  const svgW = img.naturalWidth  || img.width  || 600
  const svgH = img.naturalHeight || img.height || 150

  // --- dynamic offset based on canvas size ---

  // "design" canvas size you tuned for (your defaults)
  const refWidth  = 1024
  const refHeight = 512

  // how big is the current canvas compared to the reference?
  const sizeRatio = Math.min(targetWidth / refWidth, targetHeight / refHeight)
  // clamp to [0, 1] so we don't go above reference
  const t = Math.max(0, Math.min(1, sizeRatio))

  // interpolate offset scale from 0.5 (small screens) to 1.0 (large)
  // t = 0   -> 0.5
  // t = 1   -> 1.0
  const offsetScale = 0.1 + 0.9 * t

  const baseOffsetX = 100
  const baseOffsetY = 100

  const desiredOffsetX = baseOffsetX * offsetScale
  const desiredOffsetY = baseOffsetY * offsetScale

  // maximum drawable area if we want those margins
  const maxW = Math.max(targetWidth  - 2 * desiredOffsetX, 1)
  const maxH = Math.max(targetHeight - 2 * desiredOffsetY, 1)

  // scale factor so the SVG fits in that area (never scale up above 1)
  const scale = Math.min(1.0, maxW / svgW, maxH / svgH)

  const drawW = svgW * scale
  const drawH = svgH * scale

  // recompute remaining free space after scaling
  const remainingX = targetWidth  - drawW
  const remainingY = targetHeight - drawH

  // if we have enough room for the desired offsets, use them;
  // otherwise, center on that axis
  const x = remainingX >= desiredOffsetX * 2
    ? desiredOffsetX
    : (targetWidth - drawW) / 2

  const y = remainingY >= desiredOffsetY * 2
    ? targetHeight - drawH - desiredOffsetY  // bottom-left with margin
    : (targetHeight - drawH) / 2             // center vertically

  // draw at CSS pixel coords (transform handles dpr)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, x, y, drawW, drawH)

  // make texture
  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.generateMipmaps = false
  tex.needsUpdate = true

  // post scene
  postScene = new THREE.Scene()

  const postGeo = new THREE.PlaneGeometry(targetWidth, targetHeight)
  const postMat = createPostMaterial(
    simRenderTarget.texture,
    tex,
    new THREE.Vector2(targetWidth, targetHeight)
  )

  postMesh = new THREE.Mesh(postGeo, postMat)

  postMat.uniforms.uTextSize.value = new THREE.Vector2(targetWidth, targetHeight)
  postMat.uniforms.uTextScale.value = new THREE.Vector2(1.0, 1.0)
  postMat.uniforms.uText.value = tex

  postMesh.position.set(0, 0, 5)
  postScene.add(postMesh)
}

function createPostMaterial(simTex, textTex, screenSize) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uSim: { value: simTex },         // the original render of squares
      uText: { value: textTex },       // alpha mask
      uScreen: { value: screenSize },  // width, height in world coords (ortho)
      uTextScale: { value: new THREE.Vector2(1.0, 1.0) }, // NEW
      uTextOffset: { value: new THREE.Vector2(0.00, 0.0) }, // NEW

      // background HSV A/B (h in [0,1])
      uBgHSV_A:    { value: new THREE.Vector3() },
      uBgHSV_B:    { value: new THREE.Vector3() },

      // text HSV A/B (h in [0,1])
      uTextHSV_A:  { value: new THREE.Vector3() },
      uTextHSV_B:  { value: new THREE.Vector3() },

      
      uTextSize: { value: new THREE.Vector2(textTex.image.width, textTex.image.height) },
    },
    vertexShader: /* glsl */`
      uniform vec2 uScreen;
      varying vec2 vUvScreen;
      void main() {
        // position is in world space in range [-w/2, w/2], [-h/2, h/2]
        // convert to 0..1 to sample textures
        vec2 uv = position.xy / uScreen + 0.5;
        vUvScreen = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D uSim;
      uniform sampler2D uText;
      uniform vec2 uTextScale;
      uniform vec2 uTextOffset;
            
      // NEW:
      uniform vec3 uBgHSV_A;
      uniform vec3 uBgHSV_B;
      uniform vec3 uTextHSV_A;
      uniform vec3 uTextHSV_B;

      varying vec2 vUvScreen;
      uniform vec2 uTextSize;
      uniform vec2 uScreen; 

      // example color mapping
      vec3 mapColor(vec3 c) {
        // boost a bit
        return pow(c, vec3(0.8));
      }

      vec3 rgb2hsv(vec3 c) {
        vec4 K = vec4(0.0, -1.0, 2.0/3.0, -1.0/3.0);
        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                    d / (q.x + e),
                    q.x);
      }

      vec3 hsv2rgb(vec3 c) {
        vec3 p = abs(fract(c.xxx + vec3(0.0, 1.0/3.0, 2.0/3.0)) * 6.0 - 3.0);
        vec3 rgb = c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);
        return rgb;
      }

      vec3 shadeSample(vec2 uvScreen, vec2 uvText) {
        // sample base from sim
        vec3 base = texture2D(uSim, uvScreen).rgb;

        // sample text
        vec4 t = texture2D(uText, uvText);

        // 1) Background color in HSV
        vec3 baseHSV = rgb2hsv(base);

        // 2) Compute interpolation factor tBg: how far baseHSV is between uBgHSV_A and uBgHSV_B
        vec3 bg0 = uBgHSV_A;
        vec3 bg1 = uBgHSV_B;
        vec3 bgDir = bg1 - bg0;
        float denom = dot(bgDir, bgDir);
        float tBg = 0.0;
        if (denom > 0.0) {
          tBg = clamp(dot(baseHSV - bg0, bgDir) / denom, 0.0, 1.0);
        }

        // 3) Interpolate text HSV using same tBg
        vec3 textHSV = mix(uTextHSV_A, uTextHSV_B, tBg);

        // 4) Convert to RGB
        vec3 textRGB = hsv2rgb(textHSV);

        // 5) Blend text color over background using the text alpha
        vec3 finalColor = mix(base, textRGB, t.a);
        return finalColor;
      }

      void main() {
        vec2 uvScreen = vUvScreen;
        vec2 uvText   = uvScreen * uTextScale + uTextOffset;

        vec2 textTexel   = 1.0 / max(uTextSize, vec2(1.0));
        vec2 screenTexel = 1.0 / max(uScreen,   vec2(1.0));

        // Gaussian-ish weights
        // 1 2 1
        // 2 4 2
        // 1 2 1
        // float w00 = 1.0; float w10 = 2.0; float w20 = 1.0;
        // float w01 = 2.0; float w11 = 4.0; float w21 = 2.0;
        // float w02 = 1.0; float w12 = 2.0; float w22 = 1.0;
        // float weightSum = 16.0; // 16.0;

        // float w00 = 0.5; float w10 = 1.0; float w20 = 0.5;
        // float w01 = 1.0; float w11 = 10.0; float w21 = 1.0;
        // float w02 = 0.5; float w12 = 1.0; float w22 = 0.5;
        float weightSum = 1.0; // 16.0;

        vec3 acc = vec3(0.0);

        acc += shadeSample(uvScreen, uvText);

        // row -1
        // acc += shadeSample(uvScreen + vec2(-screenTexel.x, -screenTexel.y),
        //                   uvText   + vec2(-textTexel.x,   -textTexel.y)) * w00;
        // acc += shadeSample(uvScreen + vec2(0.0,            -screenTexel.y),
        //                   uvText   + vec2(0.0,            -textTexel.y)) * w10;
        // acc += shadeSample(uvScreen + vec2( screenTexel.x, -screenTexel.y),
        //                   uvText   + vec2( textTexel.x,   -textTexel.y)) * w20;

        // // row 0
        // acc += shadeSample(uvScreen + vec2(-screenTexel.x, 0.0),
        //                   uvText   + vec2(-textTexel.x,   0.0)) * w01;
        // acc += shadeSample(uvScreen,
        //                   uvText) * w11;
        // acc += shadeSample(uvScreen + vec2( screenTexel.x, 0.0),
        //                   uvText   + vec2( textTexel.x,   0.0)) * w21;

        // // row +1
        // acc += shadeSample(uvScreen + vec2(-screenTexel.x,  screenTexel.y),
        //                   uvText   + vec2(-textTexel.x,    textTexel.y)) * w02;
        // acc += shadeSample(uvScreen + vec2(0.0,             screenTexel.y),
        //                   uvText   + vec2(0.0,             textTexel.y)) * w12;
        // acc += shadeSample(uvScreen + vec2( screenTexel.x,  screenTexel.y),
        //                   uvText   + vec2( textTexel.x,    textTexel.y)) * w22;

        vec3 finalColor = acc / weightSum;
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    transparent: false,
    depthTest: false,
    depthWrite: false,
  })
}

onMounted(async () => {
  // 1) preload images (network/cache)
  allImageUrls.value.forEach(src => {
    const img = new Image()
    img.src = src
  })

  // 2) prewarm each tab once (layout/paint)
  const original = activeOverlay.value
  const tabs = ['research', 'animation', 'dance', 'me']

  for (const t of tabs) {
    activeOverlay.value = t
    await nextTick()   // let the browser actually render it once
  }

  // 3) restore original state (no overlay open)
  activeOverlay.value = original || null
  isPrewarming.value = false
  
  initThree()
  buildSimulation(squareRes.value)
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointerMove)
  renderer?.dispose()
})

watch(squareRes, (newVal) => {
  buildSimulation(newVal)
})

watch([
  mouseTangentialStrength,
  mouseRadialStrength,
  sideGravityStrength,
  massMin,
  massMax,
  damping,
  groundLevel,
  groundBounce,
  groundFriction
], () => {
  if (!velVar || !posVar) return
  velVar.material.uniforms.uMouseTangential.value = mouseTangentialStrength.value
  velVar.material.uniforms.uMouseRadial.value = mouseRadialStrength.value
  velVar.material.uniforms.uSideGravity.value = sideGravityStrength.value
  velVar.material.uniforms.uDamping.value = damping.value
  velVar.material.uniforms.uWallInset.value = groundLevel.value
  velVar.material.uniforms.uWallBounce.value = groundBounce.value
  velVar.material.uniforms.uWallFriction.value = groundFriction.value
  posVar.material.uniforms.uWallInset.value = groundLevel.value

  recomputeMassTexture(dtPosition, renderMesh.geometry.getAttribute('aSeed').array)
  dtPosition.needsUpdate = true
})

let img = new Image()
img.src = "/svg/normal.svg"

function initThree() {
  const el = container.value
  const w = el.clientWidth
  const h = el.clientHeight

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  el.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -100, 100)
  camera.position.set(0, 0, 10)

  bounds.set(w / 2, h / 2)

  clock = new THREE.Clock()

  simRenderTarget = new THREE.WebGLRenderTarget(w, h, {
    depthBuffer: false,
    stencilBuffer: false,
  })

  // // make text texture once
  // textTexture = createTextTexture("Tom Eijkelenkamp\nArtist | Graphics | Algorithmic Design", 3840, 2160)
  img.onload = function() {
      loadSvgAsTexture(img, w, h)
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerdown', () => { mouseEnabled.value = true })
  window.addEventListener('pointerup', () => { mouseEnabled.value = false })
}

let dtPosition // keep reference for mass updates

function buildSimulation(res) {
  // remove old mesh
  if (renderMesh) {
    scene.remove(renderMesh)
    renderMesh.geometry.dispose()
    renderMesh.material.dispose()
    renderMesh = null
  }

  gpuCompute = new GPUComputationRenderer(res, res, renderer)

  dtPosition = gpuCompute.createTexture()
  const dtVelocity = gpuCompute.createTexture()

  const uvs = []
    const seeds = []
    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        const u = i / (res - 1 || 1)
        const v = j / (res - 1 || 1)
        uvs.push(u, v)
        seeds.push(Math.random())
      }
    }

  fillPositionTexture(dtPosition, bounds, seeds)
  fillVelocityTexture(dtVelocity)

  velVar = gpuCompute.addVariable('textureVelocity', velocityShader(), dtVelocity)
  posVar = gpuCompute.addVariable('texturePosition', positionShader(), dtPosition)

  gpuCompute.setVariableDependencies(velVar, [velVar, posVar])
  gpuCompute.setVariableDependencies(posVar, [posVar, velVar])

  // uniforms, now including uDelta and strengths
  velVar.material.uniforms = {
    uTime: { value: 0 },
    uDelta: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uBounds: { value: new THREE.Vector2(bounds.x, bounds.y) },
    uMouseTangential: { value: mouseTangentialStrength.value },
    uMouseRadial: { value: mouseRadialStrength.value }, 
    uSideGravity: { value: sideGravityStrength.value },
    uDamping: { value: damping.value },
    uWallInset: { value: groundLevel.value },
    uWallBounce: { value: groundBounce.value },
    uWallFriction: { value: groundFriction.value },
  }

  posVar.material.uniforms = {
    uDelta: { value: 0 },
    uBounds: { value: new THREE.Vector2(bounds.x, bounds.y) },
    uWallInset: { value: groundLevel.value },
  }

  const error = gpuCompute.init()
  if (error) console.error(error)

  // instanced mesh
  const triangle = new THREE.BufferGeometry()
  const vertices = new Float32Array([
    // equilateral-ish triangle centered at origin
    0.0,  1.0, 0.0,
  -0.8660254, -0.5, 0.0,
    0.8660254, -0.5, 0.0,
  ])
  triangle.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    
  // NEW: barycentric coords per vertex
  const bary = new Float32Array([
    1, 0, 0,  // vertex 0
    0, 1, 0,  // vertex 1
    0, 0, 1,  // vertex 2
  ])
  triangle.setAttribute('aBarycentric', new THREE.BufferAttribute(bary, 3))

  const count = res * res
  const instanced = new THREE.InstancedMesh(triangle, createRenderMaterial(), count)

  instanced.geometry.setAttribute('aRef', new THREE.InstancedBufferAttribute(new Float32Array(uvs), 2))
  instanced.geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(new Float32Array(seeds), 1))

  scene.add(instanced)
  renderMesh = instanced
}

function fillPositionTexture(texture, bounds, seeds) {
  const arr = texture.image.data
  for (let i = 0; i < arr.length; i += 4) {
    const x = (Math.random() * 2 - 1) * bounds.x
    const y = (Math.random() * 2 - 1) * bounds.y
    let side = Math.random() < 0.5 ? -1 : 1
    const mass = Math.pow(massMin.value + (massMax.value - massMin.value) * seeds[i / 4], 2.0)  // correlate to size
    arr[i + 0] = x
    arr[i + 1] = y
    arr[i + 2] = side
    arr[i + 3] = mass * .1
  }
}

function recomputeMassTexture(texture, seeds) {
  const arr = texture.image.data
  for (let i = 0; i < arr.length; i += 4) {
    const mass = Math.pow(massMin.value + (massMax.value - massMin.value) * seeds[i / 4], 2.0)  // correlate to size
    arr[i + 3] = mass
  }
}

function fillVelocityTexture(texture) {
  const arr = texture.image.data
  for (let i = 0; i < arr.length; i += 4) {
    arr[i + 0] = 0
    arr[i + 1] = 0
    arr[i + 2] = 0
    arr[i + 3] = 1
  }
}

function velocityShader() {
  return /* glsl */`
    uniform float uTime;
    uniform float uDelta;
    uniform vec3 uMouse;
    uniform vec2 uBounds;
    uniform float uMouseTangential;
    uniform float uMouseRadial;
    uniform float uSideGravity;
    uniform float uDamping;
    uniform float uWallInset;
    uniform float uWallBounce;
    uniform float uWallFriction;

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec4 vel = texture2D(textureVelocity, uv);
      vec4 pos = texture2D(texturePosition, uv);

      vec2 position = pos.xy;

      vec2 toMouse = (uMouse.xy - position);
      float distToMouse = length(toMouse) + 0.0;

      // tangential (circling)
      vec2 tangent = vec2(-toMouse.y, toMouse.x);
      vec2 swirlForce = normalize(tangent) * (uMouseTangential * 10000.0 / distToMouse);

      // radial (pulling straight in)
      vec2 radialDir = toMouse / distToMouse; // normalized
      vec2 radialForce = radialDir * (uMouseRadial * 10000.0 / distToMouse);

      // total mouse force = swirl + pull
      vec2 mouseForce = swirlForce + radialForce;


      // ---- 2) side gravity toward both walls ----
      float leftX  = -uBounds.x * uWallInset;
      float rightX =  uBounds.x * uWallInset;

      float distLeft  = abs(position.x - leftX);
      float distRight = abs(position.x - rightX);

      float soften = 40.0;
      float gLeft  = uSideGravity * 10000.0 / (distLeft  * distLeft  + soften);
      float gRight = uSideGravity * 10000.0 / (distRight * distRight + soften);

      vec2 leftForce  = vec2(leftX - position.x, 0.0)  * gLeft;
      vec2 rightForce = vec2(rightX - position.x, 0.0) * gRight;

      vec2 sideForce = leftForce + rightForce;

      // ---- integrate ----
      vec2 v = vel.xy;
      vec2 totalForce = mouseForce + sideForce;

      float mass = max(pos.w, 0.001); // avoid divide-by-zero
      // F = m * a  → a = F / m
      v += (totalForce / mass) * uDelta;

      // ---- wall collisions ----
      if (position.x < leftX) {
        v.x = abs(v.x) * uWallBounce;   // bounce to right
        v.y *= uWallFriction;           // lose some vertical energy
      }
      if (position.x > rightX) {
        v.x = -abs(v.x) * uWallBounce;  // bounce to left
        v.y *= uWallFriction;
      }

      // damping (global drag)
      v *= uDamping;

      gl_FragColor = vec4(v, 0.0, pos.w);
    }
  `
}
function positionShader() {
  return /* glsl */`
    uniform float uDelta;
    uniform vec2 uBounds;
    uniform float uWallInset;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec4 pos = texture2D(texturePosition, uv);
      vec4 vel = texture2D(textureVelocity, uv);

      vec2 newPos = pos.xy + vel.xy * uDelta;

      float leftX  = -uBounds.x * uWallInset;
      float rightX =  uBounds.x * uWallInset;

      // clamp so they stay inside the walls
      if (newPos.x < leftX)  newPos.x = leftX;
      if (newPos.x > rightX) newPos.x = rightX;

      gl_FragColor = vec4(newPos, 0.0, pos.w);
    }
  `
}

function createRenderMaterial() {
  return new THREE.RawShaderMaterial({
    uniforms: {
      uPosition: { value: null },
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uSizeMin: { value: sizeMin.value },
      uSizeMax: { value: sizeMax.value },
    },
    vertexShader: /* glsl */`
      precision highp float;
      attribute vec3 position;
      attribute vec2 aRef;
      attribute float aSeed;
      uniform mat4 projectionMatrix;
      uniform mat4 modelViewMatrix;
      uniform sampler2D uPosition;
      uniform float uSizeMin;
      uniform float uSizeMax;
      varying float vSeed;
      attribute vec3 aBarycentric;
      varying vec3 vBarycentric;
      varying float vSize;

      
      void main() {
        vec4 posTex = texture2D(uPosition, aRef);
        vec2 worldPos = posTex.xy;

        // size per instance
        float size = uSizeMin + (uSizeMax - uSizeMin) * aSeed;
        vec2 localPos = position.xy * size;
        vSize = size;

        // random angle per instance based on aSeed
        float angle = aSeed * 6.28318530718; // 2π
        float c = cos(angle);
        float s = sin(angle);
        mat2 rot = mat2(c, -s,
                        s,  c);

        vec2 rotated = rot * localPos;

        vec3 finalPos = vec3(worldPos + rotated, 0.0);
        vSeed = aSeed;
        vBarycentric = aBarycentric;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
      }

    `,
    fragmentShader: /* glsl */`
      precision highp float;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying float vSeed;
      varying vec3 vBarycentric;
      varying float vSize;

      void main() {
        float t = fract(sin(vSeed * 43758.5453123) * 43758.5453123);
        vec3 col = mix(uColorA, uColorB, t);

        // distance to the closest edge of the triangle
        float edgeDist = min(min(vBarycentric.x, vBarycentric.y), vBarycentric.z);

        // ---- size-aware AA width ----
        // base width in barycentric space for a "medium" particle
        float baseWidth = 1.0; // tune

        // Inverse relationship: larger size → smaller smoothing region
        float width = baseWidth / max(vSize, 0.0001);

        // Prevent extreme values
        // width = clamp(width, 0.01, 0.15);
        
        float alpha = smoothstep(0.0, width, edgeDist);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
  })
}

function animate() {
  const dt = clock.getDelta()

  if (gpuCompute && velVar && posVar) {
    // update GPU uniforms from UI every frame
    velVar.material.uniforms.uTime.value = clock.elapsedTime
    velVar.material.uniforms.uDelta.value = dt
    posVar.material.uniforms.uDelta.value = dt

    if (hasPointer.value && mouseEnabled.value) {
      velVar.material.uniforms.uMouse.value.set(mouse.x, mouse.y, 0)
    } else {
      // push it far away so it doesn't affect anything
      velVar.material.uniforms.uMouse.value.set(9999, 9999, 0)
    }

    gpuCompute.compute()

    const posTex = gpuCompute.getCurrentRenderTarget(posVar).texture
    if (renderMesh) {
      renderMesh.material.uniforms.uPosition.value = posTex

      // colors & sizes from your UI
      const ca = hsvToRgb(colorA.h, colorA.s, colorA.v)
      const cb = hsvToRgb(colorB.h, colorB.s, colorB.v)
      renderMesh.material.uniforms.uColorA.value.set(ca.r, ca.g, ca.b)
      renderMesh.material.uniforms.uColorB.value.set(cb.r, cb.g, cb.b)
      renderMesh.material.uniforms.uSizeMin.value = Math.min(sizeMin.value, sizeMax.value)
      renderMesh.material.uniforms.uSizeMax.value = Math.max(sizeMin.value, sizeMax.value)
    }
    if (postMesh) {
      const bgA = new THREE.Vector3(colorA.h / 360, colorA.s, colorA.v)
      const bgB = new THREE.Vector3(colorB.h / 360, colorB.s, colorB.v)

      const tA = new THREE.Vector3(textColorA.h / 360, textColorA.s, textColorA.v)
      const tB = new THREE.Vector3(textColorB.h / 360, textColorB.s, textColorB.v)

      postMesh.material.uniforms.uBgHSV_A.value.copy(bgA)
      postMesh.material.uniforms.uBgHSV_B.value.copy(bgB)
      postMesh.material.uniforms.uTextHSV_A.value.copy(tA)
      postMesh.material.uniforms.uTextHSV_B.value.copy(tB)
    }
  }

  // PASS 1: render squares to offscreen
  renderer.setRenderTarget(simRenderTarget)
  renderer.clear()
  renderer.render(scene, camera)

  // PASS 2: render post quad to screen
  if (postScene) {
    renderer.setRenderTarget(null)
    renderer.clear()
    renderer.render(postScene, camera)
  }

  animationId = requestAnimationFrame(animate)
}


function onResize() {
  if (!container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight

  renderer.setSize(w, h)
  camera.left = -w / 2
  camera.right = w / 2
  camera.top = h / 2
  camera.bottom = -h / 2
  camera.updateProjectionMatrix()

  bounds.set(w / 2, h / 2)
  if (velVar) {
    velVar.material.uniforms.uBounds.value.set(bounds.x, bounds.y)
  }
  if (posVar) {
    posVar.material.uniforms.uBounds.value.set(bounds.x, bounds.y)
  }
  loadSvgAsTexture(img, w, h)
}

function onPointerMove(e) {
  if (!container.value) return
  if (!mouseEnabled.value) return  // ← stops mouse effects when overlay is open
  const rect = container.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const worldX = x - rect.width / 2
  const worldY = - (y - rect.height / 2)
  mouse.set(worldX, worldY)
  hasPointer.value = true
}

// HSV helpers
function hsvToRgb(h, s, v) {
  const c = v * s
  const hp = h / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))
  let r1, g1, b1
  if (0 <= hp && hp < 1) [r1, g1, b1] = [c, x, 0]
  else if (1 <= hp && hp < 2) [r1, g1, b1] = [x, c, 0]
  else if (2 <= hp && hp < 3) [r1, g1, b1] = [0, c, x]
  else if (3 <= hp && hp < 4) [r1, g1, b1] = [0, x, c]
  else if (4 <= hp && hp < 5) [r1, g1, b1] = [x, 0, c]
  else [r1, g1, b1] = [c, 0, x]
  const m = v - c
  return { r: r1 + m, g: g1 + m, b: b1 + m }
}

function hsvToCss(h, s, v) {
  const { r, g, b } = hsvToRgb(h, s, v)
  return `rgb(${(r * 255) | 0}, ${(g * 255) | 0}, ${(b * 255) | 0})`
}

// ensure sizeMin <= sizeMax
watch(sizeMin, (val) => {
  if (val > sizeMax.value) sizeMax.value = val
})
watch(sizeMax, (val) => {
  if (val < sizeMin.value) sizeMin.value = val
})
watch(massMin, (val) => {
  if (val > massMax.value) massMax.value = val
})
watch(massMax, (val) => {
  if (val < massMin.value) massMin.value = val
})
</script>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}


.canvas-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.control-panel {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(12, 14, 16, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
  max-width: 280px;
  color: #f5f5f5;
  font-size: 0.8rem;
  pointer-events: auto;
}

.control-panel section {
  margin-bottom: 0.75rem;
}

.control-panel h3 {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  opacity: 0.9;
}

.control-panel label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.control-panel input[type="range"] {
  width: 100%;
}

.gradient-bar {
  width: 100%;
  height: 18px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.15);
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.three-columns {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
}

.top-bar {
  position: absolute;
  /* margin from top/right scales with width */
  top: clamp(0.6rem, 0.4rem + 0.5vw, 0.8rem);
  right: clamp(0.6rem, 0.4rem + 0.5vw, 0.8rem);

  left: clamp(0.6rem, -2rem + 15vw, 3rem);

  display: flex;
  gap: clamp(0.25rem, 0.2rem + 0.4vw, 0.7rem);
  z-index: 1200; /* above overlay (999) */
  align-items: center;
  justify-content: flex-end;
}

.top-bar button {
  background: rgba(10, 10, 10, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;

  /* padding scales with width */
  padding: clamp(0.3rem, 0.1rem + 0.4vw, 0.4rem)
           clamp(0.6rem, 0.3rem + 0.7vw, 0.9rem);

  cursor: pointer;

  /* font size scales with width */
  font-size: clamp(1.0rem, 0.8rem + 0.8vw, 1.7rem);
  font-family: "Baloo 2", sans-serif;
}

.top-bar button:hover {
  background: rgba(255, 255, 255, 0.06);
}

.top-bar button.active {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.7);
  color: #fff;
}

.research-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.8rem;
}

/* one item in the list */
.research-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

/* image column */
.research-image {
  flex: 0 0 180px;
  max-width: 180px;
  /* height: 270px; */
  /* border-radius: 0.6rem; */
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
}

.research-image img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* text column */
.research-text {
  flex: 1;
}

.research-text h3 {
  margin: 0 0 0.2rem;
  font-size: 0.9rem;
}

.research-text p {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.85;
  line-height: 1.4;
}

/* items without an image: text full-width */
.research-item.no-image {
  flex-direction: column;
}

.animation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  gap: 0.8rem;
}

.animation-item {
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.animation-thumb {
  /* border-radius: 0.75rem; */
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  max-width: 180px;   /* adjust to what looks good */
  height: 235px;  /* adjust to what looks good */
  width: 100%;
  /* height: 100%; */
}

.animation-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  /* width: 100%; */
  /* height: auto; */
  object-fit: cover;
  object-position: center;    /* crop from center (important!) */
}

.animation-caption {
  font-size: 0.85rem;
  opacity: 0.9;
}

.dance-grid {
  display: flex;
  flex-wrap: wrap;      /* laat items naar volgende regel lopen */
  gap: 0.75rem;
  justify-content: flex-start; /* of center, wat je mooi vindt */
}

.dance-item {
  cursor: pointer;
  text-align: center;
  max-width: 100%;
}

.dance-image-wrapper {
  height: 235px;
  /* optioneel: max-breedte om extra veilig te zijn op kleine schermen */
  width: 100%;
  overflow: hidden;
  /* eventueel nog: border-radius, background, etc. */
}

.dance-image-wrapper img {
  display: block;
  height: 100%;   /* hoogte volgt wrapper → 235px */
  width: 100%;    /* breedte volgt aspect ratio */
}

.dance-caption {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  opacity: 0.9;
}

.me-text {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 0.75rem;
}

.me-text .me-image-wrapper img {
  display: block;
  /* width: ; */
  height: 235px;
  object-fit: cover;
}

.me-text .social-buttons {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}

/* Icon size */
.me-text .social-buttons .icon {
  width: 60px;
  height: 60px;
  filter: var(--icon-color);
  transition: filter 0.2s ease-in-out;
  filter: brightness(0) invert(1);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(3, 5, 8, 0.1);
  backdrop-filter: blur(32px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* above canvas and control panel */
  font-family: "Baloo 2", sans-serif;
  transition: opacity 0.2s ease;
}

.overlay[style*="display: none"] {
  opacity: 0;
}


.overlay-content {
  width: min(90vw, 1200px);
  max-height: 80vh;
  /* background: rgba(14, 16, 19, 0.2); */
  /* border: 1px solid rgba(255, 255, 255, 0.04); */
  /* border-radius: 1rem; */
  padding: 1rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.overlay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.overlay-close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
}

.overlay-body {
  overflow-y: auto;
  max-height: 60vh;
  font-size: 0.85rem;
}

.overlay.prewarm {
  opacity: 0;
  pointer-events: none;
}


</style>
