import { lazy, Suspense, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownIcon } from "@phosphor-icons/react";

import { pillBase, pillGhost, WhatsAppButton } from "@/components/whatsapp-button";
import { PIXEL_DEV_DEFAULTS, PixelDevPanel } from "@/components/dev/pixel-dev-panel";
import { cn } from "@/lib/utils";

// three.js e pesado: o fundo carrega depois do texto, sem travar o LCP
const PixelLiquidBg = lazy(() =>
  import("@/components/unlumen-ui/pixel-liquid-bg").then((m) => ({ default: m.PixelLiquidBg })),
);

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [pixelCfg, setPixelCfg] = useState(PIXEL_DEV_DEFAULTS);

  const entrada = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease: EASE },
  });

  return (
    <section id="topo" className="relative isolate flex min-h-[100dvh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Suspense fallback={null}>
          <PixelLiquidBg
            pixelSize={pixelCfg.pixelSize}
            resolution={pixelCfg.resolution}
            mouseForce={pixelCfg.mouseForce}
            cursorSize={pixelCfg.cursorSize}
            autoDemo={!reduce}
          />
        </Suspense>
      </div>

      {import.meta.env.DEV && <PixelDevPanel value={pixelCfg} onChange={setPixelCfg} />}

      {/* veu de leitura: o texto nunca disputa contraste com o fluido */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/70 to-background/40 md:bg-gradient-to-r md:from-background md:via-background/80 md:to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-24 sm:px-6">
        <div className="max-w-2xl">
          <motion.p {...entrada(0)} className="font-mono text-[13px] text-muted-foreground">
            Jorge Zanela, desenvolvedor em Joinville
          </motion.p>

          <motion.h1
            {...entrada(1)}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-tighter sm:text-5xl lg:text-[4.1rem]"
          >
            Seu cliente te acha no Google e fecha no{" "}
            <span className="text-brand-text">WhatsApp</span>.
          </motion.h1>

          <motion.p
            {...entrada(2)}
            className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground"
          >
            Landing pages, atendimento com IA e automações para negócios locais venderem mais sem
            aumentar a equipe.
          </motion.p>

          <motion.div {...entrada(3)} className="mt-9 flex flex-wrap items-center gap-3">
            <WhatsAppButton />
            <a href="#servicos" className={cn(pillBase, pillGhost, "h-12 px-6 text-[15px]")}>
              Ver serviços
              <ArrowDownIcon className="size-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
