import { BankIcon, CreditCardIcon, ReceiptIcon, ShoppingCartIcon, type Icon } from "@phosphor-icons/react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { SERVICOS } from "@/data/services";
import { ServicePanelShell } from "../service-panel-shell";

interface Setor {
  icon: Icon;
  nome: string;
  itens: string[];
}

// os setores que ja tem solucao pronta - a ideia e o visitante bater o olho
// e reconhecer o proprio setor antes de ler qualquer detalhe.
const SETORES: Setor[] = [
  {
    icon: ReceiptIcon,
    nome: "Fiscal",
    itens: [
      "Gerenciamento de notas SEFAZ",
      "Medição de contrato proativa",
      "Gerenciamento de certificado digital",
    ],
  },
  {
    icon: ShoppingCartIcon,
    nome: "Compras",
    itens: ["Controle de contratos", "Vinculação de compras vs. notas"],
  },
  {
    icon: BankIcon,
    nome: "Tesouraria",
    itens: ["Monitoramento de extratos", "Lançamento de movimentações bancárias"],
  },
  {
    icon: CreditCardIcon,
    nome: "Contas a pagar",
    itens: ["Geração de borderôs", "Organização de pagamentos futuros"],
  },
];

const item = SERVICOS.find((s) => s.id === "sistemas")!;

export function SistemasDetalhe({ onVoltar }: { onVoltar: () => void }) {
  return (
    <ServicePanelShell id="sistemas" title={item.title} icon={item.icon} onVoltar={onVoltar}>
      <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground md:text-lg">
        Painel interno, integração com ERP ou API bancária: sistemas desenhados em cima do jeito
        que sua operação já funciona, não o contrário.
      </p>

      {/* mobile primeiro: um setor por linha; a partir de sm vira 2x2 pra
          caber inteiro na altura travada do carrossel, sem scroll. */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {SETORES.map(({ icon: Icon, nome, itens }) => (
          <div key={nome} className="rounded-xl border border-border p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-text">
                <Icon className="size-4" weight="bold" />
              </span>
              <h4 className="text-sm font-medium tracking-tight">{nome}</h4>
            </div>

            <ul className="mt-3 space-y-1.5">
              {itens.map((texto) => (
                <li key={texto} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <WhatsAppButton message="Olá, Jorge! Vi a página sobre sistemas e integrações e quero saber mais." />
      </div>
    </ServicePanelShell>
  );
}
