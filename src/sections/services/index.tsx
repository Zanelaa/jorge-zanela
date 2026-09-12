import type { ServicoFoco } from "@/data/services";
import { ServicePager } from "./service-pager";

interface ServicesProps {
  /** pedido de navegacao vindo do menu do header */
  foco?: ServicoFoco | null;
}

export function Services({ foco }: ServicesProps) {
  return (
    <section id="servicos" className="relative py-24 sm:py-32">
      {/* Funde a queda do fluido do hero com o fundo desta secao: nasce
          transparente ainda dentro do hero, fica solida bem na costura
          (escondendo o corte do canvas) e se dissolve ate a metade da
          proxima tela, entao a separacao entre as duas fica imperceptivel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -z-0"
        style={{
          top: "-38vh",
          height: "88vh",
          background:
            "linear-gradient(to bottom, transparent 0%, var(--background) 43%, var(--background) 55%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl">
          O que eu construo
        </h2>
        <p className="mt-5 max-w-[56ch] leading-relaxed text-muted-foreground">
          Clique num card pra ele crescer até virar a página do serviço. Cada entrega termina no
          mesmo lugar: um cliente conversando com você no WhatsApp.
        </p>

        <ServicePager foco={foco} />
      </div>
    </section>
  );
}
