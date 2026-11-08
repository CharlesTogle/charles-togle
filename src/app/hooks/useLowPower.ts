"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "low-power";
const CHANGE_EVENT = "lowpowerchange";

// The visitor's explicit choice wins; otherwise follow the browser's
// data-saver hint. Storage access is guarded because it can be blocked.
export function readLowPower(): boolean {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "1";
  } catch {
    // Fall through to the browser hint.
  }
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setLowPower(on: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
  } catch {
    // Not persisted, but still applies for this page view via the event.
  }
  document.documentElement.toggleAttribute("data-low-power", on);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Low power mode: no WebGL scene and no continuous decorative animation. */
export function useLowPower() {
  // Server render and hydration assume full power; the client corrects after.
  return useSyncExternalStore(subscribe, readLowPower, () => false);
}
