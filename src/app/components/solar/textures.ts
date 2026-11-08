import { CanvasTexture, SRGBColorSpace } from "three";

// A soft radial falloff drawn once on a canvas; used for the sun's corona
// and the green halo that marks hovered or visited planets.
export function createGlowTexture(rgb: string, size = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, `rgba(${rgb}, 1)`);
    gradient.addColorStop(0.25, `rgba(${rgb}, 0.45)`);
    gradient.addColorStop(0.6, `rgba(${rgb}, 0.08)`);
    gradient.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

// A thin bright ring with a soft glow: the photon ring around a black hole.
export function createRingTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.strokeStyle = "rgba(255, 236, 228, 1)";
    ctx.shadowColor = "rgba(255, 90, 54, 1)";
    ctx.shadowBlur = size * 0.06;
    ctx.lineWidth = size * 0.012;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
    ctx.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

// An accretion disk seen face-on: white-hot at the inner edge, cooling to
// infrared outward, with uneven streaks so its spin is visible.
export function createDiskTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const image = ctx.createImageData(size, size);
    const half = size / 2;
    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        const x = (px - half) / half;
        const y = (py - half) / half;
        const r = Math.hypot(x, y);
        if (r > 1) continue;
        const angle = Math.atan2(y, x);
        const streaks = 0.65 + 0.35 * Math.sin(angle * 3 + r * 9) * Math.sin(angle * 7 - r * 4);
        // Ring profile: bright just outside the inner edge, fading outward
        const ring = r < 0.34 ? 0 : Math.min((r - 0.34) / 0.05, 1) * Math.pow(1 - r, 1.2);
        const heat = Math.max(0, 1 - (r - 0.34) / 0.3); // 1 = white-hot
        const alpha = Math.min(ring * streaks * 2.2, 1);
        const i = (py * size + px) * 4;
        image.data[i] = 255;
        image.data[i + 1] = Math.round(90 + 150 * heat);
        image.data[i + 2] = Math.round(54 + 180 * heat);
        image.data[i + 3] = Math.round(alpha * 255);
      }
    }
    ctx.putImageData(image, 0, 0);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
