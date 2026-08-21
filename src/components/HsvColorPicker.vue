<template>
  <section class="color-picker-shell">
    <button class="color-trigger" type="button" :aria-expanded="open" @click="open = !open">
      <span class="trigger-swatch" :style="{ backgroundColor: hexColor }" aria-hidden="true"></span>
      <span class="trigger-copy">
        <strong>{{ label }}</strong>
        <small>({{ Math.round(h) }}°, {{ s.toFixed(2) }}, {{ v.toFixed(2) }})</small>
      </span>
      <output>{{ hexColor }}</output>
      <span class="picker-chevron" aria-hidden="true">{{ open ? '−' : '+' }}</span>
    </button>

    <div v-if="open" class="hsv-picker">
      <div class="picker-tools">
        <span>Kleur selecteren</span>
        <button
          v-if="eyeDropperAvailable"
          class="eyedropper-button"
          type="button"
          aria-label="Kleur van het scherm selecteren"
          title="Kleur van het scherm selecteren"
          @click="pickFromScreen"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m19.4 2.6 2 2a2 2 0 0 1 0 2.8l-3.1 3.1 1.2 1.2-2.1 2.1-1.2-1.2-7.9 7.9H3.5v-4.8l7.9-7.9-1.2-1.2 2.1-2.1 1.2 1.2 3.1-3.1a2 2 0 0 1 2.8 0ZM5.5 16.5v2h2l7.3-7.3-2-2-7.3 7.3Z" />
          </svg>
        </button>
      </div>

      <div class="picker-surface">
        <div class="picker-preview" :style="{ backgroundColor: hexColor }" aria-hidden="true"></div>
        <div
          class="sv-plane"
          role="slider"
          tabindex="0"
          :aria-label="`Verzadiging en helderheid van ${label}`"
          :aria-valuetext="`${Math.round(s * 100)}% verzadiging, ${Math.round(v * 100)}% helderheid`"
          :style="{ '--pure-hue': pureHue }"
          @pointerdown="updateSv"
          @pointermove="moveSv"
        >
          <span
            class="sv-cursor"
            :style="{ left: `${s * 100}%`, top: `${(1 - v) * 100}%`, backgroundColor: hexColor }"
            aria-hidden="true"
          ></span>
        </div>
      </div>

      <label class="hue-control">
        <span class="visually-hidden">Tint van {{ label }}</span>
        <input
          type="range"
          min="0"
          max="360"
          :value="h"
          :style="{ '--picked-color': pureHue }"
          @input="updateHue"
        />
      </label>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  h: { type: Number, required: true },
  s: { type: Number, required: true },
  v: { type: Number, required: true },
})

const emit = defineEmits(['update'])
const open = ref(false)
const eyeDropperAvailable = typeof window !== 'undefined' && 'EyeDropper' in window

function hsvToHex(h, s, v) {
  const chroma = v * s
  const hp = ((h % 360) + 360) % 360 / 60
  const x = chroma * (1 - Math.abs((hp % 2) - 1))
  let rgb = [0, 0, 0]
  if (hp < 1) rgb = [chroma, x, 0]
  else if (hp < 2) rgb = [x, chroma, 0]
  else if (hp < 3) rgb = [0, chroma, x]
  else if (hp < 4) rgb = [0, x, chroma]
  else if (hp < 5) rgb = [x, 0, chroma]
  else rgb = [chroma, 0, x]
  const match = v - chroma
  return `#${rgb.map(channel => Math.round((channel + match) * 255).toString(16).padStart(2, '0')).join('')}`.toUpperCase()
}

function hexToHsv(hex) {
  const value = Number.parseInt(hex.slice(1), 16)
  const r = ((value >> 16) & 255) / 255
  const g = ((value >> 8) & 255) / 255
  const b = (value & 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  if (delta) {
    if (max === r) h = 60 * (((g - b) / delta) % 6)
    else if (max === g) h = 60 * ((b - r) / delta + 2)
    else h = 60 * ((r - g) / delta + 4)
  }
  return { h: (h + 360) % 360, s: max === 0 ? 0 : delta / max, v: max }
}

const hexColor = computed(() => hsvToHex(props.h, props.s, props.v))
const pureHue = computed(() => hsvToHex(props.h, 1, 1))

function updateSv(event) {
  event.currentTarget.setPointerCapture?.(event.pointerId)
  const bounds = event.currentTarget.getBoundingClientRect()
  emit('update', {
    h: props.h,
    s: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
    v: 1 - Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
  })
}

function moveSv(event) {
  if (event.buttons === 0) return
  updateSv(event)
}

function updateHue(event) {
  emit('update', { h: Number(event.target.value), s: props.s, v: props.v })
}

async function pickFromScreen() {
  try {
    const result = await new window.EyeDropper().open()
    emit('update', hexToHsv(result.sRGBHex))
  } catch {
    // The native picker also rejects when the user cancels it.
  }
}
</script>

<style scoped>
.color-picker-shell { margin: 0; padding: 0; border: 0; background: transparent; }
.color-trigger { display: grid; grid-template-columns: 28px 1fr auto 18px; align-items: center; gap: 8px; width: 100%; min-height: 42px; padding: 6px 8px; border: 1px solid rgba(35,72,57,.16); border-radius: 9px; color: #234839; background: rgba(255,255,255,.68); font: inherit; text-align: left; cursor: pointer; transition: border-color .15s ease, box-shadow .15s ease, background .15s ease; }
.color-trigger:hover, .color-trigger[aria-expanded='true'] { border-color: rgba(35,72,57,.34); background: rgba(255,255,255,.9); box-shadow: 0 2px 8px rgba(23,59,43,.08); }
.trigger-swatch { width: 28px; height: 28px; border: 1px solid rgba(0,0,0,.14); border-radius: 6px; box-sizing: border-box; box-shadow: inset 0 0 0 1px rgba(255,255,255,.3); }
.trigger-copy { display: flex; min-width: 0; flex-direction: column; gap: 1px; }
.trigger-copy strong { font-size: .69rem; font-weight: 600; }
.trigger-copy small { font-size: .6rem; opacity: .62; }
.color-trigger output { color: rgba(35,72,57,.64); font: inherit; font-size: .58rem; }
.picker-chevron { display: grid; font-size: 1rem; opacity: .55; place-items: center; }
.hsv-picker { display: grid; gap: 9px; overflow: hidden; margin-top: 6px; border: 1px solid rgba(35,72,57,.16); border-radius: 9px; background: rgba(255,255,255,.92); box-shadow: 0 7px 20px rgba(23,59,43,.1); }
.picker-tools { display: flex; min-height: 34px; padding: 6px 8px 0 10px; box-sizing: border-box; color: rgba(35,72,57,.62); font-size: .62rem; font-weight: 600; align-items: center; justify-content: space-between; }
.eyedropper-button { display: grid; width: 28px; height: 28px; padding: 5px; border: 1px solid rgba(35,72,57,.16); border-radius: 7px; color: #486b5c; background: #fff; cursor: pointer; place-items: center; }
.eyedropper-button:hover { background: #eef8ed; }
.eyedropper-button svg { width: 17px; height: 17px; fill: currentColor; }
.picker-surface { display: grid; grid-template-columns: 32% 68%; height: 124px; }
.picker-preview { border-block: 1px solid rgba(0,0,0,.06); }
.sv-plane { position: relative; border-block: 1px solid rgba(0,0,0,.06); background: linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,var(--pure-hue)); cursor: crosshair; touch-action: none; }
.sv-cursor { position: absolute; width: 14px; height: 14px; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 0 1px rgba(30,34,39,.35),0 1px 4px rgba(30,34,39,.35); pointer-events: none; transform: translate(-50%,-50%); }
.hue-control { display: block; padding: 0 10px 10px; margin: 0; }
.hue-control input[type='range'] { width: 100%; height: 8px; margin: 0; border-radius: 999px; background: linear-gradient(90deg,#f00 0%,#ff0 16.67%,#0f0 33.33%,#0ff 50%,#00f 66.67%,#f0f 83.33%,#f00 100%); cursor: pointer; appearance: none; }
.hue-control input[type='range']::-webkit-slider-runnable-track { height: 8px; border-radius: 999px; background: transparent; }
.hue-control input[type='range']::-webkit-slider-thumb { width: 14px; height: 14px; margin-top: -3px; border: 2px solid #fff; border-radius: 50%; background: var(--picked-color); box-shadow: 0 0 0 1px rgba(30,34,39,.35),0 1px 3px rgba(30,34,39,.22); appearance: none; }
.hue-control input[type='range']::-moz-range-track { height: 8px; border: 0; border-radius: 999px; background: transparent; }
.hue-control input[type='range']::-moz-range-thumb { width: 14px; height: 14px; border: 2px solid #fff; border-radius: 50%; background: var(--picked-color); box-shadow: 0 0 0 1px rgba(30,34,39,.35),0 1px 3px rgba(30,34,39,.22); }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container settings-panel (max-width: 350px) {
  .color-trigger { grid-template-columns: 28px 1fr 18px; }
  .color-trigger output { display: none; }
}
</style>
