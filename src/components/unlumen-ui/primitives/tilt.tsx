"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type SpringOptions,
} from "motion/react";

import { cn } from "@/lib/utils";

/*
  Tilt: inclinacao 3D que segue o ponteiro. Reimplementacao da primitiva do
  unlumen-ui (o snippet original so expunha o TiltCard). Toda a fisica roda em
  motion values, fora do ciclo de render do React.
*/

export interface TiltProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  /** graus maximos de inclinacao em cada eixo */
  rotationFactor?: number;
  /** inverte o sentido (o card "foge" do cursor) */
  isReverse?: boolean;
  springOptions?: SpringOptions;
}

const DEFAULT_SPRING: SpringOptions = { stiffness: 260, damping: 26, mass: 0.6 };

export function Tilt({
  children,
  rotationFactor = 12,
  isReverse = false,
  springOptions = DEFAULT_SPRING,
  className,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: TiltProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, springOptions);
  const sy = useSpring(py, springOptions);

  const dir = isReverse ? -1 : 1;
  const rotateX = useTransform(sy, [0, 1], [rotationFactor * dir, -rotationFactor * dir]);
  const rotateY = useTransform(sx, [0, 1], [-rotationFactor * dir, rotationFactor * dir]);

  return (
    <motion.div
      className={cn("[transform-style:preserve-3d]", className)}
      style={{
        ...style,
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 900,
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        px.set(0.5);
        py.set(0.5);
        onPointerLeave?.(e);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
