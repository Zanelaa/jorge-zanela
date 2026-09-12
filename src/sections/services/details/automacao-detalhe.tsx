import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { SERVICOS } from "@/data/services";
import { cn } from "@/lib/utils";
import { ServicePanelShell } from "../service-panel-shell";

interface Rotina {
  antes: string;
  depois: string;
}

const ROTINAS: Rotina[] = [
  { antes: "Lançar nota fiscal uma por uma", depois: "Captura e lança sozinho no sistema" },
  { antes: "Conferir planilha todo fim de mês", depois: "Relatório pronto todo dia de manhã" },
  { antes: "Bater saldo do banco na mão", depois: "Conciliação automática, direto da API" },
  { antes: "Inserção de dados em sistema", depois: "Monitoramento em tempo real do que o robô inseriu" },
  { antes: "Atuação em chamados", depois: "IA apoia no fluxo de decisões" },
];

const item = SERVICOS.find((s) => s.id === "automacao")!;

export function AutomacaoDetalhe({ onVoltar }: { onVoltar: () => void }) {
  const reduce = useReducedMotion();
  // cada rotina alterna sozinha entre o "hoje" (antes) e o "com robo"
  // (depois) - e o jeito de mostrar a transformacao sem precisar de duas
  // colunas de texto disputando espaco na mesma linha.
  const [reveladas, setReveladas] = useState<boolean[]>(() => ROTINAS.map(() => false));

  const alternar = (i: number) => {
    setReveladas((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <ServicePanelShell id="automacao" title={item.title} icon={item.icon} onVoltar={onVoltar}>
      <p className="max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
        Robôs que assumem as tarefas repetitivas da operação, a equipe orquestra e analisa!
      </p>
      <p className="mt-1.5 text-xs text-muted-foreground">Toque em cada rotina pra ver como fica com automação.</p>

      <div className="mt-4 space-y-2">
        {ROTINAS.map((r, i) => {
          const revelada = reveladas[i];
          return (
            <button
              key={r.antes}
              type="button"
              onClick={() => alternar(i)}
              aria-pressed={revelada}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition-colors duration-300 sm:p-4",
                revelada ? "border-brand/40 bg-brand-soft/40" : "border-border hover:bg-secondary/50",
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300",
                  revelada ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground",
                )}
              >
                <ArrowsClockwiseIcon className="size-4" weight="bold" />
              </span>

              <span className="min-w-0 flex-1 overflow-hidden">
                <motion.span
                  key={revelada ? "depois" : "antes"}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "block text-sm leading-relaxed",
                    revelada ? "font-medium text-foreground" : "text-muted-foreground line-through decoration-border",
                  )}
                >
                  {revelada ? r.depois : r.antes}
                </motion.span>
              </span>

              <span
                className={cn(
                  "shrink-0 text-[11px] font-medium tracking-wide uppercase",
                  revelada ? "text-brand-text" : "text-muted-foreground/70",
                )}
              >
                {revelada ? "Com robô" : "Hoje"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <WhatsAppButton message="Olá, Jorge! Vi a página sobre automação e quero saber mais." />
      </div>
    </ServicePanelShell>
  );
}
