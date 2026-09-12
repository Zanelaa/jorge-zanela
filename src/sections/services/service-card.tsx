import { motion } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import type { ServicoResumo } from "@/data/services";
import { cardLayoutId } from "./layout-ids";

const BADGE_CLASSES: Record<NonNullable<ServicoResumo["badgeVariant"]>, string> = {
  success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  warning: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
};

interface ServiceCardProps {
  item: ServicoResumo;
  onOpen: () => void;
}

// Carrega o layoutId sempre: e o que permite o Motion "crescer" este card
// exato ate virar o painel cheio da aba de detalhe quando ele e clicado
// (ver service-pager.tsx). Sem manipulacao manual de escala/opacidade aqui
// dentro - so gesticulos momentaneos (hover/tap), que combinam bem com
// layout sem conflitar com a projecao dele.
export function ServiceCard({ item, onOpen }: ServiceCardProps) {
  const Icon = item.icon;

  return (
    <motion.button
      type="button"
      layout
      layoutId={cardLayoutId(item.id)}
      onClick={onOpen}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 28, mass: 1 }}
      aria-haspopup="true"
      className={cn(
        "group relative flex h-52 w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background p-6 text-left sm:h-56",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_32px_-24px_rgba(0,0,0,0.35)]",
        "transition-[border-color,box-shadow] duration-300 ease-out",
        "hover:border-brand/50 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-20px_color-mix(in_srgb,var(--brand)_38%,transparent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      {/* linha de brilho no topo: reforca a borda "premium" so no hover, sem
          pesar o estado padrao do card */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-text ring-1 ring-inset ring-brand/10 transition-transform duration-300 group-hover:scale-105">
          <Icon className="size-5" weight="bold" />
        </span>
        {item.badgeLabel ? (
          <div className="inline-flex h-fit items-center text-xs font-medium whitespace-nowrap">
            <span className="rounded-l-full bg-secondary px-2 py-1">{item.price}</span>
            <span className={cn("rounded-r-full px-2 py-1", BADGE_CLASSES[item.badgeVariant ?? "success"])}>
              {item.badgeLabel}
            </span>
          </div>
        ) : (
          <span className="h-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium whitespace-nowrap">
            {item.price}
          </span>
        )}
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>

      <div className="flex items-center gap-1.5 pt-3 text-xs font-medium text-brand-text">
        <span className="flex -translate-x-1.5 items-center gap-1.5 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          Ver detalhes
          <ArrowRightIcon className="size-3.5" weight="bold" />
        </span>
      </div>
    </motion.button>
  );
}
