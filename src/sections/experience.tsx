import { HoverExpand, type HoverExpandItem } from "@/components/unlumen-ui/hover-expand";

// Fotos de ambiente (Picsum, em P&B) ate existirem fotos reais dos projetos.
// Troque por arquivos em public/img mantendo proporcao larga (~16:7).
const foto = (seed: string) => `https://picsum.photos/seed/${seed}/1600/700?grayscale`;

const ITENS: HoverExpandItem[] = [
  {
    label: "Esteira fiscal de ponta a ponta",
    sublabel: "Grupo H+ Brasil",
    description: "Da captura da NF-e ao lançamento no ERP, em Laravel",
    image: foto("jz-esteira-fiscal"),
    imageAlt: "Mesa de trabalho com documentos",
  },
  {
    label: "Integração com APIs bancárias",
    sublabel: "Grupo H+ Brasil",
    description: "Bradesco, Santander e Banco do Brasil, com alerta de certificado vencendo",
    image: foto("jz-apis-bancarias"),
    imageAlt: "Fachada de prédio corporativo",
  },
  {
    label: "Robôs de tesouraria e contas a pagar",
    sublabel: "Python",
    description: "FastAPI, Playwright e Selenium tirando trabalho manual do financeiro",
    image: foto("jz-rpa-tesouraria"),
    imageAlt: "Tela de computador em escritório",
  },
  {
    label: "Automação com IA em processos críticos",
    sublabel: "Roboteasy",
    description: "Financeiro, logística e ERP com inteligência artificial no fluxo",
    image: foto("jz-automacao-ia"),
    imageAlt: "Galpão de logística",
  },
  {
    label: "Mapa de negócios com dados abertos",
    sublabel: "Projeto próprio",
    description: "Receita Federal, Google Maps e Meta cruzados num banco local",
    image: foto("jz-mapa-joinville"),
    imageAlt: "Vista aérea de cidade",
  },
];

export function Experience() {
  return (
    <section id="experiencia" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <p className="font-mono text-[13px] text-muted-foreground">Experiência</p>
        <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl">
          Automação que já roda em empresa grande
        </h2>
        <p className="mt-5 max-w-[58ch] leading-relaxed text-muted-foreground">
          O mesmo cuidado que aplico em integrações fiscais e bancárias, no tamanho certo pro seu
          negócio.
        </p>

        <HoverExpand className="mt-14" items={ITENS} collapsedHeight={76} expandedHeight={300} />
      </div>
    </section>
  );
}
