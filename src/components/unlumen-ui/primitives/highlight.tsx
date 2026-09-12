"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

/*
  Highlight / HighlightItem: um fundo unico que desliza ate o item sob o
  cursor (ou com foco de teclado). Reimplementacao da primitiva usada pelo
  MotionNavigationMenu do unlumen-ui, com a mesma API que ele consome.
*/

type Rect = { x: number; y: number; width: number; height: number };

type HighlightContextValue = {
  hover: boolean;
  setActive: (el: HTMLElement | null) => void;
};

const HighlightContext = React.createContext<HighlightContextValue | null>(null);

export interface HighlightProps {
  children: React.ReactNode;
  /** mantido por compatibilidade com a API original; so "parent" e suportado */
  mode?: "parent";
  /** mantido por compatibilidade com a API original */
  controlledItems?: boolean;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  transition?: Transition;
}

const DEFAULT_TRANSITION: Transition = { type: "spring", stiffness: 380, damping: 34 };

export function Highlight({
  children,
  hover = true,
  className,
  style,
  containerClassName,
  transition = DEFAULT_TRANSITION,
}: HighlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = React.useState<Rect | null>(null);

  const setActive = React.useCallback((el: HTMLElement | null) => {
    const container = containerRef.current;
    if (!el || !container) {
      setRect(null);
      return;
    }
    const c = container.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setRect({ x: r.left - c.left, y: r.top - c.top, width: r.width, height: r.height });
  }, []);

  const value = React.useMemo(() => ({ hover, setActive }), [hover, setActive]);

  return (
    <HighlightContext.Provider value={value}>
      <div
        ref={containerRef}
        className={cn("relative isolate", containerClassName)}
        onMouseLeave={() => setRect(null)}
      >
        <AnimatePresence>
          {rect && (
            <motion.div
              key="highlight"
              aria-hidden="true"
              className={cn("absolute left-0 top-0", className)}
              style={style}
              initial={{ opacity: 0, ...rect }}
              animate={{ opacity: 1, ...rect }}
              exit={{ opacity: 0 }}
              transition={transition}
            />
          )}
        </AnimatePresence>
        {children}
      </div>
    </HighlightContext.Provider>
  );
}

type ItemChildProps = React.HTMLAttributes<HTMLElement>;

export interface HighlightItemProps {
  children: React.ReactElement<ItemChildProps>;
  /** repassa os handlers pro filho em vez de criar um wrapper */
  asChild?: boolean;
  className?: string;
}

export function HighlightItem({ children, asChild, className }: HighlightItemProps) {
  const ctx = React.useContext(HighlightContext);
  const childProps = children.props;

  const handlers: ItemChildProps = {
    onMouseEnter: (e) => {
      childProps.onMouseEnter?.(e);
      if (ctx?.hover) ctx.setActive(e.currentTarget);
    },
    onFocus: (e) => {
      childProps.onFocus?.(e);
      ctx?.setActive(e.currentTarget);
    },
  };

  if (asChild) {
    return React.cloneElement(children, {
      ...handlers,
      className: cn(childProps.className, className),
    });
  }

  return (
    <div className={className} {...handlers}>
      {children}
    </div>
  );
}
