<template>
  <div class="app" :class="{ 'menu-mask-ready': menuMaskReady }" :style="typographyStyle">
    <div ref="container" class="canvas-container"></div>

    <main class="landing-page" aria-label="Tom Eijkelenkamp portfolio">
      <section class="landing-intro">
        <p>My work grows from a fascination with different ways of seeing, feeling and imagining the world. Moving between dance, animation, drawing, painting, computation and design, I explore the spaces where body, nature, technology and imagination meet.</p>
        <p>Nature and animals continually find their way into my work, alongside an interest in architecture, landscapes and the worlds we construct around ourselves. Meditation, movement and creative practice offer ways to move beyond habitual patterns of thought and discover other states of mind. I am interested in these moments of openness: places from which new images, environments and dream worlds can emerge.</p>
      </section>
      <section class="landing-profile" aria-labelledby="landing-name">
        <div class="landing-portrait-stack">
          <img class="landing-paper" src="/design/torn-paper-sheet-cream-02(1).png" alt="" aria-hidden="true" />
          <img class="landing-portrait" src="/me/me.jpg" alt="Portrait of Tom Eijkelenkamp" />
        </div>
        <div class="landing-profile-copy">
          <h1 id="landing-name">Tom Eijkelenkamp</h1>
          <p>Artist · Graphics · Algorithmic Design</p>
          <div class="landing-socials" aria-label="Contact and social links">
            <a href="https://www.instagram.com/electric_graphic/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="/icons/instagram.svg" alt="" /></a>
            <a href="https://www.linkedin.com/in/tomeijkelenkamp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><img src="/icons/linkedin.svg" alt="" /></a>
            <a href="https://github.com/TomEijkelenkamp" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><img src="/icons/github.svg" alt="" /></a>
            <a href="mailto:tomeijkelenkamp@hotmail.com" aria-label="Email"><img src="/icons/email.svg" alt="" /></a>
          </div>
        </div>
      </section>
    </main>

    <!-- top bar, aligned to the same Figma canvas as the landing content -->
    <div class="menu-design-canvas">
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
        Contact
      </button>
    </div>
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
        <button type="button" @click="exportSettings">
          Export settings
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

      <section class="typography-settings">
        <strong>Typography</strong>
        <div class="two-columns">
          <div v-for="type in typographyControls" :key="type.label" class="typography-control">
            <span>{{ type.label }}</span>
            <label>
              Size: {{ type.size.value }} px
              <input type="range" :min="type.min" :max="type.max" step="1" :value="type.size.value" @input="setTypographyControl(type, 'size', $event)" />
            </label>
            <label>
              Boldness: {{ type.weight.value }}
              <input type="range" min="300" max="700" step="100" :value="type.weight.value" @input="setTypographyControl(type, 'weight', $event)" />
            </label>
            <label v-if="type.label === 'Navigation'">
              Menu spacing: {{ menuItemSpacing }} px
              <input type="range" min="0" max="48" step="1" v-model.number="menuItemSpacing" />
            </label>
          </div>
        </div>
      </section>

      <section class="desktop-layout-settings">
        <strong>Desktop landing layout</strong>
        <label>
          Menu horizontal: {{ desktopMenuLeft }} px
          <input type="range" min="400" max="850" step="1" v-model.number="desktopMenuLeft" />
        </label>
        <label>
          Menu vertical: {{ desktopMenuTop }} px
          <input type="range" min="0" max="120" step="1" v-model.number="desktopMenuTop" />
        </label>
        <label>
          Front page horizontal: {{ desktopLandingOffsetX }} px
          <input type="range" :min="desktopLayoutLimits.minX" :max="desktopLayoutLimits.maxX" step="1" v-model.number="desktopLandingOffsetX" />
        </label>
        <label>
          Front page vertical: {{ desktopLandingOffsetY }} px
          <input type="range" :min="desktopLayoutLimits.minY" :max="desktopLayoutLimits.maxY" step="1" v-model.number="desktopLandingOffsetY" />
        </label>
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
            Orbit speed: {{ targetOrbitSpeed.toFixed(1) }}°/s
            <input type="range" min="-90" max="90" step="0.5" v-model.number="targetOrbitSpeed" />
          </label>
          <label>
            Orbit width: {{ orbitRadiusX.toFixed(2) }}
            <input type="range" min="0.1" max="0.95" step="0.01" v-model.number="orbitRadiusX" />
          </label>
          <label>
            Orbit height: {{ orbitRadiusY.toFixed(2) }}
            <input type="range" min="0.1" max="0.95" step="0.01" v-model.number="orbitRadiusY" />
          </label>
          <label>
            Target attraction: {{ targetWeight.toFixed(2) }}
            <input type="range" min="0" max="4" step="0.05" v-model.number="targetWeight" />
          </label>
          <label>
            Biography avoidance: {{ biographyAvoidanceWeight.toFixed(2) }}
            <input type="range" min="0" max="6" step="0.05" v-model.number="biographyAvoidanceWeight" />
          </label>
          <label>
            Biography clearance: {{ biographyClearance.toFixed(0) }} px
            <input type="range" min="0" max="240" step="5" v-model.number="biographyClearance" />
          </label>
        </section>

        <section>
          <label>
            Neighbour radius: {{ neighborRadius.toFixed(0) }} px
            <input type="range" min="30" max="600" step="5" v-model.number="neighborRadius" />
          </label>
          <label>
            Separation: {{ separationWeight.toFixed(2) }}
            <input type="range" min="0" max="5" step="0.05" v-model.number="separationWeight" />
          </label>
          <label>
            Alignment: {{ alignmentWeight.toFixed(2) }}
            <input type="range" min="0" max="5" step="0.05" v-model.number="alignmentWeight" />
          </label>
          <label>
            Cohesion: {{ cohesionWeight.toFixed(2) }}
            <input type="range" min="0" max="5" step="0.05" v-model.number="cohesionWeight" />
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
          <label>Minimum speed: {{ flockMinSpeed.toFixed(0) }} px/s
            <input type="range" min="10" max="300" step="5" v-model.number="flockMinSpeed" />
          </label>
          <label>Maximum speed: {{ flockMaxSpeed.toFixed(0) }} px/s
            <input type="range" min="20" max="500" step="5" v-model.number="flockMaxSpeed" />
          </label>
          <label>Maximum steering: {{ maxSteer.toFixed(0) }} px/s²
            <input type="range" min="10" max="600" step="5" v-model.number="maxSteer" />
          </label>
        </section>
      </div>

      <div class="color-picker-grid">
        <HsvColorPicker label="Navigation overlap" v-bind="navigationEffectColor" @update="Object.assign(navigationEffectColor, $event)" />
        <HsvColorPicker label="Biography overlap" v-bind="biographyEffectColor" @update="Object.assign(biographyEffectColor, $event)" />
        <HsvColorPicker label="Title overlap" v-bind="titleEffectColor" @update="Object.assign(titleEffectColor, $event)" />
        <HsvColorPicker label="Subtitle overlap" v-bind="subtitleEffectColor" @update="Object.assign(subtitleEffectColor, $event)" />
        <HsvColorPicker label="Social icons overlap" v-bind="socialEffectColor" @update="Object.assign(socialEffectColor, $event)" />
      </div>
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
const appliedFont = ref('Marcellus Local')
const fontLoading = ref(false)
const titleTextSize = ref(54)
const titleTextWeight = ref(700)
const subtitleTextSize = ref(20)
const subtitleTextWeight = ref(600)
const navigationTextSize = ref(21)
const navigationTextWeight = ref(700)
const menuItemSpacing = ref(30)
const headingTextSize = ref(18)
const headingTextWeight = ref(500)
const bodyTextSize = ref(14)
const bodyTextWeight = ref(400)
const typographyViewportScale = ref(1)
const designScale = ref(1)
const layoutViewportWidth = ref(typeof window === 'undefined' ? 1440 : window.innerWidth)
const layoutViewportHeight = ref(typeof window === 'undefined' ? 1000 : window.innerHeight)
const desktopMenuLeft = ref(850)
const desktopMenuTop = ref(6)
const desktopLandingOffsetX = ref(-178)
const desktopLandingOffsetY = ref(30)
const desktopLayoutLimits = computed(() => {
  const scale = Math.max(0.001, designScale.value)
  const viewportLeft = 720 - layoutViewportWidth.value / (2 * scale)
  const viewportRight = 720 + layoutViewportWidth.value / (2 * scale)
  const viewportTop = 500 - layoutViewportHeight.value / (2 * scale)
  const viewportBottom = 500 + layoutViewportHeight.value / (2 * scale)

  // Bounds of biography, paper, portrait, title, subtitle and socials in the
  // 1440 × 1000 desktop design before the user-controlled translation.
  return {
    minX: Math.ceil(viewportLeft - 115),
    maxX: Math.floor(viewportRight - 1325),
    minY: Math.ceil(viewportTop - 260),
    maxY: Math.floor(viewportBottom - 845),
  }
})
const typographyControls = [
  { label: 'Main title', size: titleTextSize, weight: titleTextWeight, min: 24, max: 96 },
  { label: 'Subtitle', size: subtitleTextSize, weight: subtitleTextWeight, min: 8, max: 36 },
  { label: 'Navigation', size: navigationTextSize, weight: navigationTextWeight, min: 10, max: 32 },
  { label: 'Content titles', size: headingTextSize, weight: headingTextWeight, min: 10, max: 40 },
  { label: 'Body text', size: bodyTextSize, weight: bodyTextWeight, min: 10, max: 28 },
]
function setTypographyControl(type, property, event) {
  type[property].value = Number(event.target.value)
}
const typographyStyle = computed(() => ({
  '--design-scale': String(designScale.value),
  '--desktop-menu-left': `${desktopMenuLeft.value}px`,
  '--desktop-menu-top': `${desktopMenuTop.value}px`,
  '--desktop-landing-offset-x': `${desktopLandingOffsetX.value}px`,
  '--desktop-landing-offset-y': `${desktopLandingOffsetY.value}px`,
  '--navigation-text-size': `${Math.max(13, navigationTextSize.value * typographyViewportScale.value)}px`,
  '--navigation-text-weight': navigationTextWeight.value,
  '--menu-item-spacing': `${Math.max(8, menuItemSpacing.value * typographyViewportScale.value)}px`,
  '--heading-text-size': `${Math.max(14, headingTextSize.value * typographyViewportScale.value)}px`,
  '--heading-text-weight': headingTextWeight.value,
  '--body-text-size': `${Math.max(12, bodyTextSize.value * typographyViewportScale.value)}px`,
  '--body-text-weight': bodyTextWeight.value,
}))
watch(
  [
    titleTextSize,
    titleTextWeight,
    subtitleTextSize,
    subtitleTextWeight,
    navigationTextSize,
    navigationTextWeight,
    menuItemSpacing,
    desktopMenuLeft,
    desktopMenuTop,
    desktopLandingOffsetX,
    desktopLandingOffsetY,
  ],
  redrawTextMask,
)
const activeFont = computed(() => fontOptions.find(font => font.name === selectedFont.value) || fontOptions[0])
let fontLoadRequest = 0

watch(selectedFont, async (fontName) => {
  const requestId = ++fontLoadRequest
  const resolvedFontName = fontName === 'Marcellus' ? 'Marcellus Local' : fontName
  fontLoading.value = true
  try {
    await document.fonts.load(`400 48px "${resolvedFontName}"`)
    if (requestId !== fontLoadRequest) return
    appliedFont.value = resolvedFontName
    document.documentElement.style.setProperty('--site-font', `"${resolvedFontName}"`)
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

const squareRes = ref(5) // 5x5 = 25 triangles
const animationPaused = ref(false)
const colorLayoutMode = ref(false)

const colorA = reactive({ h: 79, s: 0.98, v: 0.90 })
const colorB = reactive({ h: 92, s: 0.15283059013444267, v: 1.00 })
const navigationEffectColor = reactive({ h: 283, s: 0.26, v: 1.00 })
const biographyEffectColor = reactive({ h: 283, s: 0.26, v: 1.00 })
const titleEffectColor = reactive({ h: 283, s: 0.26, v: 1.00 })
const subtitleEffectColor = reactive({ h: 283, s: 0.26, v: 1.00 })
const socialEffectColor = reactive({ h: 283, s: 0.26, v: 1.00 })

const sizeMin = ref(27)
const sizeMax = ref(80)
const viewportScale = ref(1)
const effectiveSizeMin = computed(() => sizeMin.value * viewportScale.value)
const effectiveSizeMax = computed(() => sizeMax.value * viewportScale.value)
const pathSpeed = ref(160)
const effectivePathSpeed = computed(() => pathSpeed.value * viewportScale.value)
const pathPointCount = ref(14)
const pathCoverage = ref(0.98)
const rotationLag = ref(0.65)
const minTurnRadius = ref(370)
const trainSpread = ref(2.01)
const targetOrbitSpeed = ref(12)
const orbitRadiusX = ref(0.78)
const orbitRadiusY = ref(0.56)
const targetWeight = ref(0.75)
const biographyAvoidanceWeight = ref(4)
const biographyClearance = ref(200)
const neighborRadius = ref(75)
const separationWeight = ref(0.9)
const alignmentWeight = ref(1.15)
const cohesionWeight = ref(0.3)
const flockMinSpeed = ref(55)
const flockMaxSpeed = ref(285)
const maxSteer = ref(150)

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

// three.js objects
let renderer, scene, camera
let gpuCompute, velVar, posVar
let renderMesh
let splineStates = []
let sharedSpline = null
let flockStates = []
let targetOrbitAngle = -Math.PI * 0.15
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
  const containerRect = container.value?.getBoundingClientRect()
  if (containerRect) {
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'

    const textElements = document.querySelectorAll([
      '.top-bar button[data-menu]',
      '.landing-intro p',
      '.landing-profile-copy h1',
      '.landing-profile-copy > p',
    ].join(','))

    textElements.forEach((element) => {
      const styles = window.getComputedStyle(element)
      const renderedScale = element.offsetHeight
        ? element.getBoundingClientRect().height / element.offsetHeight
        : designScale.value
      const scaledFontSize = (Number.parseFloat(styles.fontSize) || 16) * renderedScale
      ctx.font = `${styles.fontStyle} ${styles.fontWeight} ${scaledFontSize}px ${styles.fontFamily}`
      const maskId = element.matches('.top-bar button') ? 0.1
        : element.matches('.landing-intro p') ? 0.3
        : element.matches('.landing-profile-copy h1') ? 0.5
        : 0.7
      ctx.fillStyle = `rgb(${Math.round(maskId * 255)}, 0, 0)`

      element.childNodes.forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return
        const text = node.textContent
        const wordPattern = /\S+/g
        let match
        while ((match = wordPattern.exec(text))) {
          const range = document.createRange()
          range.setStart(node, match.index)
          range.setEnd(node, match.index + match[0].length)
          const rect = range.getBoundingClientRect()
          ctx.fillText(
            match[0],
            rect.left - containerRect.left,
            rect.top - containerRect.top,
          )
        }
      })

      const menuName = element.dataset?.menu
      if (menuName && (hoveredMenu.value === menuName || activeOverlay.value === menuName)) {
        const rect = element.getBoundingClientRect()
        let underlineY = rect.bottom - containerRect.top - 1

        if (window.innerWidth <= 767) {
          const textNode = Array.from(element.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
          )
          if (textNode) {
            const textRange = document.createRange()
            textRange.selectNodeContents(textNode)
            const textRect = textRange.getBoundingClientRect()
            underlineY = textRect.bottom - containerRect.top + 1
          }
        }

        ctx.fillRect(
          rect.left - containerRect.left,
          underlineY,
          rect.width,
          1,
        )
      }
    })

    document.querySelectorAll('.landing-socials a').forEach((link) => {
      const icon = link.querySelector('img')
      const rect = link.getBoundingClientRect()
      if (icon?.complete && icon.naturalWidth) {
        const iconCanvas = document.createElement('canvas')
        iconCanvas.width = Math.max(1, Math.ceil(rect.width * dpr))
        iconCanvas.height = Math.max(1, Math.ceil(rect.height * dpr))
        const iconCtx = iconCanvas.getContext('2d')
        iconCtx.drawImage(icon, 0, 0, iconCanvas.width, iconCanvas.height)
        iconCtx.globalCompositeOperation = 'source-in'
        iconCtx.fillStyle = 'rgb(230, 0, 0)'
        iconCtx.fillRect(0, 0, iconCanvas.width, iconCanvas.height)
        ctx.drawImage(iconCanvas, rect.left - containerRect.left, rect.top - containerRect.top, rect.width, rect.height)
      } else if (icon) {
        icon.addEventListener('load', redrawTextMask, { once: true })
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

      uNavigationEffectHSV: { value: new THREE.Vector3() },
      uBiographyEffectHSV: { value: new THREE.Vector3() },
      uTitleEffectHSV: { value: new THREE.Vector3() },
      uSubtitleEffectHSV: { value: new THREE.Vector3() },
      uSocialEffectHSV: { value: new THREE.Vector3() },

      
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
      uniform vec3 uNavigationEffectHSV;
      uniform vec3 uBiographyEffectHSV;
      uniform vec3 uTitleEffectHSV;
      uniform vec3 uSubtitleEffectHSV;
      uniform vec3 uSocialEffectHSV;

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

        // The red mask channel identifies the text type. Normal colors and
        // opacity are the exact Figma values; overlap colors come from the UI.
        float cutout = step(0.5, coverage);
        float typeId = t.r;
        vec3 normalRGB;
        vec3 effectRGB;
        float textOpacity;
        if (typeId < 0.2) {
          normalRGB = vec3(103.0, 0.0, 0.0) / 255.0;
          effectRGB = hsv2rgb(uNavigationEffectHSV);
          textOpacity = 1.0;
        } else if (typeId < 0.4) {
          normalRGB = vec3(0.0);
          effectRGB = hsv2rgb(uBiographyEffectHSV);
          textOpacity = 0.71;
        } else if (typeId < 0.6) {
          normalRGB = vec3(137.0, 89.0, 0.0) / 255.0;
          effectRGB = hsv2rgb(uTitleEffectHSV);
          textOpacity = 1.0;
        } else if (typeId < 0.8) {
          normalRGB = vec3(0.0);
          effectRGB = hsv2rgb(uSubtitleEffectHSV);
          textOpacity = 0.60;
        } else {
          normalRGB = vec3(92.0, 0.0, 0.0) / 255.0;
          effectRGB = hsv2rgb(uSocialEffectHSV);
          textOpacity = 0.72;
        }
        vec3 textRGB = mix(normalRGB, effectRGB, cutout);

        // 5) Blend text color over background using the text alpha
        vec3 finalColor = mix(base, textRGB, t.a * textOpacity);
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
  updateDesignScale()

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
  loadLeafAtlasTexture().then(texture => {
    leafAtlasTexture = texture
    if (renderMesh) renderMesh.material.uniforms.uLeafAtlas.value = texture
  }).catch(error => console.error('Leaf textures could not be loaded', error))
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
  typographyViewportScale.value = clamp(0.45, w / 900, 1)

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

function advanceSplineByDistance(points, startProgress, distance) {
  let progress = startProgress
  let remaining = Math.max(0, distance)
  let current = splinePoint(points, progress)
  const maxProgress = Math.max(0.001, points.length - 3.001)
  const progressStep = 0.005

  for (let iteration = 0; iteration < 1000 && remaining > 0.0001; iteration++) {
    const nextProgress = Math.min(maxProgress, progress + progressStep)
    if (nextProgress <= progress) break
    const next = splinePoint(points, nextProgress)
    const segmentDistance = current.distanceTo(next)
    if (segmentDistance >= remaining && segmentDistance > 0.000001) {
      return progress + (nextProgress - progress) * (remaining / segmentDistance)
    }
    remaining -= segmentDistance
    progress = nextProgress
    current = next
  }

  return progress
}

let pendingSplinePoints = []
let scheduledQuadrant = 2
let anchorAfterIntermediate = 1

function randomQuadrantDestination() {
  // Alternate the two anchor segments (bottom-left and top-right). Between
  // them, visit exactly one randomly selected side segment.
  const quadrant = scheduledQuadrant
  if (quadrant === 2) {
    anchorAfterIntermediate = 1
    scheduledQuadrant = Math.random() < 0.5 ? 0 : 3
  } else if (quadrant === 1) {
    anchorAfterIntermediate = 2
    scheduledQuadrant = Math.random() < 0.5 ? 0 : 3
  } else {
    scheduledQuadrant = anchorAfterIntermediate
  }
  const right = quadrant % 2 === 1
  const top = quadrant < 2
  const extentX = Math.max(40, bounds.x - 30) * pathCoverage.value
  const extentY = Math.max(40, bounds.y - 30) * pathCoverage.value
  return {
    quadrant,
    point: new THREE.Vector2(
      (right ? 1 : -1) * Math.random() * extentX,
      (top ? 1 : -1) * Math.random() * extentY,
    ),
  }
}

function randomScreenPoint() {
  return randomQuadrantDestination().point
}

function menuSplinePoints() {
  const containerRect = container.value?.getBoundingClientRect()
  if (!containerRect) return []

  const points = Array.from(document.querySelectorAll('.top-bar button[data-menu]')).map((button) => {
    const rect = button.getBoundingClientRect()
    return new THREE.Vector2(
      rect.left - containerRect.left + rect.width / 2 - bounds.x,
      bounds.y - (rect.top - containerRect.top + rect.height / 2),
    )
  })
  if (!points.length) return points
  return [points[0], points[points.length - 1]]
}

function homeTextSplinePoints() {
  const containerRect = container.value?.getBoundingClientRect()
  if (!containerRect) return []

  const width = containerRect.width
  const height = containerRect.height
  const margin = Math.max(24, Math.min(100, width * 0.065))
  let titleSize = Math.max(28, titleTextSize.value * typographyViewportScale.value)
  const subtitleSize = Math.max(12, subtitleTextSize.value * typographyViewportScale.value)
  const measureCanvas = document.createElement('canvas')
  const measureContext = measureCanvas.getContext('2d')
  measureContext.font = `${titleTextWeight.value} ${titleSize}px "${appliedFont.value}", sans-serif`
  const maxTitleWidth = width - margin * 2
  const initialTitleWidth = measureContext.measureText('Tom Eijkelenkamp').width
  if (initialTitleWidth > maxTitleWidth) titleSize *= maxTitleWidth / initialTitleWidth

  measureContext.font = `${titleTextWeight.value} ${titleSize}px "${appliedFont.value}", sans-serif`
  const titleWidth = measureContext.measureText('Tom Eijkelenkamp').width
  const subtitleY = height - margin
  const titleY = subtitleY - subtitleSize * 1.75
  const toWorld = (screenX, screenY) => new THREE.Vector2(
    screenX - bounds.x,
    bounds.y - screenY,
  )
  const titleCenterY = titleY - titleSize * 0.35
  return [toWorld(margin + titleWidth / 2, titleCenterY)]
}

function constrainTurnRadius(points, candidate) {
  if (points.length < 2) return candidate
  const previous = points[points.length - 2]
  const current = points[points.length - 1]
  const incoming = current.clone().sub(previous)
  const outgoing = candidate.clone().sub(current)
  const outgoingLength = outgoing.length()
  if (incoming.lengthSq() < 0.000001 || outgoingLength < 0.000001) return candidate

  incoming.normalize()
  outgoing.normalize()
  const signedTurn = Math.atan2(
    incoming.x * outgoing.y - incoming.y * outgoing.x,
    incoming.dot(outgoing),
  )
  const radius = Math.max(1, minTurnRadius.value * viewportScale.value)
  const maxTurn = 2 * Math.asin(clamp(0, outgoingLength / (2 * radius), 1))
  if (Math.abs(signedTurn) <= maxTurn) return candidate

  const limitedTurn = clamp(-maxTurn, signedTurn, maxTurn)
  const cosine = Math.cos(limitedTurn)
  const sine = Math.sin(limitedTurn)
  const limitedDirection = new THREE.Vector2(
    incoming.x * cosine - incoming.y * sine,
    incoming.x * sine + incoming.y * cosine,
  )
  return current.clone().addScaledVector(limitedDirection, outgoingLength)
}

function createNextSplinePoint(points) {
  if (pendingSplinePoints.length) {
    return constrainTurnRadius(points, pendingSplinePoints.shift())
  }
  const destination = randomQuadrantDestination()
  const candidate = destination.point

  // Quadrant 1 is the top-right segment. Use Research and Me as the two
  // targets; the straight passage between them crosses the other menu labels.
  if (destination.quadrant === 1) {
    const menuPoints = menuSplinePoints()
    if (menuPoints.length) {
      pendingSplinePoints.push(...menuPoints, candidate)
      return constrainTurnRadius(points, pendingSplinePoints.shift())
    }
  }
  // Quadrant 2 is bottom-left. Only the main title is part of this route; the
  // subtitle is deliberately not a target.
  if (destination.quadrant === 2) {
    const textPoints = homeTextSplinePoints()
    if (textPoints.length) {
      pendingSplinePoints.push(...textPoints, candidate)
      return constrainTurnRadius(points, pendingSplinePoints.shift())
    }
  }
  return constrainTurnRadius(points, candidate)
}

function createSharedSplinePoints(pointCount = pathPointCount.value) {
  pendingSplinePoints = []
  scheduledQuadrant = 2
  anchorAfterIntermediate = 1
  const points = [randomScreenPoint()]
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
    progress: 0,
  }
}

function resetSplineProgresses() {
  if (!sharedSpline) return
  const initialSpacing = 0.52 * trainSpread.value
  splineStates.forEach((state, index) => {
    state.progress = Math.max(0, sharedSpline.progress - index * initialSpacing)
  })
}

function createFlockState(seed, index, count) {
  const angle = (index / Math.max(1, count)) * Math.PI * 2 + Math.random() * 0.35
  const spawnRadius = Math.min(bounds.x, bounds.y) * (0.18 + Math.random() * 0.18)
  const speed = flockMinSpeed.value + Math.random() * (flockMaxSpeed.value - flockMinSpeed.value)
  return {
    seed,
    size: effectiveSizeMin.value + (effectiveSizeMax.value - effectiveSizeMin.value) * seed,
    position: new THREE.Vector2(Math.cos(angle) * spawnRadius, Math.sin(angle) * spawnRadius),
    velocity: new THREE.Vector2(-Math.sin(angle), Math.cos(angle)).multiplyScalar(speed),
    angle: angle - Math.PI / 2,
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
  triangle.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
    0.5, 1.0,
    0.0, 0.0,
    1.0, 0.0,
  ]), 2))

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
  splineStates = []
  sharedSpline = null
  flockStates = seeds.map((seed, index) => createFlockState(seed, index, count))
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
      uColorLayout: { value: 0 },
      uLeafAtlas: { value: leafAtlasTexture },
    },
    vertexShader: /* glsl */`
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      attribute float aSeed;
      attribute mat4 instanceMatrix;
      uniform mat4 projectionMatrix;
      uniform mat4 modelViewMatrix;
      varying float vSeed;
      attribute float aPreviewSeed;
      varying float vPreviewSeed;
      varying vec2 vUv;

      
      void main() {
        vSeed = aSeed;
        vPreviewSeed = aPreviewSeed;
        vUv = uv;
        vec4 worldPosition = instanceMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * worldPosition;
      }

    `,
    fragmentShader: /* glsl */`
      precision highp float;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uColorLayout;
      uniform sampler2D uLeafAtlas;
      varying float vSeed;
      varying float vPreviewSeed;
      varying vec2 vUv;

      void main() {
        float leafIndex = floor(fract(vSeed * 13.731 + 0.17) * 4.0);
        vec2 tile = vec2(mod(leafIndex, 2.0), floor(leafIndex / 2.0));
        vec2 safeUv = mix(vec2(0.003), vec2(0.997), vUv);
        vec2 atlasUv = (safeUv + tile) * 0.5;
        vec3 leafColor = texture2D(uLeafAtlas, atlasUv).rgb;
        gl_FragColor = vec4(leafColor, 1.0);
      }
    `,
    transparent: true,
    depthWrite: false,
  })
}

let leafAtlasTexture = new THREE.DataTexture(new Uint8Array([62, 143, 25, 255]), 1, 1)
leafAtlasTexture.needsUpdate = true

async function loadLeafAtlasTexture() {
  const sources = [
    '/design/image-from-rawpixel-id-13095024-png.png',
    '/design/image-from-rawpixel-id-13095633-png.png',
    '/design/image-from-rawpixel-id-13096138-png.png',
    '/design/image-from-rawpixel-id-14061500-png.png',
  ]
  const images = await Promise.all(sources.map(src => new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })))
  const cell = 1024
  const atlas = document.createElement('canvas')
  atlas.width = cell * 2
  atlas.height = cell * 2
  const ctx = atlas.getContext('2d')
  images.forEach((image, index) => {
    const x = (index % 2) * cell
    const y = Math.floor(index / 2) * cell
    const crop = findLargestLeafTriangleCrop(image)
    ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, x, y, cell, cell)
  })
  const texture = new THREE.CanvasTexture(atlas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  return texture
}

function findLargestLeafTriangleCrop(image) {
  const probe = document.createElement('canvas')
  probe.width = image.width
  probe.height = image.height
  const ctx = probe.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(image, 0, 0)
  const alpha = ctx.getImageData(0, 0, image.width, image.height).data
  const center = Math.round(image.width / 2)
  const rowInset = Math.max(2, Math.round(image.width * 0.012))
  const halfWidths = new Float32Array(image.height)

  for (let y = 0; y < image.height; y++) {
    let left = center
    let right = center
    while (left > 0 && alpha[(y * image.width + left) * 4 + 3] >= 220) left--
    while (right < image.width - 1 && alpha[(y * image.width + right) * 4 + 3] >= 220) right++
    halfWidths[y] = Math.max(0, Math.min(center - left, right - center) - rowInset)
  }

  const firstLeafRow = halfWidths.findIndex(width => width > rowInset)
  let best = { score: 0, top: Math.max(0, firstLeafRow), bottom: Math.round(image.height * 0.72), width: image.width * 0.5 }
  const topStart = Math.max(0, firstLeafRow)
  const topEnd = Math.min(Math.round(image.height * 0.18), topStart + Math.round(image.height * 0.12))
  const bottomStart = Math.round(image.height * 0.5)
  const bottomEnd = Math.round(image.height * 0.82)

  for (let top = topStart; top <= topEnd; top += 3) {
    for (let bottom = bottomStart; bottom <= bottomEnd; bottom += 3) {
      const height = bottom - top
      if (height <= 0) continue
      let maxCropWidth = Infinity
      let valid = true
      for (let y = top + 2; y <= bottom; y += 2) {
        const t = (y - top) / height
        if (t < 0.035) continue
        const available = halfWidths[y]
        if (available <= 0) { valid = false; break }
        maxCropWidth = Math.min(maxCropWidth, (available * 2) / t)
      }
      if (!valid || !Number.isFinite(maxCropWidth)) continue
      maxCropWidth = Math.min(maxCropWidth, image.width * 0.96)
      const score = maxCropWidth * height
      if (score > best.score) best = { score, top, bottom, width: maxCropWidth }
    }
  }

  const safety = 0.94
  const width = Math.max(8, best.width * safety)
  const verticalInset = Math.max(1, (best.bottom - best.top) * 0.012)
  return {
    x: center - width / 2,
    y: best.top + verticalInset,
    width,
    height: Math.max(8, best.bottom - best.top - verticalInset * 2),
  }
}

function limitVector(vector, maximum) {
  if (vector.lengthSq() > maximum * maximum) vector.setLength(maximum)
  return vector
}

function steerToward(currentVelocity, desiredDirection, desiredSpeed, steeringLimit) {
  if (desiredDirection.lengthSq() < 0.000001) return new THREE.Vector2()
  return limitVector(
    desiredDirection.clone().setLength(desiredSpeed).sub(currentVelocity),
    steeringLimit,
  )
}

function updateFlock(dt, matrix, position, rotation, scale, axis) {
  targetOrbitAngle += THREE.MathUtils.degToRad(targetOrbitSpeed.value) * dt
  const orbitTarget = new THREE.Vector2(
    Math.cos(targetOrbitAngle) * bounds.x * orbitRadiusX.value,
    Math.sin(targetOrbitAngle) * bounds.y * orbitRadiusY.value,
  )
  const neighborDistance = neighborRadius.value * viewportScale.value
  const minSpeed = flockMinSpeed.value * viewportScale.value
  const maxSpeed = Math.max(minSpeed, flockMaxSpeed.value * viewportScale.value)
  const steeringLimit = maxSteer.value * viewportScale.value
  const positions = flockStates.map(state => state.position.clone())
  const velocities = flockStates.map(state => state.velocity.clone())
  const containerRect = container.value?.getBoundingClientRect()
  const biographyRect = document.querySelector('.landing-intro')?.getBoundingClientRect()
  const biographyObstacle = containerRect && biographyRect ? {
    center: new THREE.Vector2(
      biographyRect.left - containerRect.left + biographyRect.width / 2 - containerRect.width / 2,
      -(biographyRect.top - containerRect.top + biographyRect.height / 2 - containerRect.height / 2),
    ),
    halfWidth: biographyRect.width / 2,
    halfHeight: biographyRect.height / 2,
  } : null

  flockStates.forEach((state, index) => {
    const alignment = new THREE.Vector2()
    const cohesion = new THREE.Vector2()
    const separation = new THREE.Vector2()
    let neighbors = 0

    flockStates.forEach((_, otherIndex) => {
      if (index === otherIndex) return
      const offset = positions[index].clone().sub(positions[otherIndex])
      const distance = offset.length()
      if (distance <= 0 || distance > neighborDistance) return
      neighbors++
      alignment.add(velocities[otherIndex])
      cohesion.add(positions[otherIndex])
      const separationDistance = Math.max(
        neighborDistance * 0.42,
        (state.size + flockStates[otherIndex].size) * 0.72,
      )
      if (distance < separationDistance) {
        const urgency = 1 - distance / separationDistance
        separation.add(offset.normalize().multiplyScalar(urgency * urgency))
      }
    })

    const acceleration = new THREE.Vector2()
    if (neighbors) {
      alignment.multiplyScalar(1 / neighbors)
      cohesion.multiplyScalar(1 / neighbors).sub(positions[index])
      acceleration.addScaledVector(steerToward(velocities[index], alignment, maxSpeed, steeringLimit), alignmentWeight.value)
      acceleration.addScaledVector(steerToward(velocities[index], cohesion, maxSpeed, steeringLimit), cohesionWeight.value)
      acceleration.addScaledVector(steerToward(velocities[index], separation, maxSpeed, steeringLimit), separationWeight.value)
    }

    const toTarget = orbitTarget.clone().sub(positions[index])
    acceleration.addScaledVector(steerToward(velocities[index], toTarget, maxSpeed, steeringLimit), targetWeight.value)

    if (biographyObstacle && biographyAvoidanceWeight.value > 0) {
      const clearance = biographyClearance.value * viewportScale.value + state.size * 0.55
      const halfWidth = biographyObstacle.halfWidth + clearance
      const halfHeight = biographyObstacle.halfHeight + clearance
      const localX = positions[index].x - biographyObstacle.center.x
      const localY = positions[index].y - biographyObstacle.center.y
      const remainingX = halfWidth - Math.abs(localX)
      const remainingY = halfHeight - Math.abs(localY)
      if (remainingX > 0 && remainingY > 0) {
        const escape = remainingX < remainingY
          ? new THREE.Vector2(localX < 0 ? -1 : 1, 0)
          : new THREE.Vector2(0, localY < 0 ? -1 : 1)
        const depth = Math.min(1, Math.min(remainingX, remainingY) / Math.max(1, clearance))
        const avoidance = steerToward(velocities[index], escape, maxSpeed, steeringLimit)
        acceleration.addScaledVector(avoidance, biographyAvoidanceWeight.value * (0.65 + depth))
      }
    }
    limitVector(acceleration, steeringLimit)

    state.velocity.addScaledVector(acceleration, dt)
    const speed = state.velocity.length()
    if (speed > maxSpeed) state.velocity.setLength(maxSpeed)
    else if (speed < minSpeed && speed > 0.0001) state.velocity.setLength(minSpeed)
    state.position.addScaledVector(state.velocity, dt)

    // Wrap only after the complete largest triangle has cleared the viewport.
    // The shared off-screen flight margin is deliberately larger than the
    // requested half-triangle minimum, so no leaf can visibly teleport.
    const offscreenFlightMargin = effectiveSizeMax.value
    const edgeX = bounds.x + offscreenFlightMargin
    const edgeY = bounds.y + offscreenFlightMargin
    if (Math.abs(state.position.x) > edgeX) state.position.x = -Math.sign(state.position.x) * edgeX
    if (Math.abs(state.position.y) > edgeY) state.position.y = -Math.sign(state.position.y) * edgeY

    const targetAngle = Math.atan2(state.velocity.y, state.velocity.x) - Math.PI / 2
    const angleDelta = Math.atan2(Math.sin(targetAngle - state.angle), Math.cos(targetAngle - state.angle))
    state.angle += angleDelta * (1 - Math.exp(-6 * dt))

    position.set(state.position.x, state.position.y, 0)
    rotation.setFromAxisAngle(axis, state.angle)
    scale.set(state.size, state.size, 1)
    matrix.compose(position, rotation, scale)
    renderMesh.setMatrixAt(index, matrix)
  })
  renderMesh.instanceMatrix.needsUpdate = true
}

function animate() {
  const dt = Math.min(clock.getDelta(), 0.05)

  if (renderMesh && flockStates.length) {
    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const rotation = new THREE.Quaternion()
    const scale = new THREE.Vector3()
    const axis = new THREE.Vector3(0, 0, 1)

    if (colorLayoutMode.value) {
      const viewWidth = bounds.x * 2
      const viewHeight = bounds.y * 2
      const margin = Math.max(24, Math.min(100, viewWidth * 0.065))
      const titleSize = Math.max(28, titleTextSize.value * typographyViewportScale.value)
      const subtitleSize = Math.max(12, subtitleTextSize.value * typographyViewportScale.value)
      const titleY = viewHeight - margin - subtitleSize * 1.75
      const lineWidth = Math.min(viewWidth - margin * 2, titleSize * 7.9)
      const triangleSize = clamp(
        22,
        Math.min(titleSize * 1.2, (lineWidth / Math.max(1, flockStates.length - 1)) * 0.72),
        74,
      )

      flockStates.forEach((state, index) => {
        const amount = flockStates.length === 1 ? 0.5 : index / (flockStates.length - 1)
        const screenX = margin + lineWidth * amount
        position.set(screenX - bounds.x, bounds.y - titleY, 0)
        rotation.setFromAxisAngle(axis, index % 2 === 0 ? 0 : Math.PI)
        scale.set(triangleSize, triangleSize, 1)
        matrix.compose(position, rotation, scale)
        renderMesh.setMatrixAt(index, matrix)
      })
      renderMesh.instanceMatrix.needsUpdate = true
    } else if (!animationPaused.value && activeOverlay.value === null) {
      updateFlock(dt, matrix, position, rotation, scale, axis)
    }

    const ca = hsvToRgb(colorA.h, colorA.s, colorA.v)
    const cb = hsvToRgb(colorB.h, colorB.s, colorB.v)
    renderMesh.material.uniforms.uColorA.value.set(ca.r, ca.g, ca.b)
    renderMesh.material.uniforms.uColorB.value.set(cb.r, cb.g, cb.b)
    renderMesh.material.uniforms.uColorLayout.value = colorLayoutMode.value ? 1 : 0
  }

  if (postMesh) {
    const bgA = new THREE.Vector3(colorA.h / 360, colorA.s, colorA.v)
    const bgB = new THREE.Vector3(colorB.h / 360, colorB.s, colorB.v)

    postMesh.material.uniforms.uBgHSV_A.value.copy(bgA)
    postMesh.material.uniforms.uBgHSV_B.value.copy(bgB)
    postMesh.material.uniforms.uNavigationEffectHSV.value.set(navigationEffectColor.h / 360, navigationEffectColor.s, navigationEffectColor.v)
    postMesh.material.uniforms.uBiographyEffectHSV.value.set(biographyEffectColor.h / 360, biographyEffectColor.s, biographyEffectColor.v)
    postMesh.material.uniforms.uTitleEffectHSV.value.set(titleEffectColor.h / 360, titleEffectColor.s, titleEffectColor.v)
    postMesh.material.uniforms.uSubtitleEffectHSV.value.set(subtitleEffectColor.h / 360, subtitleEffectColor.s, subtitleEffectColor.v)
    postMesh.material.uniforms.uSocialEffectHSV.value.set(socialEffectColor.h / 360, socialEffectColor.s, socialEffectColor.v)
  }

  // PASS 1: render squares to offscreen
  renderer.setRenderTarget(simRenderTarget)
  renderer.clear()
  renderer.render(scene, camera)

  // PASS 2: composite the reactive text/icon colors over the textured leaves.
  renderer.setRenderTarget(null)
  renderer.clear()
  renderer.render(postMesh && textFontReady ? postScene : scene, camera)

  animationId = requestAnimationFrame(animate)
}


function onResize() {
  updateDesignScale()
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
  typographyViewportScale.value = clamp(0.45, w / 900, 1)
  flockStates.forEach(state => {
    state.size = effectiveSizeMin.value
      + (effectiveSizeMax.value - effectiveSizeMin.value) * state.seed
  })
  if (textFontReady) loadSvgAsTexture(img, w, h)
  keepControlPanelInViewport()
}

function updateDesignScale() {
  layoutViewportWidth.value = window.innerWidth
  layoutViewportHeight.value = window.innerHeight
  designScale.value = Math.min(
    (window.innerWidth * 0.92) / 1440,
    (window.innerHeight * 0.92) / 1000,
  )

  const limits = desktopLayoutLimits.value
  desktopLandingOffsetX.value = clamp(limits.minX, desktopLandingOffsetX.value, limits.maxX)
  desktopLandingOffsetY.value = clamp(limits.minY, desktopLandingOffsetY.value, limits.maxY)
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

function exportSettings() {
  const settings = {
    version: 1,
    font: selectedFont.value,
    simulation: {
      triangleGrid: squareRes.value,
      targetOrbitSpeed: targetOrbitSpeed.value,
      orbitRadiusX: orbitRadiusX.value,
      orbitRadiusY: orbitRadiusY.value,
      targetWeight: targetWeight.value,
      biographyAvoidanceWeight: biographyAvoidanceWeight.value,
      biographyClearance: biographyClearance.value,
      neighborRadius: neighborRadius.value,
      separationWeight: separationWeight.value,
      alignmentWeight: alignmentWeight.value,
      cohesionWeight: cohesionWeight.value,
      minimumSpeed: flockMinSpeed.value,
      maximumSpeed: flockMaxSpeed.value,
      maximumSteering: maxSteer.value,
      minSize: sizeMin.value,
      maxSize: sizeMax.value,
    },
    colors: {
      triangleA: { ...colorA },
      triangleB: { ...colorB },
      navigationOverlap: { ...navigationEffectColor },
      biographyOverlap: { ...biographyEffectColor },
      titleOverlap: { ...titleEffectColor },
      subtitleOverlap: { ...subtitleEffectColor },
      socialOverlap: { ...socialEffectColor },
    },
    typography: {
      mainTitle: { size: titleTextSize.value, weight: titleTextWeight.value },
      subtitle: { size: subtitleTextSize.value, weight: subtitleTextWeight.value },
      navigation: {
        size: navigationTextSize.value,
        weight: navigationTextWeight.value,
        spacing: menuItemSpacing.value,
      },
      contentTitles: { size: headingTextSize.value, weight: headingTextWeight.value },
      bodyText: { size: bodyTextSize.value, weight: bodyTextWeight.value },
    },
    desktopLandingLayout: {
      menuLeft: desktopMenuLeft.value,
      menuTop: desktopMenuTop.value,
      contentOffsetX: desktopLandingOffsetX.value,
      contentOffsetY: desktopLandingOffsetY.value,
    },
  }
  const blob = new Blob([`${JSON.stringify(settings, null, 2)}\n`], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'website-settings.json'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
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
watch([sizeMin, sizeMax], () => {
  if (renderer && scene) buildSimulation(squareRes.value)
})
watch(flockMinSpeed, (value) => {
  if (value > flockMaxSpeed.value) flockMaxSpeed.value = value
})
watch(flockMaxSpeed, (value) => {
  if (value < flockMinSpeed.value) flockMinSpeed.value = value
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

.typography-settings > strong {
  display: block;
  margin-bottom: 0.55rem;
}

.typography-control {
  padding: 0.55rem;
  border: 1px solid rgba(35, 72, 57, 0.12);
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.28);
}

.typography-control > span {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 600;
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
  right: var(--menu-item-spacing, 30px);

  left: clamp(0.6rem, -2rem + 15vw, 3rem);

  display: flex;
  gap: var(--menu-item-spacing, 11px);
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
  font-size: var(--navigation-text-size, 18px);
  font-family: var(--site-font, "Space Grotesk"), sans-serif;
  font-weight: var(--navigation-text-weight, 500);
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
  inset: calc(var(--navigation-text-size, 18px) + 2rem) 0 0;
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
  color: #234839;
  font-family: "Atomic Age", sans-serif;
  font-size: var(--heading-text-size, 17px);
  font-weight: var(--heading-text-weight, 500);
  letter-spacing: -0.015em;
  line-height: 1.25;
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
  color: rgba(35, 72, 57, 0.82);
  font-family: "Marcellus Local", "Marcellus", serif;
  font-size: var(--body-text-size, 14px);
  font-weight: var(--body-text-weight, 400);
  line-height: 1.55;
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
  font-size: var(--heading-text-size, 17px);
  font-weight: var(--heading-text-weight, 500);
}

.research-text p {
  color: rgba(35, 72, 57, 0.82);
  font-family: "Marcellus Local", "Marcellus", serif;
  font-size: var(--body-text-size, 14px);
  font-weight: var(--body-text-weight, 400);
  line-height: 1.55;
  opacity: 1;
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

/* Botanical landing page */
.canvas-container { position: fixed; inset: 0; z-index: 0; display: block; }
.app { --design-scale: 1; width: 100vw; height: 100dvh; min-height: 0; overflow: hidden; color: #670000; background: #fbfdf9; }
.landing-page { position: absolute; z-index: 1; top: 50%; left: 50%; width: 1440px; height: 1000px; min-height: 0; overflow: hidden; pointer-events: none; transform: translate(-50%, -50%) scale(var(--design-scale)); transform-origin: center; }
.landing-intro { position: absolute; z-index: 2; top: 260px; left: 485px; width: 840px; height: 235px; box-sizing: border-box; color: #000; opacity: .71; font-family: "Marcellus", "Marcellus Local", serif; font-size: 18px; font-weight: 400; line-height: 22px; letter-spacing: 0; text-align: right; }
.landing-intro p { margin: 0 0 .45em; }
.landing-profile { position: absolute; z-index: 2; inset: 0; display: block; }
.landing-portrait-stack { position: absolute; inset: 0; width: auto; height: auto; }
.landing-paper { position: absolute; z-index: 0; top: 485px; left: 45px; width: 430px; height: 290px; object-fit: fill; transform: rotate(90deg); transform-origin: center; filter: drop-shadow(4px 5px 7px rgba(0,0,0,.2)); }
.landing-portrait { position: absolute; z-index: 1; top: 472.5px; left: 177.5px; display: block; width: 165px; height: 315px; box-sizing: border-box; object-fit: fill; border: 4px solid #fff; background: transparent; box-shadow: 4px -4px 6.7px 0 rgba(0,0,0,.25); }
.landing-profile-copy { display: contents; }
.landing-profile-copy h1 { position: absolute; top: 580px; left: 450px; width: 495px; height: 62px; margin: 0; color: #895900; font-family: "Eagle Lake", serif; font-size: 44px; font-weight: 400; line-height: 62px; letter-spacing: 0; white-space: nowrap; }
.landing-profile-copy > p { position: absolute; top: 650px; left: 450px; width: 390px; height: 24px; margin: 0; color: #000; opacity: .6; font-family: "Atomic Age", sans-serif; font-size: 17px; font-weight: 400; line-height: 24px; letter-spacing: 0; -webkit-text-stroke: .75px #000; white-space: nowrap; }
.landing-socials { position: absolute; top: 760px; left: 440px; display: flex; width: 218px; height: 38px; gap: 22px; opacity: .72; pointer-events: auto; }
.landing-socials a { display: block; flex: 0 0 38px; width: 38px; height: 38px; background-color: #5c0000; mask-position: center; mask-repeat: no-repeat; mask-size: contain; }
.landing-socials a:nth-child(1) { mask-image: url('/icons/instagram.svg'); }
.landing-socials a:nth-child(2) { mask-image: url('/icons/linkedin.svg'); }
.landing-socials a:nth-child(3) { mask-image: url('/icons/github.svg'); }
.landing-socials a:nth-child(4) { mask-image: url('/icons/email.svg'); }
.landing-socials img { display: none; }
.menu-design-canvas { position: fixed; z-index: 1200; top: 50%; left: 50%; width: 1440px; height: 1000px; pointer-events: none; transform: translate(-50%, -50%) scale(var(--design-scale)); transform-origin: center; }
.top-bar { top: var(--desktop-menu-top, 6px); right: auto; left: var(--desktop-menu-left, 850px); width: 770px; height: 34px; justify-content: space-between; gap: 0; transform: none; pointer-events: none; }
.top-bar button { width: auto; height: 34px; padding: 0; color: #670000; font-family: "Eagle Lake", serif; font-size: 28px; font-weight: 400; line-height: 34px; letter-spacing: 0; }
.top-bar button { pointer-events: auto; }
.app.menu-mask-ready .top-bar button,
.app.menu-mask-ready .top-bar button:hover,
.app.menu-mask-ready .top-bar button.active,
.app.menu-mask-ready .landing-intro,
.app.menu-mask-ready .landing-profile-copy h1,
.app.menu-mask-ready .landing-profile-copy > p { color: transparent; -webkit-text-stroke-color: transparent; }
.app.menu-mask-ready .landing-socials a { background-color: transparent; }

@media (min-width: 768px) {
  .landing-page {
    overflow: visible;
  }

  .landing-intro,
  .landing-profile {
    transform: translate(
      var(--desktop-landing-offset-x, -178px),
      var(--desktop-landing-offset-y, 30px)
    );
  }
}

@media (max-width: 767px) {
  .app {
    --mobile-safe-height: 100vh;
  }

  @supports (height: 100svh) {
    .app { --mobile-safe-height: 100svh; }
  }

  .landing-page {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: var(--mobile-safe-height);
    transform: none;
    transform-origin: top left;
  }

  .menu-design-canvas {
    top: 0;
    left: 0;
    width: 100vw;
    height: var(--mobile-safe-height);
    transform: none;
    transform-origin: top left;
  }

  .top-bar {
    position: fixed;
    top: max(12px, calc(env(safe-area-inset-top) + 8px));
    right: max(14px, calc(env(safe-area-inset-right) + 10px));
    left: auto;
    width: auto;
    height: 34px;
    gap: clamp(10px, 3.3vw, 18px);
    justify-content: flex-end;
  }

  .top-bar button {
    height: 34px;
    font-size: clamp(11px, 3.2vw, 14px);
    line-height: 34px;
    border-bottom-color: transparent;
  }

  .landing-intro {
    top: 28.5%;
    left: 36.5%;
    width: 56.5%;
    height: auto;
    font-size: clamp(7px, 1.9vw, 9px);
    line-height: 1.22;
  }

  .landing-paper {
    /* Frame 6: 1.3x the former mobile paper. The source keeps its natural
       10:7 ratio; after the 90deg rotation its visible box is 26.67 x 38.1vw. */
    top: calc(64.6% + 5.715vw);
    left: 1.85vw;
    width: 38.1vw;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(.41vw .515vw .45vw rgba(0,0,0,.2));
  }

  .landing-portrait {
    top: calc(64.6% + 5.59vw);
    left: 14.235vw;
    width: 14.3vw;
    height: auto;
    aspect-ratio: auto;
    object-fit: contain;
    border-width: clamp(1px, .7vw, 3px);
    box-shadow: .41vw -.41vw .43vw 0 rgba(0,0,0,.25);
  }

  .landing-profile-copy h1 {
    top: 70.7%;
    left: 37.5%;
    width: auto;
    height: auto;
    font-size: clamp(17px, 5vw, 24px);
    line-height: 1.2;
  }

  .landing-profile-copy > p {
    top: 75%;
    left: 37.5%;
    width: auto;
    height: auto;
    font-size: clamp(6px, 1.7vw, 8px);
    line-height: 1.25;
    -webkit-text-stroke-width: .25px;
  }

  .landing-socials {
    top: 79.2%;
    left: 36.8%;
    width: auto;
    height: auto;
    gap: clamp(8px, 2.7vw, 13px);
  }

  .landing-socials a {
    flex-basis: clamp(13px, 4vw, 19px);
    width: clamp(13px, 4vw, 19px);
    height: clamp(13px, 4vw, 19px);
  }
}

@media (max-width: 767px) and (max-height: 560px) {
  .landing-intro { top: 24%; }
  .landing-paper { top: calc(61.3% + 5.715vw); }
  .landing-portrait { top: calc(61.3% + 5.59vw); }
  .landing-profile-copy h1 { top: 68%; }
  .landing-profile-copy > p { top: 73%; }
  .landing-socials { top: 78%; }
}


</style>
