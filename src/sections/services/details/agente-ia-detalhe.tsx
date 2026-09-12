import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { CalendarCheckIcon, HandshakeIcon, QuestionIcon, type Icon } from "@phosphor-icons/react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { SERVICOS } from "@/data/services";
import { cn } from "@/lib/utils";
import { ServicePanelShell } from "../service-panel-shell";
import { CONVERSAS_DEMO, WhatsAppShowcase } from "./whatsapp-showcase";

// tempo de leitura ao fim de cada conversa antes de trocar pra proxima -
// maior que o tempo de revelacao das 4 mensagens (~5.2s) pra dar folga real
// de leitura antes do corte.
const TROCA_AUTOMATICA_MS = 13000;

interface ModeloEntrega {
  icon: Icon;
  titulo: string;
  descricao: string;
}

// os 3 modelos de entrega do agente, na mesma ordem das 3 conversas do chat
// ao lado - e o que permite acender o item correspondente.
const MODELOS: ModeloEntrega[] = [
  {
    icon: QuestionIcon,
    titulo: "Perguntas frequentes",
    descricao: "Qualifica o visitante respondendo preço, prazo e dúvidas comuns na hora.",
  },
  {
    icon: CalendarCheckIcon,
    titulo: "Agenda em tempo real",
    descricao: "Verifica horário livre na sua agenda e confirma o agendamento sozinho.",
  },
  {
    icon: HandshakeIcon,
    titulo: "Contratação do serviço",
    descricao: "Fecha um serviço personalizado pro seu negócio direto na conversa.",
  },
];

const item = SERVICOS.find((s) => s.id === "agente-ia")!;

export function AgenteIADetalhe({ onVoltar }: { onVoltar: () => void }) {
  const reduce = useReducedMotion();
  const [conversaAtiva, setConversaAtiva] = useState(0);
  const [pausado, setPausado] = useState(false);

  // avanca sozinho pelas 3 conversas, cada uma "acendendo" o item
  // correspondente. Pausa no hover/foco (o usuario pode estar lendo) e fica
  // parado de vez com prefers-reduced-motion, restando so os pontinhos do
  // chat pra trocar manualmente.
  useEffect(() => {
    if (reduce || pausado) return;
    const id = window.setInterval(() => {
      setConversaAtiva((i) => (i + 1) % CONVERSAS_DEMO.length);
    }, TROCA_AUTOMATICA_MS);
    return () => window.clearInterval(id);
  }, [reduce, pausado]);

  return (
    <ServicePanelShell id="agente-ia" title={item.title} icon={item.icon} onVoltar={onVoltar}>
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
        Um agente treinado com as respostas do seu negócio, rodando dentro do seu próprio número
        de WhatsApp: atendimento de dúvidas, auto agendamento e contratação do serviço, do
        primeiro oi até o fechamento.
      </p>

      {/* mobile primeiro: lista empilhada em cima, chat embaixo; a partir de
          md os dois ficam lado a lado. A altura do chat e fixa (nao cresce
          com as mensagens), entao esta secao nunca muda de tamanho sozinha -
          e o que mantem o carrossel principal com altura travada. */}
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
        <div className="flex w-full flex-col gap-2 sm:w-[260px] sm:shrink-0">
          {MODELOS.map(({ icon: Icon, titulo, descricao }, i) => (
            <button
              key={titulo}
              type="button"
              aria-pressed={conversaAtiva === i}
              onClick={() => setConversaAtiva(i)}
              className={cn(
                "flex items-start gap-3 rounded-xl p-2.5 text-left transition-colors duration-500 hover:bg-brand-soft/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
                conversaAtiva === i && "bg-brand-soft/50",
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-text">
                <Icon className="size-4" weight="bold" />
              </span>
              <div>
                <h4 className="text-sm font-medium tracking-tight">{titulo}</h4>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{descricao}</p>
              </div>
            </button>
          ))}
        </div>

        <div
          className="h-[340px] w-full sm:w-[260px] sm:shrink-0"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onFocus={() => setPausado(true)}
          onBlur={() => setPausado(false)}
        >
          <WhatsAppShowcase ativa={conversaAtiva} onSelecionar={setConversaAtiva} />
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <WhatsAppButton message="Olá, Jorge! Vi a página sobre o agente de IA e quero saber mais." />
      </div>
    </ServicePanelShell>
  );
}
