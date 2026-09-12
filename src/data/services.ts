import type { Icon } from "@phosphor-icons/react";
import {
  BrowserIcon,
  ChatsCircleIcon,
  GearSixIcon,
  PlugsConnectedIcon,
} from "@phosphor-icons/react";

// Metadados dos 4 serviços: o que aparece no card do carrossel. O conteúdo
// completo de cada um (o que abre ao clicar) mora em cada arquivo separado
// dentro de sections/services/details/ - o Jorge edita cada um sem mexer
// aqui.
export type ServicoId = "landing-page" | "agente-ia" | "automacao" | "sistemas";

// Pedido de navegacao pro carrossel vindo de fora dele (o menu do header).
// nonce muda a cada clique, mesmo pro mesmo id, pra sempre disparar de novo.
export interface ServicoFoco {
  id: ServicoId;
  nonce: number;
}

export interface ServicoResumo {
  id: ServicoId;
  icon: Icon;
  /** titulo cheio, usado no card do carrossel */
  title: string;
  /** versao curta do titulo, usada no menu do header (espaço é apertado) */
  navLabel: string;
  /** uma frase pra o menu do header, mais enxuta que a description do card */
  navDescription: string;
  description: string;
  price: string;
  badgeLabel?: string;
  badgeVariant?: "success" | "warning";
}

export const SERVICOS: ServicoResumo[] = [
  {
    id: "landing-page",
    icon: BrowserIcon,
    title: "Landing page que vira conversa",
    navLabel: "Landing page",
    navDescription: "Página rápida que leva direto pro WhatsApp",
    description: "Uma página rápida no celular, feita pra levar o visitante direto pro seu WhatsApp.",
    price: "Site",
    badgeLabel: "Mobile",
    badgeVariant: "success",
  },
  {
    id: "agente-ia",
    icon: ChatsCircleIcon,
    title: "Agente de IA no WhatsApp",
    navLabel: "Agente de IA",
    navDescription: "Atendimento no WhatsApp a qualquer hora",
    description: "Responde preço, horário e agenda enquanto você atende quem está na cadeira.",
    price: "WhatsApp",
    badgeLabel: "24h",
    badgeVariant: "success",
  },
  {
    id: "automacao",
    icon: GearSixIcon,
    title: "Automação de rotina",
    navLabel: "Automação",
    navDescription: "Rotinas repetitivas rodando sozinhas",
    description: "Planilhas, notas fiscais, conciliação e relatórios rodando sozinhos, com Python e RPA.",
    price: "RPA",
  },
  {
    id: "sistemas",
    icon: PlugsConnectedIcon,
    title: "Sistemas e integrações",
    navLabel: "Integrações",
    navDescription: "Sistemas, ERP e APIs de banco conversando",
    description:
      "Painel interno, API de banco e integração com ERP, desenhados em cima do jeito que sua operação já funciona.",
    price: "Sob medida",
    badgeLabel: "Laravel",
    badgeVariant: "warning",
  },
];
