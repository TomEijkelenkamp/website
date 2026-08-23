<template>
  <div class="app" :class="{ 'menu-mask-ready': menuMaskReady }">
    <div ref="container" class="canvas-container"></div>

    <!-- top bar -->
    <div class="top-bar">
      <button
        data-menu="research"
        @click="openOverlay('research')"
        :class="{ active: activeOverlay === 'research' }"
        @pointerenter="hoveredMenu = 'research'"
        @pointerleave="hoveredMenu = null"
        @focus="hoveredMenu = 'research'"
        @blur="hoveredMenu = null"
      >
        Research
      </button>

      <button
        data-menu="animation"
        @click="openOverlay('animation')"
        :class="{ active: activeOverlay === 'animation' }"
        @pointerenter="hoveredMenu = 'animation'"
        @pointerleave="hoveredMenu = null"
        @focus="hoveredMenu = 'animation'"
        @blur="hoveredMenu = null"
      >
        Animation
      </button>

      <button
        data-menu="dance"
        @click="openOverlay('dance')"
        :class="{ active: activeOverlay === 'dance' }"
        @pointerenter="hoveredMenu = 'dance'"
        @pointerleave="hoveredMenu = null"
        @focus="hoveredMenu = 'dance'"
        @blur="hoveredMenu = null"
      >
        Dance
      </button>

      <button
        data-menu="me"
        @click="openOverlay('me')"
        :class="{ active: activeOverlay === 'me' }"
        @pointerenter="hoveredMenu = 'me'"
        @pointerleave="hoveredMenu = null"
        @focus="hoveredMenu = 'me'"
        @blur="hoveredMenu = null"
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
            :class="{ 'animation-item--edge-crop': item.cropRightEdge }"
            tabindex="0"
            :aria-label="`${item.title} afspelen`"
            @mouseenter="startAnimationFromHover(item)"
            @mouseleave="stopAnimationFromHover(item.id)"
            @pointerdown="markAnimationPointerInput"
            @focusin="startAnimationFromFocus(item, $event)"
            @focusout="stopAnimation(item.id)"
            @click="toggleAnimation(item)"
          >
            <div class="animation-thumb">
              <img
                :src="item.thumbnail"
                :alt="item.title"
                :class="{ 'is-video-playing': playingAnimationId === item.id }"
              />
              <video
                v-show="activeAnimationId === item.id"
                :ref="el => setAnimationVideoRef(el, item.id)"
                :src="activeAnimationSource(item)"
                :class="{ 'is-playing': playingAnimationId === item.id }"
                :poster="item.thumbnail"
                muted
                playsinline
                disablepictureinpicture
                disableremoteplayback
                controlslist="nodownload noremoteplayback"
                x-webkit-airplay="deny"
                preload="metadata"
                @canplay="resumeAnimationIfActive(item)"
                @error="markAnimationStartFailed(item.id)"
                @playing="markAnimationPlaying(item.id)"
                @ended="advanceAnimation(item)"
              />
            </div>
          </article>
        </div>


          <div v-show="activeOverlay === 'dance'" class="dance-grid">
            <a
              class="dance-item"
              href="https://www.youtube.com/watch?v=s-8xOs1JN6A"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Love letters to robots bekijken op YouTube"
            >
              <div class="dance-image-wrapper">
                <img src="/dance/love-letters.jpg" alt="Love letters to robots" />
                <span class="youtube-hover-icon" aria-hidden="true"><span class="youtube-mark"></span><span class="new-tab-icon"></span></span>
              </div>
            </a>

            <a
              class="dance-item"
              href="https://www.youtube.com/watch?v=ZS1LA9eGNXo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Untitled bekijken op YouTube"
            >
              <div class="dance-image-wrapper">
                <img src="/dance/untitled.jpg" alt="Untitled" />
                <span class="youtube-hover-icon" aria-hidden="true"><span class="youtube-mark"></span><span class="new-tab-icon"></span></span>
              </div>
            </a>

            <a
              class="dance-item"
              href="https://www.youtube.com/watch?v=xU7iY7s7Fnc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2Dance Untitled 2026 bekijken op YouTube"
            >
              <div class="dance-image-wrapper">
                <img src="/dance/untitled-2026.jpg" alt="2Dance Untitled 2026" />
                <span class="youtube-hover-icon" aria-hidden="true"><span class="youtube-mark"></span><span class="new-tab-icon"></span></span>
              </div>
            </a>
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
              <a href="https://www.instagram.com/electric_graphic/" target="_blank" aria-label="Instagram">
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

    <div
      v-show="controlPanelOpen"
      ref="controlPanel"
      class="control-panel"
      :style="controlPanelStyle"
    >
      <div class="control-panel-header" @pointerdown="beginControlPanelDrag">
        <div class="control-panel-heading">
          <div>
            <strong>Simulation settings</strong>
            <span>Drag · resize</span>
          </div>
        </div>
        <button
          type="button"
          class="control-panel-close"
          aria-label="Close simulation settings"
          @pointerdown.stop
          @click="controlPanelOpen = false"
        >×</button>
      </div>

      <div class="control-panel-body">
      <div class="simulation-actions" aria-label="Simulation preview controls">
        <button type="button" :class="{ active: animationPaused }" @click="animationPaused = !animationPaused">
          {{ animationPaused ? 'Resume motion' : 'Pause motion' }}
        </button>
        <button type="button" :class="{ active: colorLayoutMode }" @click="colorLayoutMode = !colorLayoutMode">
          {{ colorLayoutMode ? 'Follow spline' : 'Color line' }}
        </button>
      </div>

      <section class="font-library">
        <label for="site-font-select">Typeface</label>
        <div class="font-select-wrap">
          <select id="site-font-select" v-model="selectedFont" :aria-busy="fontLoading">
            <optgroup v-for="group in fontGroups" :key="group.label" :label="group.label">
              <option v-for="font in group.fonts" :key="font.name" :value="font.name">
                {{ font.name }}
              </option>
            </optgroup>
          </select>
        </div>
        <div class="font-preview" :style="{ fontFamily: `'${appliedFont}', sans-serif` }">
          Tom Eijkelenkamp
        </div>
        <p>{{ activeFont.description }}<span v-if="fontLoading"> · Loading…</span></p>
      </section>

      <section>
        <label>
          Triangle count: {{ squareRes }} × {{ squareRes }} ({{ squareRes * squareRes }} triangles)
          <input type="range" min="1" max="12" step="1" v-model.number="squareRes" />
        </label>
      </section>

      <div class="two-columns">
        <section>
          <label>
            Path speed (desktop): {{ pathSpeed.toFixed(0) }}
            <input type="range" min="10" max="160" step="1" v-model.number="pathSpeed" />
          </label>
          <label>
            Turn freedom: {{ pathMorphSpeed.toFixed(2) }}
            <input type="range" min="0.1" max="1" step="0.05" v-model.number="pathMorphSpeed" />
          </label>
        </section>

        <section>
          <label>
            Look-ahead points: {{ pathPointCount }}
            <input type="range" min="12" max="24" step="1" v-model.number="pathPointCount" />
          </label>
          <label>
            Screen coverage: {{ pathCoverage.toFixed(2) }}
            <input type="range" min="0.35" max="1" step="0.01" v-model.number="pathCoverage" />
          </label>
          <label>
            Gravity feel: {{ gravityEffect.toFixed(2) }}
            <input type="range" min="0" max="0.8" step="0.01" v-model.number="gravityEffect" />
          </label>
          <label>
            Rotation lag: {{ rotationLag.toFixed(2) }}
            <input type="range" min="0.1" max="3" step="0.05" v-model.number="rotationLag" />
          </label>
        </section>
      </div>

      <div class="color-picker-grid">
        <HsvColorPicker label="Triangle color A" v-bind="colorA" @update="Object.assign(colorA, $event)" />
        <HsvColorPicker label="Triangle color B" v-bind="colorB" @update="Object.assign(colorB, $event)" />
      </div>
        <section>
          <div class="gradient-bar" :style="{ background: gradientCss }"></div>
        </section>

      <div class="two-columns">
        <section>
          <label>
            Min size (desktop): {{ sizeMin.toFixed(1) }}
            <input type="range" min="4" max="120" step="1" v-model.number="sizeMin" />
          </label>
          <label>
            Max size (desktop): {{ sizeMax.toFixed(1) }}
            <input type="range" min="80" max="600" step="5" v-model.number="sizeMax" />
          </label>
        </section>

        <section>
          <label>
            Train spread: {{ trainSpread.toFixed(2) }}
            <input type="range" min="0.15" max="1" step="0.01" v-model.number="trainSpread" />
          </label>
          <label>
            Edge frequency: {{ edgeFrequency.toFixed(2) }}
            <input type="range" min="0.25" max="2" step="0.05" v-model.number="edgeFrequency" />
          </label>
          <label>
            Edge depth: {{ edgeDepth.toFixed(1) }}
            <input type="range" min="0" max="10" step="0.25" v-model.number="edgeDepth" />
          </label>
        </section>
      </div>

      <div class="color-picker-grid">
        <HsvColorPicker label="Text color A" v-bind="textColorA" @update="Object.assign(textColorA, $event)" />
        <HsvColorPicker label="Text color B" v-bind="textColorB" @update="Object.assign(textColorB, $event)" />
      </div>
      <section>
        <div class="gradient-bar" :style="{ background: textGradientCss }"></div>
      </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick } from 'vue'
import * as THREE from 'three'
import HsvColorPicker from './components/HsvColorPicker.vue'
const activeOverlay = ref(null) // 'research' | 'animation' | 'dance' | 'me' | null
const hoveredMenu = ref(null)
const menuMaskReady = ref(false)

// NEW: flag to hide overlay while we prewarm
const isPrewarming = ref(true)

function openOverlay(which) {
  // toggle behavior: click same button again -> close
  activeOverlay.value = activeOverlay.value === which ? null : which
}

function closeOverlay() {
  activeOverlay.value = null
}

async function redrawTextMask() {
  await nextTick()
  if (!textFontReady || !container.value || !renderer) return
  const width = Math.max(1, container.value.clientWidth || window.innerWidth)
  const height = Math.max(1, container.value.clientHeight || window.innerHeight)
  loadSvgAsTexture(img, width, height)
}

watch([hoveredMenu, activeOverlay], redrawTextMask)

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
    title: 'Painted movement study',
    url: 'https://www.instagram.com/p/DUnz5v3CMAQ/?img_index=1',
    thumbnail: '/animation/painted-figure.png',
    videos: ['/animation/videos/painted-figure-01.mp4'],
  },
  {
    id: 2,
    title: 'Organic forms study',
    url: 'https://www.instagram.com/p/DSiKhPzjgQt/',
    thumbnail: '/animation/pink-forms.jpg',
    videos: ['/animation/videos/organic-forms-01.mp4'],
  },
  {
    id: 3,
    title: 'Animated landscape study',
    url: 'https://www.instagram.com/p/DR9VvVnDh_e/',
    thumbnail: '/animation/purple-landscape.jpg',
    videos: ['/animation/videos/animated-landscape-01.mp4'],
  },
  {
    id: 4,
    title: 'Generative art experiment 2',
    url: 'https://www.instagram.com/p/DRK6Hf5jnfd/',
    thumbnail: '/animation/flux.jpg',
    videos: ['/animation/videos/generative-art-2-01.mp4'],
  },
  {
    id: 5,
    title: 'Light play study',
    url: 'https://www.instagram.com/p/DN2zWV93JW0/',
    thumbnail: '/animation/matrix.jpg',
    videos: ['/animation/videos/light-play-01.mp4'],
  },
  {
    id: 6,
    title: 'Generative art experiment',
    url: 'https://www.instagram.com/p/DMkLJEeu8YD/',
    thumbnail: '/animation/moon.png',
    videos: ['/animation/videos/generative-art-01.mp4'],
  },
  {
    id: 7,
    title: 'Projection + movement test',
    url: 'https://www.instagram.com/p/DKO7ZbPs9O6/',
    thumbnail: '/animation/fire.png',
    videos: ['/animation/videos/projection-movement-01.mp4'],
  },
  {
    id: 8,
    title: 'Algorithmic art piece',
    url: 'https://www.instagram.com/p/DKMJjqQITft/',
    thumbnail: '/animation/creature.png',
    videos: ['/animation/videos/algorithmic-art-02.mp4'],
  },
  {
    id: 9,
    title: 'Dance piece – fragment 1',
    url: 'https://www.instagram.com/p/DHDockUOp5g/',
    thumbnail: '/animation/dance.jpg', // from script
    videos: ['/animation/videos/dance-fragment-01.mp4'],
    cropRightEdge: true,
  },
])

const activeAnimationId = ref(null)
const playingAnimationId = ref(null)
const startingAnimationId = ref(null)
const animationIndexes = reactive({})
const animationVideoRefs = new Map()
let lastAnimationPointerAt = -Infinity

function setAnimationVideoRef(element, id) {
  if (element) animationVideoRefs.set(id, element)
  else animationVideoRefs.delete(id)
}

function activeAnimationSource(item) {
  const index = animationIndexes[item.id] || 0
  return item.videos[index]
}

async function playActiveAnimation(item) {
  await nextTick()
  const video = animationVideoRefs.get(item.id)
  if (!video || activeAnimationId.value !== item.id) return
  video.muted = true
  video.play().catch(() => {
    if (activeAnimationId.value !== item.id) return markAnimationStartFailed(item.id)

    // If enough data was already available, make one fresh attempt. Otherwise
    // @canplay performs the retry when the cold-cache request finishes.
    if (video.readyState >= 2) {
      video.play().catch(() => markAnimationStartFailed(item.id))
    }
  })
}

function resumeAnimationIfActive(item) {
  if (
    activeAnimationId.value !== item.id ||
    playingAnimationId.value === item.id
  ) return

  const video = animationVideoRefs.get(item.id)
  if (!video) return
  video.muted = true
  video.play().catch(() => markAnimationStartFailed(item.id))
}

function markAnimationStartFailed(id) {
  if (startingAnimationId.value === id) startingAnimationId.value = null
}

function startAnimation(item) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  if (
    activeAnimationId.value === item.id &&
    (startingAnimationId.value === item.id || playingAnimationId.value === item.id)
  ) return

  if (activeAnimationId.value !== item.id) {
    stopAnimation(activeAnimationId.value)
    playingAnimationId.value = null
    animationIndexes[item.id] = animationIndexes[item.id] || 0
    activeAnimationId.value = item.id
  }

  startingAnimationId.value = item.id
  playActiveAnimation(item)
}

function stopAnimation(id) {
  if (id == null) return
  const video = animationVideoRefs.get(id)
  if (video) {
    video.pause()
    video.currentTime = 0
  }
  if (startingAnimationId.value === id) startingAnimationId.value = null
  if (playingAnimationId.value === id) playingAnimationId.value = null
  if (activeAnimationId.value === id) activeAnimationId.value = null
}

function markAnimationPlaying(id) {
  if (activeAnimationId.value === id) {
    startingAnimationId.value = null
    playingAnimationId.value = id
  }
}

function startAnimationFromFocus(item, event) {
  const cameFromPointer = performance.now() - lastAnimationPointerAt < 750
  if (!cameFromPointer && event.currentTarget.matches(':focus-visible')) {
    startAnimation(item)
  }
}

function startAnimationFromHover(item) {
  if (window.matchMedia('(hover: hover)').matches) startAnimation(item)
}

function stopAnimationFromHover(id) {
  if (window.matchMedia('(hover: hover)').matches) stopAnimation(id)
}

function markAnimationPointerInput() {
  lastAnimationPointerAt = performance.now()
}

function toggleAnimation(item) {
  if (window.matchMedia('(hover: hover)').matches) return
  if (activeAnimationId.value === item.id) stopAnimation(item.id)
  else startAnimation(item)
}

function advanceAnimation(item) {
  const currentIndex = animationIndexes[item.id] || 0
  animationIndexes[item.id] = (currentIndex + 1) % item.videos.length
  playActiveAnimation(item)
}

// if your dance images are inline in the template, you can define them here:
const danceImageUrls = [
  '/dance/love-letters.jpg',
  '/dance/untitled.jpg',
  '/dance/untitled-2026.jpg',
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

const mouseEnabled = computed(() => activeOverlay.value === null)

const fontGroups = [
  {
    label: 'Art-led · graphic',
    fonts: [
      { name: 'Syne', description: 'Art-driven, eccentric and deliberately uneven.' },
      { name: 'Space Grotesk', description: 'Graphic and contemporary with sharper details.' },
      { name: 'Bricolage Grotesque', description: 'Cultural, restless and full of visual personality.' },
      { name: 'Anybody', description: 'Unconventional proportions with a poster-like voice.' },
      { name: 'Anek Latin', description: 'Flexible, editorial and less polished in a useful way.' },
      { name: 'Big Shoulders Display', description: 'Architectural, narrow and dramatically constructed.' },
      { name: 'Staatliches', description: 'Direct, poster-like and stripped of softness.' },
      { name: 'Antonio', description: 'Tall, decisive and suited to an artist identity.' },
      { name: 'League Gothic', description: 'Classic poster proportions without feeling ornate.' },
      { name: 'IBM Plex Mono', description: 'Systematic and intellectual with human detail.' },
    ],
  },
  {
    label: 'Print · editorial',
    fonts: [
      { name: 'Fraunces', description: 'Expressive 1970s warmth with contemporary control.' },
      { name: 'Newsreader', description: 'Cultured magazine typography that stays understated.' },
      { name: 'Spectral', description: 'Literary, textured and strong at small sizes.' },
      { name: 'Source Serif 4', description: 'Editorial authority without decorative excess.' },
      { name: 'Bitter', description: 'Solid slab-serif forms with an approachable print feel.' },
      { name: 'Vollkorn', description: 'Dark, tactile and reminiscent of printed books.' },
      { name: 'BioRhyme', description: 'Chunky slab-serif with unusual rhythm and personality.' },
      { name: 'Lora', description: 'Calligraphic details balanced by practical readability.' },
      { name: 'DM Serif Display', description: 'High-impact editorial display with fluid shapes.' },
      { name: 'Libre Caslon Display', description: 'Loose, characterful display lettering for large text.' },
    ],
  },
  {
    label: 'Poster · character',
    fonts: [
      { name: 'Bodoni Moda', description: 'Fashion-led contrast with a dramatic silhouette.' },
      { name: 'Cormorant Garamond', description: 'Fragile, artistic and intentionally idiosyncratic.' },
      { name: 'Josefin Sans', description: 'Art-deco geometry with a light vintage accent.' },
      { name: 'Tenor Sans', description: 'Elegant poster lettering with restrained character.' },
      { name: 'Marcellus', description: 'Carved, cinematic forms with quiet authority.' },
      { name: 'Forum', description: 'Open classical proportions that feel theatrical.' },
      { name: 'Federo', description: 'Early-modern display lettering with unusual details.' },
      { name: 'Limelight', description: 'Bold art-deco display built for titles and posters.' },
      { name: 'Grenze', description: 'Expressive hybrid shapes between editorial and experimental.' },
      { name: 'Yeseva One', description: 'Softly theatrical display type with a hand-made quality.' },
    ],
  },
]

const fontOptions = fontGroups.flatMap(group => group.fonts)
const selectedFont = ref('Marcellus')
const appliedFont = ref('Marcellus')
const fontLoading = ref(false)
const activeFont = computed(() => fontOptions.find(font => font.name === selectedFont.value) || fontOptions[0])
let fontLoadRequest = 0

watch(selectedFont, async (fontName) => {
  const requestId = ++fontLoadRequest
  fontLoading.value = true
  try {
    await document.fonts.load(`400 48px "${fontName}"`)
    if (requestId !== fontLoadRequest) return
    appliedFont.value = fontName
    document.documentElement.style.setProperty('--site-font', `"${fontName}"`)
    if (container.value && renderer) {
      const width = Math.max(1, container.value.clientWidth || window.innerWidth)
      const height = Math.max(1, container.value.clientHeight || window.innerHeight)
      loadSvgAsTexture(img, width, height)
    }
  } catch {
    // Keep the last fully loaded font when a remote font cannot be fetched.
  } finally {
    if (requestId === fontLoadRequest) fontLoading.value = false
  }
})


const container = ref(null)
const hasPointer = ref(false)

// UI state
const controlPanelOpen = ref(false)
const controlPanel = ref(null)
const controlPanelPosition = reactive({ x: null, y: null })
let controlPanelDrag = null

const controlPanelStyle = computed(() => {
  if (controlPanelPosition.x == null || controlPanelPosition.y == null) return {}
  return {
    left: `${controlPanelPosition.x}px`,
    top: `${controlPanelPosition.y}px`,
    right: 'auto',
  }
})

function clampControlPanelPosition(x, y) {
  const panel = controlPanel.value
  if (!panel) return { x, y }
  const margin = 8
  const maxX = Math.max(margin, window.innerWidth - panel.offsetWidth - margin)
  const maxY = Math.max(margin, window.innerHeight - panel.offsetHeight - margin)
  return {
    x: clamp(margin, x, maxX),
    y: clamp(margin, y, maxY),
  }
}

function beginControlPanelDrag(event) {
  if (event.button !== 0) return
  const panel = controlPanel.value
  if (!panel) return

  const rect = panel.getBoundingClientRect()
  controlPanelDrag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  }
  controlPanelPosition.x = rect.left
  controlPanelPosition.y = rect.top
  event.currentTarget.setPointerCapture?.(event.pointerId)
  window.addEventListener('pointermove', moveControlPanel)
  window.addEventListener('pointerup', endControlPanelDrag)
  window.addEventListener('pointercancel', endControlPanelDrag)
  event.preventDefault()
}

function moveControlPanel(event) {
  if (!controlPanelDrag || event.pointerId !== controlPanelDrag.pointerId) return
  const next = clampControlPanelPosition(
    event.clientX - controlPanelDrag.offsetX,
    event.clientY - controlPanelDrag.offsetY,
  )
  controlPanelPosition.x = next.x
  controlPanelPosition.y = next.y
}

function endControlPanelDrag(event) {
  if (controlPanelDrag && event.pointerId !== controlPanelDrag.pointerId) return
  controlPanelDrag = null
  window.removeEventListener('pointermove', moveControlPanel)
  window.removeEventListener('pointerup', endControlPanelDrag)
  window.removeEventListener('pointercancel', endControlPanelDrag)
}

function keepControlPanelInViewport() {
  if (controlPanelPosition.x == null || controlPanelPosition.y == null) return
  const next = clampControlPanelPosition(controlPanelPosition.x, controlPanelPosition.y)
  controlPanelPosition.x = next.x
  controlPanelPosition.y = next.y
}

const squareRes = ref(3) // 3x3 = 9 triangles
const animationPaused = ref(false)
const colorLayoutMode = ref(false)

const colorA = reactive({ h: 79, s: 0.98, v: 0.90 })
const colorB = reactive({ h: 92, s: 1.00, v: 0.45 })
const textColorA = reactive({ h: 360, s: 1.00, v: 0.52 })
const textColorB = reactive({ h: 314, s: 0.39, v: 1.00 })

const sizeMin = ref(18)
const sizeMax = ref(585)
const viewportScale = ref(1)
const effectiveSizeMin = computed(() => sizeMin.value * viewportScale.value)
const effectiveSizeMax = computed(() => sizeMax.value * viewportScale.value)
const pathSpeed = ref(58)
const effectivePathSpeed = computed(() => pathSpeed.value * viewportScale.value)
const pathMorphSpeed = ref(0.55)
const pathPointCount = ref(14)
const pathCoverage = ref(0.98)
const gravityEffect = ref(0.22)
const rotationLag = ref(0.65)
const trainSpread = ref(1)
const edgeFrequency = ref(0.25)
const edgeDepth = ref(10)

function clamp(min, val, max) {
  return Math.min(Math.max(val, min), max)
}

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
let splineStates = []
let sharedSpline = null
let animationId = null
let mouse = new THREE.Vector2(0, 0)
let bounds = new THREE.Vector2(1, 1)
let clock

// extra for text overlay
let simRenderTarget   // offscreen render of squares
let postScene         // scene for the post / screen quad
let postMesh          // the quad
let textTexture       // canvas text
let resizeObserver
let textFontReady = false
let resumeFrame = null
let contextRecoveryTimer = null
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
  ctx.font = `${fontWeight} ${fontSize}px "${appliedFont.value}", sans-serif`

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

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  const margin = Math.max(24, Math.min(100, targetWidth * 0.065))
  let titleSize = Math.max(28, Math.min(58, targetWidth * 0.038))
  ctx.font = `500 ${titleSize}px "${appliedFont.value}", sans-serif`
  const maxTitleWidth = targetWidth - margin * 2
  const measuredWidth = ctx.measureText('Tom Eijkelenkamp').width
  if (measuredWidth > maxTitleWidth) titleSize *= maxTitleWidth / measuredWidth

  const subtitleSize = Math.max(12, titleSize * 0.23)
  const subtitleY = targetHeight - margin
  const titleY = subtitleY - subtitleSize * 1.75

  ctx.font = `500 ${titleSize}px "${appliedFont.value}", sans-serif`
  ctx.fillText('Tom Eijkelenkamp', margin, titleY)
  ctx.font = `400 ${subtitleSize}px "${appliedFont.value}", sans-serif`
  ctx.fillText('Artist · Graphics · Algorithmic Design', margin, subtitleY)

  const containerRect = container.value?.getBoundingClientRect()
  if (containerRect) {
    document.querySelectorAll('.top-bar button[data-menu]').forEach((button) => {
      const rect = button.getBoundingClientRect()
      const styles = window.getComputedStyle(button)
      const fontSize = Number.parseFloat(styles.fontSize) || 16
      const label = button.textContent.trim()
      const centerX = rect.left - containerRect.left + rect.width / 2
      const centerY = rect.top - containerRect.top + rect.height / 2

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `500 ${fontSize}px "${appliedFont.value}", sans-serif`
      ctx.fillText(label, centerX, centerY)

      const menuName = button.dataset.menu
      if (hoveredMenu.value === menuName || activeOverlay.value === menuName) {
        const textWidth = ctx.measureText(label).width
        ctx.fillRect(centerX - textWidth / 2, centerY + fontSize * 0.62, textWidth, 1)
      }
    })
  }

  // make texture
  postMesh?.geometry.dispose()
  postMesh?.material.dispose()
  textTexture?.dispose()

  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.generateMipmaps = false
  tex.needsUpdate = true
  textTexture = tex

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

        // Detect triangle coverage independently from the subtle pastel colors.
        // The paper is nearly unsaturated and slightly brighter than the shapes.
        float shapeSignal = length(vec2(
          max(baseHSV.y - 0.025, 0.0),
          max(0.975 - baseHSV.z, 0.0)
        ));
        float coverage = smoothstep(0.012, 0.040, shapeSignal);

        // React to brightness rather than hue or saturation: the text stays
        // dark on the pale paper and becomes lighter as the shape behind it
        // gets darker.
        float paperValue = 0.992;
        float valueRange = max(paperValue - uBgHSV_B.z, 0.00001);
        float darkness = clamp(
          (paperValue - baseHSV.z) / valueRange,
          0.0,
          1.0
        );
        float lightening = coverage * smoothstep(0.05, 0.85, darkness);
        vec3 textHSV = mix(uTextHSV_A, uTextHSV_B, lightening);

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
  cancelAnimationFrame(resumeFrame)
  clearTimeout(contextRecoveryTimer)
  resizeObserver?.disconnect()
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pageshow', resumeAfterExternalNavigation)
  window.removeEventListener('focus', resumeAfterExternalNavigation)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('pointermove', moveControlPanel)
  window.removeEventListener('pointerup', endControlPanelDrag)
  window.removeEventListener('pointercancel', endControlPanelDrag)
  renderer?.domElement.removeEventListener('webglcontextlost', handleWebGLContextLost)
  renderer?.domElement.removeEventListener('webglcontextrestored', resumeAfterExternalNavigation)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('keydown', onKeyDown)
  renderer?.dispose()
})

watch(squareRes, (newVal) => {
  buildSimulation(newVal)
})

let img = new Image()
img.src = "/svg/normal.svg"

function initThree() {
  const el = container.value
  const w = Math.max(1, el.clientWidth || window.innerWidth)
  const h = Math.max(1, el.clientHeight || window.innerHeight)
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  viewportScale.value = clamp(0.25, Math.min(w / 1280, h / 800), 1)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(dpr)
  renderer.setSize(w, h)
  renderer.setClearColor(0xfbfdf9, 1)
  el.appendChild(renderer.domElement)
  renderer.domElement.addEventListener('webglcontextlost', handleWebGLContextLost)
  renderer.domElement.addEventListener('webglcontextrestored', resumeAfterExternalNavigation)

  scene = new THREE.Scene()

  camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -100, 100)
  camera.position.set(0, 0, 10)

  bounds.set(w / 2, h / 2)

  clock = new THREE.Clock()

  simRenderTarget = new THREE.WebGLRenderTarget(
    Math.round(w * dpr),
    Math.round(h * dpr),
    {
      depthBuffer: false,
      stencilBuffer: false,
    }
  )
  simRenderTarget.samples = 4

  // Only create the title texture after the selected face is available. This
  // prevents the canvas from briefly drawing the title in a fallback font.
  document.fonts.load(`400 48px "${appliedFont.value}"`).then((faces) => {
    if (!faces.length) return
    if (!container.value || !renderer) return
    textFontReady = true
    const currentWidth = Math.max(1, container.value.clientWidth || window.innerWidth)
    const currentHeight = Math.max(1, container.value.clientHeight || window.innerHeight)
    loadSvgAsTexture(img, currentWidth, currentHeight)
    menuMaskReady.value = true
  }).catch(() => {})

  window.addEventListener('resize', onResize)
  window.addEventListener('pageshow', resumeAfterExternalNavigation)
  window.addEventListener('focus', resumeAfterExternalNavigation)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(el)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('pointerdown', () => { mouseEnabled.value = true })
  window.addEventListener('pointerup', () => { mouseEnabled.value = false })
}

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') resumeAfterExternalNavigation()
}

function handleWebGLContextLost() {
  cancelAnimationFrame(animationId)
}

function resumeAfterExternalNavigation() {
  if (document.visibilityState === 'hidden' || !renderer || !container.value) return

  cancelAnimationFrame(resumeFrame)
  resumeFrame = requestAnimationFrame(() => {
    const context = renderer.getContext()

    if (context?.isContextLost()) {
      clearTimeout(contextRecoveryTimer)
      contextRecoveryTimer = window.setTimeout(() => {
        if (renderer?.getContext()?.isContextLost()) window.location.reload()
      }, 750)
      return
    }

    clearTimeout(contextRecoveryTimer)
    if (!renderer.domElement.isConnected) container.value.appendChild(renderer.domElement)
    onResize()
    clock?.getDelta()
    cancelAnimationFrame(animationId)
    animationId = requestAnimationFrame(animate)
  })
}

let dtPosition // keep reference for mass updates

function splinePoint(points, progress) {
  const maxProgress = Math.max(0.001, points.length - 3.001)
  const safeProgress = clamp(0, progress, maxProgress)
  const index = Math.min(Math.floor(safeProgress), points.length - 4)
  const t = safeProgress - index
  const t2 = t * t
  const t3 = t2 * t
  const p0 = points[index]
  const p1 = points[index + 1]
  const p2 = points[index + 2]
  const p3 = points[index + 3]
  const b0 = (-t3 + 3 * t2 - 3 * t + 1) / 6
  const b1 = (3 * t3 - 6 * t2 + 4) / 6
  const b2 = (-3 * t3 + 3 * t2 + 3 * t + 1) / 6
  const b3 = t3 / 6
  return new THREE.Vector2(
    p0.x * b0 + p1.x * b1 + p2.x * b2 + p3.x * b3,
    p0.y * b0 + p1.y * b1 + p2.y * b2 + p3.y * b3
  )
}

function randomScreenPoint() {
  return new THREE.Vector2(
    (Math.random() * 2 - 1) * Math.max(40, bounds.x - 30) * pathCoverage.value,
    (Math.random() * 2 - 1) * Math.max(40, bounds.y - 30) * pathCoverage.value
  )
}

function createNextSplinePoint(points) {
  if (points.length < 2) return randomScreenPoint()
  const previous = points[points.length - 2]
  const last = points[points.length - 1]
  const forward = last.clone().sub(previous).normalize()
  const minDistance = Math.min(bounds.x, bounds.y) * 0.35

  for (let attempt = 0; attempt < 24; attempt++) {
    const candidate = randomScreenPoint()
    const direction = candidate.clone().sub(last)
    if (direction.length() < minDistance) continue
    direction.normalize()
    const minimumDot = -0.15 - pathMorphSpeed.value * 0.70
    if (direction.dot(forward) > minimumDot) return candidate
  }

  return randomScreenPoint()
}

function createSharedSplinePoints(pointCount = pathPointCount.value) {
  const points = [randomScreenPoint(), randomScreenPoint()]
  while (points.length < pointCount) points.push(createNextSplinePoint(points))
  return points
}

function createSplineState(seed) {
  const size = effectiveSizeMin.value
    + (effectiveSizeMax.value - effectiveSizeMin.value) * seed
  return {
    seed,
    size,
    angle: Math.random() * Math.PI * 2,
  }
}

function buildSimulation(res) {
  // remove old mesh
  if (renderMesh) {
    scene.remove(renderMesh)
    renderMesh.geometry.dispose()
    renderMesh.material.dispose()
    renderMesh = null
  }

  const uvs = []
    const count = res * res
    const distributedSeeds = Array.from(
      { length: count },
      (_, index) => count === 1 ? 0.5 : index / (count - 1)
    )

    for (let i = distributedSeeds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[distributedSeeds[i], distributedSeeds[j]] = [distributedSeeds[j], distributedSeeds[i]]
    }

    const seeds = []
    let seedIndex = 0
    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        const u = i / (res - 1 || 1)
        const v = j / (res - 1 || 1)
        uvs.push(u, v)
        seeds.push(distributedSeeds[seedIndex++])
      }
    }

  gpuCompute = null
  velVar = null
  posVar = null

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

  const instanced = new THREE.InstancedMesh(triangle, createRenderMaterial(), count)

  instanced.geometry.setAttribute('aRef', new THREE.InstancedBufferAttribute(new Float32Array(uvs), 2))
  instanced.geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(new Float32Array(seeds), 1))
  instanced.geometry.setAttribute(
    'aPreviewSeed',
    new THREE.InstancedBufferAttribute(
      new Float32Array(Array.from({ length: count }, (_, index) => count === 1 ? 0.5 : index / (count - 1))),
      1,
    ),
  )

  scene.add(instanced)
  renderMesh = instanced
  splineStates = seeds.map(createSplineState)
  const points = createSharedSplinePoints()
  sharedSpline = {
    points,
    progress: Math.min(7, points.length - 5),
    speed: effectivePathSpeed.value,
    baseSpeed: effectivePathSpeed.value,
  }
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
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uSizeMin: { value: effectiveSizeMin.value },
      uSizeMax: { value: effectiveSizeMax.value },
      uColorLayout: { value: 0 },
      uEdgeFrequency: { value: edgeFrequency.value },
      uEdgeDepth: { value: edgeDepth.value },
    },
    vertexShader: /* glsl */`
      precision highp float;
      attribute vec3 position;
      attribute float aSeed;
      attribute mat4 instanceMatrix;
      uniform mat4 projectionMatrix;
      uniform mat4 modelViewMatrix;
      uniform float uSizeMin;
      uniform float uSizeMax;
      varying float vSeed;
      attribute float aPreviewSeed;
      varying float vPreviewSeed;
      attribute vec3 aBarycentric;
      varying vec3 vBarycentric;
      varying float vSize;

      
      void main() {
        float size = uSizeMin + (uSizeMax - uSizeMin) * aSeed;
        vSize = size;
        vSeed = aSeed;
        vPreviewSeed = aPreviewSeed;
        vBarycentric = aBarycentric;
        vec4 worldPosition = instanceMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * worldPosition;
      }

    `,
    fragmentShader: /* glsl */`
      precision highp float;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uColorLayout;
      uniform float uEdgeFrequency;
      uniform float uEdgeDepth;
      varying float vSeed;
      varying float vPreviewSeed;
      varying vec3 vBarycentric;
      varying float vSize;

      void main() {
        float randomT = fract(sin(vSeed * 43758.5453123) * 43758.5453123);
        float t = mix(randomT, vPreviewSeed, uColorLayout);
        vec3 col = mix(uColorA, uColorB, t);

        float edgeDist = min(min(vBarycentric.x, vBarycentric.y), vBarycentric.z);

        // Layered waves give every edge a slightly different hand-drawn wobble.
        float strokeSeed = vSeed * 41.73;
        float waveA = sin(
          (gl_FragCoord.x * 0.037 + gl_FragCoord.y * 0.021) * uEdgeFrequency
          + strokeSeed
        );
        float waveB = sin(
          (gl_FragCoord.x * 0.011 - gl_FragCoord.y * 0.045) * uEdgeFrequency
          - strokeSeed * 1.7
        );
        float wobblePixels = uEdgeDepth
          * (1.0 + waveA * 0.4375 + waveB * 0.296875);
        float edge = wobblePixels / max(vSize, 1.0);
        float feather = 0.60 / max(vSize, 1.0);
        float alpha = smoothstep(edge - feather, edge + feather, edgeDist);

        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
  })
}

function animate() {
  const dt = Math.min(clock.getDelta(), 0.05)

  if (renderMesh && sharedSpline) {
    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const rotation = new THREE.Quaternion()
    const scale = new THREE.Vector3()
    const axis = new THREE.Vector3(0, 0, 1)

    if (colorLayoutMode.value) {
      const viewWidth = bounds.x * 2
      const viewHeight = bounds.y * 2
      const margin = Math.max(24, Math.min(100, viewWidth * 0.065))
      const titleSize = Math.max(28, Math.min(58, viewWidth * 0.038))
      const subtitleSize = Math.max(12, titleSize * 0.23)
      const titleY = viewHeight - margin - subtitleSize * 1.75
      const lineWidth = Math.min(viewWidth - margin * 2, titleSize * 7.9)
      const triangleSize = clamp(
        22,
        Math.min(titleSize * 1.2, (lineWidth / Math.max(1, splineStates.length - 1)) * 0.72),
        74,
      )

      splineStates.forEach((state, index) => {
        const amount = splineStates.length === 1 ? 0.5 : index / (splineStates.length - 1)
        const screenX = margin + lineWidth * amount
        position.set(screenX - bounds.x, bounds.y - titleY, 0)
        rotation.setFromAxisAngle(axis, index % 2 === 0 ? 0 : Math.PI)
        scale.set(triangleSize, triangleSize, 1)
        matrix.compose(position, rotation, scale)
        renderMesh.setMatrixAt(index, matrix)
      })
      renderMesh.instanceMatrix.needsUpdate = true
    } else if (!animationPaused.value) {
      const leader = splinePoint(sharedSpline.points, sharedSpline.progress)
      const leaderAhead = splinePoint(sharedSpline.points, sharedSpline.progress + 0.01)
      const leaderTangent = leaderAhead.clone().sub(leader).normalize()
      sharedSpline.baseSpeed = effectivePathSpeed.value
      const targetSpeed = sharedSpline.baseSpeed * (
        1 + Math.max(0, -leaderTangent.y) * gravityEffect.value
        - Math.max(0, leaderTangent.y) * gravityEffect.value * 0.5
      )
      sharedSpline.speed += (targetSpeed - sharedSpline.speed) * (1 - Math.exp(-0.65 * dt))
      const pixelsPerProgress = Math.max(20, leader.distanceTo(leaderAhead) * 100)
      sharedSpline.progress += sharedSpline.speed * dt / pixelsPerProgress

      while (sharedSpline.points.length - 3 - sharedSpline.progress < 5) {
        sharedSpline.points.push(createNextSplinePoint(sharedSpline.points))
      }

      const pointSpacing = 0.52 * trainSpread.value
      let tailProgress = sharedSpline.progress - (splineStates.length - 1) * pointSpacing
      while (tailProgress > 2.5 && sharedSpline.points.length > pathPointCount.value) {
        sharedSpline.points.shift()
        sharedSpline.progress -= 1
        tailProgress -= 1
      }

      splineStates.forEach((state, index) => {
        const progress = Math.max(0, sharedSpline.progress - index * pointSpacing)
        const here = splinePoint(sharedSpline.points, progress)
        const ahead = splinePoint(sharedSpline.points, progress + 0.01)
        const tangent = ahead.clone().sub(here).normalize()
        const response = rotationLag.value * (
          0.7 + (1 - state.size / effectiveSizeMax.value) * 0.6
        )

        const targetAngle = Math.atan2(tangent.y, tangent.x) - Math.PI / 2
        const angleDelta = Math.atan2(
          Math.sin(targetAngle - state.angle),
          Math.cos(targetAngle - state.angle)
        )
        state.angle += angleDelta * (1 - Math.exp(-response * dt))

        position.set(here.x, here.y, 0)
        rotation.setFromAxisAngle(axis, state.angle)
        scale.set(state.size, state.size, 1)
        matrix.compose(position, rotation, scale)
        renderMesh.setMatrixAt(index, matrix)
      })
      renderMesh.instanceMatrix.needsUpdate = true
    }

    const ca = hsvToRgb(colorA.h, colorA.s, colorA.v)
    const cb = hsvToRgb(colorB.h, colorB.s, colorB.v)
    renderMesh.material.uniforms.uColorA.value.set(ca.r, ca.g, ca.b)
    renderMesh.material.uniforms.uColorB.value.set(cb.r, cb.g, cb.b)
    renderMesh.material.uniforms.uSizeMin.value = effectiveSizeMin.value
    renderMesh.material.uniforms.uSizeMax.value = effectiveSizeMax.value
    renderMesh.material.uniforms.uColorLayout.value = colorLayoutMode.value ? 1 : 0
    renderMesh.material.uniforms.uEdgeFrequency.value = edgeFrequency.value
    renderMesh.material.uniforms.uEdgeDepth.value = edgeDepth.value
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

  // PASS 1: render squares to offscreen
  renderer.setRenderTarget(simRenderTarget)
  renderer.clear()
  renderer.render(scene, camera)

  // PASS 2: always return to the visible canvas. If the text composition is
  // not ready yet, show the triangle scene directly instead of a blank frame.
  renderer.setRenderTarget(null)
  renderer.clear()
  if (postScene) {
    renderer.render(postScene, camera)
  } else {
    renderer.render(scene, camera)
  }

  animationId = requestAnimationFrame(animate)
}


function onResize() {
  if (!container.value || !renderer || !camera) return
  const w = Math.max(1, container.value.clientWidth || window.innerWidth)
  const h = Math.max(1, container.value.clientHeight || window.innerHeight)
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  renderer.setPixelRatio(dpr)
  renderer.setSize(w, h)
  simRenderTarget?.setSize(Math.round(w * dpr), Math.round(h * dpr))
  camera.left = -w / 2
  camera.right = w / 2
  camera.top = h / 2
  camera.bottom = -h / 2
  camera.updateProjectionMatrix()

  bounds.set(w / 2, h / 2)
  viewportScale.value = clamp(0.25, Math.min(w / 1280, h / 800), 1)
  splineStates.forEach(state => {
    state.size = effectiveSizeMin.value
      + (effectiveSizeMax.value - effectiveSizeMin.value) * state.seed
  })
  if (renderMesh && sharedSpline) {
    const points = createSharedSplinePoints(sharedSpline.points.length)
    sharedSpline.points = points
    sharedSpline.progress = Math.min(7, points.length - 5)
  }
  if (textFontReady) loadSvgAsTexture(img, w, h)
  keepControlPanelInViewport()
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

function onKeyDown(e) {
  if (e.altKey && e.key.toLowerCase() === 'c') {
    e.preventDefault()
    controlPanelOpen.value = !controlPanelOpen.value
  }
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
watch([sizeMin, sizeMax, pathPointCount], () => {
  if (renderer && scene) buildSimulation(squareRes.value)
})
</script>

<style scoped>
.canvas-container {
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
}

.control-panel {
  position: fixed;
  top: 3.7rem;
  right: 1rem;
  display: flex;
  width: min(380px, calc(100vw - 1rem));
  height: min(720px, calc(100dvh - 4.7rem));
  min-width: 280px;
  min-height: 260px;
  max-width: calc(100vw - 1rem);
  max-height: calc(100dvh - 1rem);
  overflow: hidden;
  color: #234839;
  font-size: 0.75rem;
  flex-direction: column;
  background: rgba(249, 251, 247, 0.94);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(35, 72, 57, 0.16);
  border-radius: 0.7rem;
  box-shadow: 0 0.8rem 2.2rem rgba(23, 59, 43, 0.12);
  pointer-events: auto;
  resize: both;
  z-index: 1300;
  container: settings-panel / inline-size;
}

.control-panel-header {
  min-height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.52rem 0.58rem 0.52rem 0.72rem;
  border-bottom: 1px solid rgba(35, 72, 57, 0.1);
  background: rgba(255, 255, 255, 0.36);
  cursor: grab;
  user-select: none;
  touch-action: none;
}

.control-panel-header:active {
  cursor: grabbing;
}

.control-panel-heading { display: flex; align-items: center; }

.control-panel-heading div {
  display: flex;
  flex-direction: column;
  gap: 0.06rem;
}

.control-panel-heading strong {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.control-panel-heading div > span {
  font-size: 0.62rem;
  opacity: 0.55;
}

.control-panel-close {
  width: 1.65rem;
  height: 1.65rem;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #234839;
  background: transparent;
  font: inherit;
  font-size: 1.15rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
}

.control-panel-close:hover {
  background: rgba(35, 72, 57, 0.07);
}

.control-panel-body {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.65rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(35, 72, 57, 0.28) transparent;
}

.simulation-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.42rem;
  margin-bottom: 0.55rem;
}

.simulation-actions button {
  min-height: 2.15rem;
  padding: 0.42rem 0.6rem;
  border: 1px solid rgba(35, 72, 57, 0.16);
  border-radius: 0.45rem;
  color: #234839;
  background: rgba(255, 255, 255, 0.58);
  font: inherit;
  font-size: 0.66rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.simulation-actions button:hover {
  border-color: rgba(35, 72, 57, 0.3);
  background: rgba(255, 255, 255, 0.9);
}

.simulation-actions button.active {
  border-color: rgba(35, 72, 57, 0.34);
  background: rgba(143, 222, 143, 0.28);
}

.control-panel section {
  margin: 0 0 0.55rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 0.45rem;
  background: rgba(35, 72, 57, 0.035);
}

.control-panel h3 {
  margin: 0 0 0.26rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  opacity: 0.78;
}

.control-panel label {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  margin-bottom: 0.36rem;
  line-height: 1.28;
}

.font-library {
  display: grid;
  gap: 0.42rem;
}

.font-library > label {
  margin: 0;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.035em;
  text-transform: uppercase;
  opacity: 0.62;
}

.font-select-wrap {
  position: relative;
}

.font-select-wrap::after {
  content: '⌄';
  position: absolute;
  top: 50%;
  right: 0.7rem;
  pointer-events: none;
  transform: translateY(-58%);
  opacity: 0.55;
}

.font-library select {
  width: 100%;
  height: 2.25rem;
  padding: 0 2rem 0 0.68rem;
  border: 1px solid rgba(35, 72, 57, 0.16);
  border-radius: 0.45rem;
  color: #234839;
  background: rgba(255, 255, 255, 0.72);
  font: inherit;
  cursor: pointer;
  appearance: none;
}

.font-library select:focus-visible {
  outline: 2px solid rgba(66, 154, 97, 0.36);
  outline-offset: 1px;
}

.font-library select:disabled {
  cursor: wait;
  opacity: 0.62;
}

.font-preview {
  overflow: hidden;
  padding: 0.28rem 0.08rem 0.08rem;
  font-size: clamp(1.05rem, 7cqw, 1.55rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.045em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.font-library p {
  min-height: 2.2em;
  margin: 0;
  font-size: 0.62rem;
  line-height: 1.35;
  opacity: 0.62;
}

.control-panel input[type="range"] {
  width: 100%;
  margin: 0;
  accent-color: #429a61;
  cursor: pointer;
}

.gradient-bar {
  width: 100%;
  height: 16px;
  border-radius: 999px;
  border: 1px solid rgba(35, 72, 57, 0.12);
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
}

.three-columns {
  display: grid;
  grid-template-columns: 1fr;
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
  background: transparent;
  border: 0;
  border-bottom: 1px solid transparent;
  color: #234839;

  /* padding scales with width */
  padding: 0.2rem 0.1rem;

  cursor: pointer;

  /* font size scales with width */
  font-size: clamp(0.82rem, 0.74rem + 0.35vw, 1.15rem);
  font-family: var(--site-font, "Space Grotesk"), sans-serif;
  font-weight: 500;
  letter-spacing: -0.035em;
}

.color-picker-grid {
  display: grid;
  gap: 0.55rem;
  margin-bottom: 0.55rem;
}

@container settings-panel (min-width: 470px) {
  .two-columns,
  .color-picker-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .three-columns {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .control-panel {
    top: 0.5rem;
    right: 0.5rem;
    width: calc(100vw - 1rem);
    height: calc(100dvh - 1rem);
    min-width: 0;
    max-width: calc(100vw - 1rem);
    max-height: calc(100dvh - 1rem);
    resize: none;
  }
}

.top-bar button:hover {
  background: transparent;
  border-bottom-color: rgba(35, 72, 57, 0.35);
}

.top-bar button.active {
  background: transparent;
  border-bottom-color: #173b2b;
  color: #173b2b;
}

.app.menu-mask-ready .top-bar button,
.app.menu-mask-ready .top-bar button:hover,
.app.menu-mask-ready .top-bar button.active {
  border-bottom-color: transparent;
  color: transparent;
}

.top-bar button:focus-visible {
  border-radius: 0.15rem;
  outline: 1px solid rgba(35, 72, 57, 0.48);
  outline-offset: 0.2rem;
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
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: -0.035em;
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
  position: relative;
  /* height: 100%; */
}

.animation-thumb img,
.animation-thumb video {
  display: block;
  width: 100%;
  height: 100%;
  /* width: 100%; */
  /* height: auto; */
  object-fit: cover;
  object-position: center;    /* crop from center (important!) */
  transition: opacity 0.22s ease, transform 0.35s ease;
}

.animation-thumb video {
  background: #000;
  position: absolute;
  inset: 0;
  opacity: 0;
}

.animation-thumb video.is-playing {
  opacity: 1;
}

.animation-thumb img.is-video-playing {
  opacity: 0;
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
  color: inherit;
  text-decoration: none;
}

.dance-image-wrapper {
  height: 235px;
  /* optioneel: max-breedte om extra veilig te zijn op kleine schermen */
  width: 360px;
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
  grid-template-columns: minmax(130px, 13vw) minmax(20vw, 300px);
  gap: 27px;
}

.me-text .me-image-wrapper img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.me-text .social-buttons {
  display: grid;
  align-items: center;      /* ← vertical alignment van ALLES */
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 100%;
  gap: 13px;
  margin-top: 10px;
}

.me-text .social-buttons .icon {
  /* 4 iconen in 100% breedte van de kolom, minus 3 gaps */
  width: 100%;
  height: auto;           /* behoud verhouding */
  aspect-ratio: 1 / 1;    /* vierkant houden */
  filter: brightness(0) saturate(100%) invert(21%) sepia(18%) saturate(1240%) hue-rotate(105deg) brightness(91%);
  transition: filter 0.2s ease-in-out;
}

.overlay {
  position: fixed;
  inset: clamp(2.8rem, 2.55rem + 0.7vw, 3.35rem) 0 0;
  background: rgba(248, 252, 248, 0.76);
  backdrop-filter: blur(32px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* above canvas and control panel */
  font-family: var(--site-font, "Space Grotesk"), sans-serif;
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
  color: #234839;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.overlay-content h2,
.overlay-content h3 {
  font-weight: 500;
  letter-spacing: -0.035em;
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
  color: #234839;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
}

.overlay-body {
  overflow-y: auto;
  max-height: 60vh;
  font-size: 0.85rem;
}

/* Balanced portfolio layouts */
.overlay-content {
  width: min(88vw, 1120px);
  max-height: 82vh;
  box-sizing: border-box;
  padding: clamp(1rem, 3vw, 2.5rem);
}

.overlay-body {
  max-height: 72vh;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(35, 72, 57, 0.25) transparent;
}

.research-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.25rem, 2.5vw, 2.5rem);
}

.research-item {
  display: grid;
  grid-template-columns: clamp(112px, 11vw, 152px) minmax(0, 1fr);
  gap: clamp(0.8rem, 1.5vw, 1.25rem);
}

.research-image {
  width: 100%;
  max-width: none;
  aspect-ratio: 3 / 4;
}

.research-image img {
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.research-text {
  max-width: 34rem;
}

.research-text h3 {
  margin-bottom: 0.45rem;
  font-size: clamp(0.9rem, 0.82rem + 0.18vw, 1.05rem);
}

.research-text p {
  font-size: clamp(0.78rem, 0.74rem + 0.12vw, 0.9rem);
  line-height: 1.55;
  opacity: 0.78;
}

.research-item.no-image {
  display: block;
  padding-left: clamp(0.75rem, 2vw, 1.25rem);
  border-left: 1px solid rgba(35, 72, 57, 0.14);
}

.animation-grid {
  grid-template-columns: repeat(auto-fit, minmax(140px, 190px));
  justify-content: center;
  gap: clamp(0.75rem, 1.6vw, 1.5rem);
}

.animation-thumb {
  max-width: none;
  height: auto;
  aspect-ratio: 3 / 4;
  background: rgba(35, 72, 57, 0.05);
}

.animation-thumb img,
.animation-thumb video,
.dance-image-wrapper img {
  transition: opacity 0.22s ease, transform 0.35s ease;
}

.animation-item--edge-crop .animation-thumb img {
  transform: scale(1.045);
}

.animation-item--edge-crop .animation-thumb video {
  transform: scale(1.045);
}

.dance-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.75vw, 1.5rem);
  padding: clamp(0.65rem, 1.2vw, 0.9rem);
}

.dance-item {
  position: relative;
  min-width: 0;
  max-width: none;
  transform-origin: center;
  transition: transform 0.28s ease;
}

.dance-item:hover,
.dance-item:focus-visible {
  z-index: 2;
  transform: translateY(-0.14rem) scale(1.03);
}

.dance-image-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  background: rgba(35, 72, 57, 0.05);
  transition: box-shadow 0.28s ease;
}

.dance-item:hover .dance-image-wrapper,
.dance-item:focus-visible .dance-image-wrapper {
  box-shadow: 0 0.65rem 1.6rem rgba(20, 43, 32, 0.16);
}

.dance-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.youtube-hover-icon {
  position: absolute;
  right: clamp(0.45rem, 1vw, 0.7rem);
  bottom: clamp(0.45rem, 1vw, 0.7rem);
  display: flex;
  align-items: center;
  gap: 0.38rem;
  padding: 0.36rem 0.42rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.35rem;
  background: rgba(18, 21, 19, 0.72);
  backdrop-filter: blur(5px);
  box-shadow: 0 0.2rem 0.7rem rgba(0, 0, 0, 0.16);
  color: #fff;
  opacity: 0;
  pointer-events: none;
  transform: translateY(0.2rem);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.youtube-mark {
  position: relative;
  width: 1.05rem;
  height: 0.72rem;
  flex: 0 0 auto;
  border-radius: 0.2rem;
  background: #ff0033;
}

.youtube-mark::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  border-top: 0.19rem solid transparent;
  border-bottom: 0.19rem solid transparent;
  border-left: 0.31rem solid #fff;
  transform: translate(-38%, -50%);
}

.new-tab-icon {
  width: 0.78rem;
  height: 0.78rem;
  flex: 0 0 auto;
  background: url('/icons/new-window-flaticon-16799159.png') center / contain no-repeat;
  filter: invert(1);
  opacity: 0.88;
}

.dance-item:hover .youtube-hover-icon,
.dance-item:focus-visible .youtube-hover-icon {
  opacity: 1;
  transform: translateY(0);
}

.me-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 3vw, 2.25rem);
  min-height: min(38vh, 320px);
}

.me-text .me-image-wrapper {
  width: clamp(110px, 14vw, 160px);
}

.me-text .social-buttons {
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 2vw, 1.25rem);
  padding-bottom: 0.25rem;
}

.me-text .social-buttons a {
  display: flex;
  width: clamp(28px, 3vw, 38px);
  height: clamp(28px, 3vw, 38px);
  opacity: 0.72;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.me-text .social-buttons a:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.me-text .social-buttons .icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 760px) {
  .overlay {
    align-items: center;
  }

  .overlay-content {
    width: calc(100vw - 2rem);
    max-height: calc(100% - 1rem);
    padding: 0.5rem;
  }

  .overlay-body {
    max-height: calc(100dvh - 4.85rem);
  }

  .research-list,
  .dance-grid {
    grid-template-columns: 1fr;
  }

  .research-item {
    grid-template-columns: 105px minmax(0, 1fr);
  }

  .animation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    justify-content: stretch;
  }

  .me-text {
    min-height: calc(100dvh - 6.25rem);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .me-text .me-image-wrapper {
    width: clamp(92px, 30vw, 125px);
  }

  .me-text .social-buttons {
    gap: 0.65rem;
  }

  .me-text .social-buttons a {
    width: 27px;
    height: 27px;
  }
}

.overlay.prewarm {
  opacity: 0;
  pointer-events: none;
}


</style>
