import type { ServicoId } from "@/data/services";

// O id que o Motion usa pra reconhecer que o card do carrossel e o painel
// de detalhe sao "o mesmo elemento" e animar a transformacao de um pro
// outro (shared layout animation), em vez de so cortar de um pro outro.
export function cardLayoutId(id: ServicoId) {
  return `servico-card-${id}`;
}
