import { CheckCircleIcon } from "@phosphor-icons/react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { SERVICOS } from "@/data/services";
import { ServicePanelShell } from "../service-panel-shell";

const INCLUSOS = [
  "Design mobile first: construído pro celular antes do desktop",
  "Texto focado em levar o visitante pro WhatsApp",
  "Site rápido: carrega antes do cliente desistir",
  "Formulário que já monta a mensagem pronta",
];

const item = SERVICOS.find((s) => s.id === "landing-page")!;

export function LandingPageDetalhe({ onVoltar }: { onVoltar: () => void }) {
  return (
    <ServicePanelShell id="landing-page" title={item.title} icon={item.icon} onVoltar={onVoltar}>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Uma página só sua, pensada pra converter visita em conversa. Sem menu confuso, sem
            informação demais: só o que o cliente precisa pra decidir e te chamar.
          </p>

          <ul className="mt-6 space-y-3">
            {INCLUSOS.map((texto) => (
              <li key={texto} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-brand-text" weight="fill" />
                {texto}
              </li>
            ))}
          </ul>
        </div>

        {/* TODO(Jorge): trocar pelo screenshot do ultimo projeto entregue */}
        <img
          src="/img/landing-preview.jpg"
          alt="Prévia de uma landing page feita por Jorge Zanela"
          className="w-full rounded-lg border border-border"
        />
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <WhatsAppButton message="Olá, Jorge! Vi a página sobre landing page e quero saber mais." />
      </div>
    </ServicePanelShell>
  );
}
