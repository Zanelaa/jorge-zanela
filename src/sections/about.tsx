const STACK = [
  "PHP",
  "Laravel",
  "Python",
  "FastAPI",
  "TypeScript",
  "React",
  "C#",
  "PostgreSQL",
  "MySQL",
  "Oracle",
  "Docker",
  "Playwright",
  "Selenium",
  "APIs REST",
  "Agentes de IA",
];

const FATOS = [
  { titulo: "Python, PHP, TypeScript e C#", texto: "linguagens do dia a dia" },
  { titulo: "PostgreSQL, MySQL e Oracle", texto: "bancos que já sustentei em produção" },
  { titulo: "Playwright e Selenium", texto: "robôs que operam sistemas por você" },
  { titulo: "Agentes de IA", texto: "engenharia de prompt aplicada a processos reais" },
];

export function About() {
  return (
    <section id="sobre" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 md:grid-cols-[1.15fr_1fr] md:gap-20">
        <div>
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl">
            Quem vai construir
          </h2>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
            Sou o Jorge, técnico em TI pelo Instituto Federal Catarinense e trabalho com automação
            desde 2023. Hoje cuido de integrações fiscais e bancárias de um grupo empresarial e, por
            fora, ajudo negócios de Joinville a vender mais pela internet.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:self-end">
          {FATOS.map((f) => (
            <div key={f.titulo}>
              <dt className="font-medium tracking-tight">{f.titulo}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.texto}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* unica faixa em movimento da pagina: mostra amplitude sem virar lista */}
      <div className="mt-20 flex select-none [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        {[0, 1].map((copia) => (
          <ul
            key={copia}
            aria-hidden={copia === 1}
            className="flex shrink-0 animate-marquee items-center gap-12 pr-12"
          >
            {STACK.map((s, i) => (
              <li
                key={s}
                className={
                  "whitespace-nowrap text-4xl font-semibold tracking-tighter sm:text-6xl " +
                  (i % 3 === 1 ? "text-brand-text" : "text-foreground/15")
                }
              >
                {s}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
