import { motion, useReducedMotion } from "motion/react";
import {
  ChatCircleTextIcon,
  FileTextIcon,
  HammerIcon,
  RocketLaunchIcon,
} from "@phosphor-icons/react";

const ETAPAS = [
  {
    icon: ChatCircleTextIcon,
    title: "Conversa",
    body: "Uma conversa rápida no WhatsApp pra entender seu negócio, seu cliente e onde a venda escapa hoje.",
  },
  {
    icon: FileTextIcon,
    title: "Proposta",
    body: "Escopo, prazo e valor por escrito antes de começar. Sem surpresa no meio do caminho.",
  },
  {
    icon: HammerIcon,
    title: "Construção",
    body: "Você acompanha cada etapa pelo próprio WhatsApp e aprova antes de qualquer coisa ir pro ar.",
  },
  {
    icon: RocketLaunchIcon,
    title: "No ar",
    body: "Publico, conecto ao seu Google e ao seu WhatsApp, e sigo por perto pros ajustes.",
  },
];

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="processo" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 md:grid-cols-[1fr_1.25fr] md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl">
            Do primeiro oi até o site no ar
          </h2>
          <p className="mt-5 max-w-[44ch] leading-relaxed text-muted-foreground">
            Você fala direto com quem escreve o código, do começo ao fim. Sem agência no meio.
          </p>
        </div>

        <ol className="relative border-l border-border">
          {ETAPAS.map(({ icon: Icon, title, body }, i) => (
            <motion.li
              key={title}
              className="relative pb-12 pl-10 last:pb-0"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute -left-[18px] top-0 grid size-9 place-items-center rounded-full border border-border bg-background text-brand-text">
                <Icon className="size-4" weight="bold" />
              </span>
              <h3 className="text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-2 max-w-[48ch] leading-relaxed text-muted-foreground">{body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
