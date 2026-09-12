import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

interface Mensagem {
  de: "cliente" | "agente";
  texto: string;
}

export interface ConversaDemo {
  mensagens: Mensagem[];
}

// as 3 conversas, na mesma ordem dos 3 modelos de entrega (duvidas, agenda,
// contratacao) - e o que permite destacar a coluna correspondente enquanto
// cada uma toca.
export const CONVERSAS_DEMO: ConversaDemo[] = [
  {
    mensagens: [
      { de: "cliente", texto: "Qual é o horário de atendimento?" },
      {
        de: "agente",
        texto:
          "Olá! Nosso horário de atendimento é de segunda a sexta, das 8h às 18h.\nPosso ajudar em mais alguma coisa?",
      },
      { de: "cliente", texto: "Sim, vocês atendem também aos sábados?" },
      {
        de: "agente",
        texto: "Sim! Aos sábados atendemos das 8h às 12h. Qualquer outra dúvida, estou por aqui! 😊",
      },
    ],
  },
  {
    mensagens: [
      { de: "cliente", texto: "Gostaria de agendar um horário." },
      {
        de: "agente",
        texto: "Claro! Para amanhã temos esses horários:\n\n• 09:00\n• 11:00\n• 14:00\n• 16:30\n\nQual horário prefere?",
      },
      { de: "cliente", texto: "Quero o das 14:00, por favor." },
      { de: "agente", texto: "Perfeito! Seu agendamento foi confirmado para amanhã, às 14:00." },
    ],
  },
  {
    mensagens: [
      { de: "cliente", texto: "Quero seguir com a contratação." },
      {
        de: "agente",
        texto: "Perfeito! Para formalizar, preciso de alguns dados:\n\n• Nome completo\n• E-mail\n• Telefone\n• Dados do serviço",
      },
      { de: "cliente", texto: "Já te envio." },
      { de: "agente", texto: "Fico no aguardo para seguirmos." },
    ],
  },
];

const GAP_MS = 1000;
const DIGITANDO_MS = 850;

function PontosDigitando() {
  return (
    <span className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground/70"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

interface WhatsAppShowcaseProps {
  ativa: number;
  onSelecionar: (indice: number) => void;
}

export function WhatsAppShowcase({ ativa, onSelecionar }: WhatsAppShowcaseProps) {
  const reduce = useReducedMotion();
  const conversa = CONVERSAS_DEMO[ativa];
  const [visiveis, setVisiveis] = useState(0);
  const [digitando, setDigitando] = useState(false);

  useEffect(() => {
    if (reduce) {
      setVisiveis(conversa.mensagens.length);
      setDigitando(false);
      return;
    }

    setVisiveis(0);
    setDigitando(false);
    const timers: number[] = [];
    let acumulado = 500;

    conversa.mensagens.forEach((msg, i) => {
      if (msg.de === "agente") {
        timers.push(window.setTimeout(() => setDigitando(true), acumulado));
        acumulado += DIGITANDO_MS;
      }
      timers.push(
        window.setTimeout(() => {
          setDigitando(false);
          setVisiveis(i + 1);
        }, acumulado),
      );
      acumulado += GAP_MS;
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [ativa, conversa, reduce]);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-28px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-brand-text">
          <WhatsappLogoIcon className="size-4" weight="fill" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-medium">Agente de IA</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            online
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-4">
        {conversa.mensagens.slice(0, visiveis).map((msg, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
              msg.de === "cliente"
                ? "self-end rounded-br-sm bg-brand text-brand-foreground"
                : "self-start rounded-bl-sm bg-secondary text-foreground",
            )}
          >
            {msg.texto}
          </motion.div>
        ))}

        {digitando && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="self-start rounded-2xl rounded-bl-sm bg-secondary px-2 py-1.5"
          >
            <PontosDigitando />
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1.5 border-t border-border py-2.5">
        {CONVERSAS_DEMO.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ver conversa ${i + 1}`}
            aria-current={ativa === i}
            onClick={() => onSelecionar(i)}
            className="p-1"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full bg-muted-foreground/30 transition-[width,background-color] duration-300",
                ativa === i ? "w-5 bg-brand" : "w-1.5",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
