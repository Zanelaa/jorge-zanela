import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CaretLeftIcon, CaretRightIcon, SquaresFourIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { SERVICOS, type ServicoFoco, type ServicoId } from "@/data/services";
import { cardLayoutId } from "./layout-ids";
import { ServiceCard } from "./service-card";
import { AgenteIADetalhe } from "./details/agente-ia-detalhe";
import { AutomacaoDetalhe } from "./details/automacao-detalhe";
import { LandingPageDetalhe } from "./details/landing-page-detalhe";
import { SistemasDetalhe } from "./details/sistemas-detalhe";

// aba 0 = grade com os 4 cards; abas 1-4 = detalhe de cada servico, na
// mesma ordem de SERVICOS. As 5 abas juntas sao os "5 slides" da secao.
const IDS: ServicoId[] = SERVICOS.map((s) => s.id);
const SPRING = { type: "spring", stiffness: 230, damping: 28, mass: 1 } as const;
const NAV_INDICATOR_ID = "servico-nav-indicador";

function DetalheDoServico({ id, onVoltar }: { id: ServicoId; onVoltar: () => void }) {
  switch (id) {
    case "landing-page":
      return <LandingPageDetalhe onVoltar={onVoltar} />;
    case "agente-ia":
      return <AgenteIADetalhe onVoltar={onVoltar} />;
    case "automacao":
      return <AutomacaoDetalhe onVoltar={onVoltar} />;
    case "sistemas":
      return <SistemasDetalhe onVoltar={onVoltar} />;
  }
}

interface ServicePagerProps {
  /** pedido de navegacao vindo do menu do header */
  foco?: ServicoFoco | null;
}

export function ServicePager({ foco }: ServicePagerProps) {
  const reduce = useReducedMotion();
  const [aba, setAba] = useState(0);
  // qual servico deu origem a transicao atual, se houver. E o que faz o
  // card "virar" o painel (mesmo layoutId) em vez de so trocar de aba.
  const [origemCard, setOrigemCard] = useState<ServicoId | null>(null);
  // pulo sem animacao propria da trilha: usado quando quem esta animando
  // de verdade e o card crescendo (ou encolhendo), nao a troca de aba.
  const [semAnimarTrilha, setSemAnimarTrilha] = useState(false);
  const painelRef = useRef<HTMLDivElement>(null);

  // clique num card: a trilha desliza (mesmo SPRING da navegacao por
  // abas/setas) enquanto o card cresce (layoutId) ate virar o painel - as
  // duas animacoes rodam juntas e "conduzem" o usuario ate o slide certo.
  const abrirCard = useCallback(
    (id: ServicoId) => {
      setOrigemCard(id);
      setSemAnimarTrilha(!!reduce);
      setAba(IDS.indexOf(id) + 1);
    },
    [reduce],
  );

  // "voltar" do painel pra grade: mantem a mesma origem, entao o painel
  // encolhe de volta pro card exato de onde ele nasceu (efeito simetrico),
  // com a trilha deslizando de volta junto.
  const voltarPraGrade = useCallback(() => {
    setSemAnimarTrilha(!!reduce);
    setAba(0);
  }, [reduce]);

  // navegacao "seca" (abas/setas/header): sem card de origem, entao vira
  // um deslize comum entre as abas, sem tentar crescer nada.
  const irParaAba = useCallback(
    (indice: number) => {
      const alvo = Math.min(Math.max(indice, 0), IDS.length);
      setOrigemCard(null);
      setSemAnimarTrilha(!!reduce);
      setAba(alvo);
    },
    [reduce],
  );

  useEffect(() => {
    if (!foco) return;
    document.getElementById("servicos")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    irParaAba(IDS.indexOf(foco.id) + 1);
  }, [foco, irParaAba, reduce]);

  // leitor de tela: manda o foco pro painel quando uma aba de detalhe abre
  useEffect(() => {
    if (aba > 0) painelRef.current?.focus();
  }, [aba]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") irParaAba(aba + 1);
    if (e.key === "ArrowLeft") irParaAba(aba - 1);
  };

  return (
    <div className="relative mt-12">
      {/* halo de destaque atras do painel: acende quando um slide de detalhe
          abre, reforcando visualmente pra onde a atencao foi (o "spotlight"
          da transicao grade -> detalhe). */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 rounded-[3rem] blur-3xl sm:-inset-x-16"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 16%, transparent), transparent 70%)",
        }}
        initial={false}
        animate={{ opacity: aba === 0 ? 0 : 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
      />

      <div
        className="overflow-hidden rounded-lg"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Serviços - use as setas do teclado pra navegar"
      >
        <motion.div
          className="flex items-stretch"
          animate={{ x: `-${aba * 100}%` }}
          transition={semAnimarTrilha ? { duration: 0 } : SPRING}
        >
          {/* aba 0: grade com os 4 cards. As 5 abas ficam sempre montadas
              (e o que permite a trilha deslizar entre elas), entao as que
              nao estao ativas viram `inert`: fora da leitura de tela e da
              ordem de Tab, senao os 4 botoes "Voltar" (um por aba) ficariam
              todos alcancaveis por teclado ao mesmo tempo. */}
          <div
            className="flex h-[1080px] w-full shrink-0 flex-col justify-center overflow-y-auto sm:h-[660px]"
            inert={aba !== 0}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {SERVICOS.map((item) => {
                const escondido = origemCard === item.id && aba !== 0;
                return (
                  <div key={item.id} className={cn("h-52 sm:h-56", escondido && "invisible")}>
                    {!escondido && <ServiceCard item={item} onOpen={() => abrirCard(item.id)} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* abas 1-4: detalhe de cada servico */}
          {SERVICOS.map((item, i) => {
            const nasceuDoCard = origemCard === item.id;
            return (
              <div key={item.id} className="h-[1080px] w-full shrink-0 overflow-y-auto sm:h-[660px]" inert={aba !== i + 1}>
                <motion.div
                  ref={nasceuDoCard ? painelRef : undefined}
                  tabIndex={-1}
                  layout={nasceuDoCard}
                  layoutId={nasceuDoCard ? cardLayoutId(item.id) : undefined}
                  transition={SPRING}
                  className="h-full rounded-2xl border border-border/80 bg-background p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-28px_rgba(0,0,0,0.4)] focus:outline-none sm:p-8"
                >
                  {/* o conteudo entra desfocado e ganha nitidez conforme o
                      card termina de crescer - e o "borra as bordas" pedido,
                      sem misturar com a animacao de layout do container. */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.97, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: nasceuDoCard ? 0.16 : 0 }}
                    className="h-full"
                  >
                    <DetalheDoServico id={item.id} onVoltar={voltarPraGrade} />
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 px-1 sm:gap-3">
        <div
          className="flex gap-1 rounded-full border border-border bg-secondary/40 p-1 sm:gap-1.5 sm:p-1.5"
          role="tablist"
          aria-label="Slides de serviços"
        >
          <button
            type="button"
            role="tab"
            aria-selected={aba === 0}
            aria-label="Ver todos os serviços"
            onClick={() => irParaAba(0)}
            className="relative grid size-9 place-items-center rounded-full text-muted-foreground transition-colors"
          >
            {aba === 0 && (
              <motion.span
                layoutId={NAV_INDICATOR_ID}
                className="absolute inset-0 rounded-full bg-brand"
                transition={semAnimarTrilha ? { duration: 0 } : SPRING}
              />
            )}
            <SquaresFourIcon
              className={cn("relative size-4 transition-colors", aba === 0 && "text-brand-foreground")}
              weight="bold"
            />
          </button>
          {SERVICOS.map((item, i) => {
            const Icon = item.icon;
            const ativo = aba === i + 1;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={ativo}
                aria-label={`Ver ${item.title}`}
                onClick={() => irParaAba(i + 1)}
                className="relative grid size-9 place-items-center rounded-full text-muted-foreground transition-colors"
              >
                {ativo && (
                  <motion.span
                    layoutId={NAV_INDICATOR_ID}
                    className="absolute inset-0 rounded-full bg-brand"
                    transition={semAnimarTrilha ? { duration: 0 } : SPRING}
                  />
                )}
                <Icon className={cn("relative size-4 transition-colors", ativo && "text-brand-foreground")} weight="bold" />
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Slide anterior"
            disabled={aba <= 0}
            onClick={() => irParaAba(aba - 1)}
            className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-brand/50 hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
          >
            <CaretLeftIcon className="size-4" weight="bold" />
          </button>
          <button
            type="button"
            aria-label="Próximo slide"
            disabled={aba >= IDS.length}
            onClick={() => irParaAba(aba + 1)}
            className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-brand/50 hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
          >
            <CaretRightIcon className="size-4" weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
