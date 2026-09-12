"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

/*
  ClippedCircle: um brilho circular recortado pelo card pai, que acompanha o
  cursor e so aparece no hover do `group`. Reimplementacao da primitiva do
  unlumen-ui. Usa mascara radial em vez de blur pra nao pesar na GPU.
*/

export interface ClippedCircleProps {
  className?: string;
  circleClassName?: string;
  /** diametro do circulo em px */
  circleSize?: number;
}

export function ClippedCircle({
  className,
  circleClassName,
  circleSize = 600,
}: ClippedCircleProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(-circleSize);
  const y = useMotionValue(-circleSize);
  const sx = useSpring(x, { stiffness: 300, damping: 32 });
  const sy = useSpring(y, { stiffness: 300, damping: 32 });

  React.useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left - circleSize / 2);
      y.set(e.clientY - r.top - circleSize / 2);
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, [circleSize, x, y]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <motion.div
        style={{ x: sx, y: sy, width: circleSize, height: circleSize }}
        className={cn(
          "absolute left-0 top-0 rounded-full opacity-0 transition-opacity duration-500",
          "[mask-image:radial-gradient(closest-side,black,transparent)]",
          "group-hover:opacity-[0.09] dark:group-hover:opacity-[0.07]",
          circleClassName,
        )}
      />
    </div>
  );
}
