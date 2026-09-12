import type { ReactNode } from "react";
import { ArrowLeftIcon, type Icon } from "@phosphor-icons/react";

import type { ServicoId } from "@/data/services";

interface ServicePanelShellProps {
  id: ServicoId;
  title: string;
  icon: Icon;
  onVoltar: () => void;
  children: ReactNode;
}

// Moldura leve pro conteudo de cada aba de detalhe: sem position:fixed, sem
// backdrop, sem foco preso - e conteudo normal da pagina dentro do slide do
// carrossel, so que ocupando o espaco inteiro. Cada arquivo em details/
// decide livremente o que colocar dentro (children); so o cabecalho
// (voltar + icone + titulo) e compartilhado, pra ficar previsivel.
export function ServicePanelShell({ id, title, icon: Icon, onVoltar, children }: ServicePanelShellProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b border-border pb-5">
        <button
          type="button"
          onClick={onVoltar}
          aria-label="Voltar pros serviços"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
        >
          <ArrowLeftIcon className="size-4" weight="bold" />
        </button>
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-text">
          <Icon className="size-5" weight="bold" />
        </span>
        <h3 id={`${id}-titulo`} className="truncate text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto pt-6">{children}</div>
    </div>
  );
}
