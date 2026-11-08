"use client";

import { useEffect } from "react";
import { setLowPower, useLowPower } from "../hooks/useLowPower";

export default function LowPowerToggle() {
  const lowPower = useLowPower();

  // Keep the page-wide CSS switch in step with the stored preference.
  useEffect(() => {
    document.documentElement.toggleAttribute("data-low-power", lowPower);
  }, [lowPower]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={lowPower}
      onClick={() => setLowPower(!lowPower)}
      title={lowPower ? "Low power mode is on: 3D and animations are off" : "Turn off 3D and animations"}
      className="group inline-flex items-center gap-2 text-sm text-muted hover:text-paper"
    >
      <span
        aria-hidden="true"
        className={`relative h-[18px] w-8 shrink-0 rounded-full border transition-colors ${
          lowPower ? "border-signal bg-signal" : "border-rule-strong bg-ink"
        }`}
      >
        <span
          className={`absolute top-1/2 size-3 -translate-y-1/2 rounded-full transition-[left,background-color] ${
            lowPower ? "left-[15px] bg-ink" : "left-[2px] bg-muted group-hover:bg-paper"
          }`}
        />
      </span>
      Low power
    </button>
  );
}
