import { WhatsAppButton } from "@/components/whatsapp-button";
import { SERVICOS } from "@/data/services";
import { ServicePanelShell } from "../service-panel-shell";

const STACK = ["Laravel", "PostgreSQL", "MySQL", "Oracle", "APIs REST", "Docker"];

const item = SERVICOS.find((s) => s.id === "sistemas")!;

export function SistemasDetalhe({ onVoltar }: { onVoltar: () => void }) {
  return (
    <ServicePanelShell id="sistemas" title={item.title} icon={item.icon} onVoltar={onVoltar}>
      <p className="max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
        Painel interno, integração com ERP ou API bancária: sistemas desenhados em cima do jeito
        que sua operação já funciona, não o contrário.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {STACK.map((s) => (
          <span key={s} className="rounded-full border border-border px-3 py-1 text-sm">
            {s}
          </span>
        ))}
      </div>

      {/* TODO(Jorge): trocar por um case real (sistema, problema, resultado) */}
      <div className="mt-8 rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
        Espaço reservado pra um case real: qual sistema, qual problema resolveu, qual resultado.
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <WhatsAppButton message="Olá, Jorge! Vi a página sobre sistemas e integrações e quero saber mais." />
      </div>
    </ServicePanelShell>
  );
}
