import { useState } from "react";
import { ArrowCounterClockwiseIcon, GearSixIcon, XIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

// Painel de ajuste ao vivo do PixelLiquidBg (fundo do hero) - so existe em
// dev (ver uso em hero.tsx), nunca entra no build de producao.
export interface PixelDevConfig {
  pixelSize: number;
  resolution: number;
  mouseForce: number;
  cursorSize: number;
}

export const PIXEL_DEV_DEFAULTS: PixelDevConfig = {
  pixelSize: 16,
  resolution: 0.3,
  mouseForce: 6,
  cursorSize: 110,
};

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, step, format, onChange }: SliderRowProps) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted-foreground">{format ? format(value) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-brand"
      />
    </label>
  );
}

interface PixelDevPanelProps {
  value: PixelDevConfig;
  onChange: (v: PixelDevConfig) => void;
}

export function PixelDevPanel({ value, onChange }: PixelDevPanelProps) {
  const [open, setOpen] = useState(false);

  const set = (patch: Partial<PixelDevConfig>) => onChange({ ...value, ...patch });

  return (
    <div className="fixed bottom-24 right-4 z-40">
      {open ? (
        <div className="w-72 rounded-2xl border border-border bg-background/95 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Settings</h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange(PIXEL_DEV_DEFAULTS)}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowCounterClockwiseIcon className="size-3.5" weight="bold" />
                Reset
              </button>
              <button
                type="button"
                aria-label="Fechar ajustes"
                onClick={() => setOpen(false)}
                className="grid size-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <XIcon className="size-3.5" weight="bold" />
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <SliderRow
              label="Pixel Size"
              value={value.pixelSize}
              min={4}
              max={48}
              step={1}
              onChange={(v) => set({ pixelSize: v })}
            />
            <SliderRow
              label="Resolution"
              value={value.resolution}
              min={0.05}
              max={1}
              step={0.05}
              format={(v) => v.toFixed(2)}
              onChange={(v) => set({ resolution: v })}
            />
            <SliderRow
              label="Mouse Force"
              value={value.mouseForce}
              min={0}
              max={20}
              step={1}
              onChange={(v) => set({ mouseForce: v })}
            />
            <SliderRow
              label="Cursor Size"
              value={value.cursorSize}
              min={20}
              max={300}
              step={5}
              onChange={(v) => set({ cursorSize: v })}
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ajustes do fundo animado"
          className={cn(
            "grid size-11 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur-xl transition-colors hover:bg-secondary",
          )}
        >
          <GearSixIcon className="size-5" weight="bold" />
        </button>
      )}
    </div>
  );
}
