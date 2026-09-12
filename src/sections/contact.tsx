import { useId, useMemo, useRef, useState, type FormEvent } from "react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";

import { pillBase, pillPrimary } from "@/components/whatsapp-button";
import { CTA_LABEL, SITE, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

const INTERESSES = ["Landing page", "Agente de IA", "Automação", "Sistema sob medida", "Ainda não sei"];

const campo =
  "h-11 w-full rounded-md border border-border bg-background px-3 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

function montarMensagem(nome: string, negocio: string, interesses: string[], detalhe: string) {
  const partes = [`Olá, Jorge! Sou ${nome.trim()}${negocio.trim() ? `, do ${negocio.trim()}` : ""}.`];
  if (interesses.length) partes.push(`Tenho interesse em: ${interesses.join(", ")}.`);
  if (detalhe.trim()) partes.push(detalhe.trim());
  return partes.join(" ");
}

export function Contact() {
  const id = useId();
  const nomeRef = useRef<HTMLInputElement>(null);
  const [nome, setNome] = useState("");
  const [negocio, setNegocio] = useState("");
  const [interesses, setInteresses] = useState<string[]>([]);
  const [detalhe, setDetalhe] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const mensagem = useMemo(
    () => montarMensagem(nome || "(seu nome)", negocio, interesses, detalhe),
    [nome, negocio, interesses, detalhe],
  );

  const alternar = (item: string) =>
    setInteresses((atual) =>
      atual.includes(item) ? atual.filter((i) => i !== item) : [...atual, item],
    );

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setErro("Me diz seu nome pra eu saber com quem estou falando.");
      nomeRef.current?.focus();
      return;
    }
    setErro(null);
    window.open(whatsappLink(montarMensagem(nome, negocio, interesses, detalhe)), "_blank", "noopener");
  };

  return (
    <section id="contato" className="border-t border-border bg-secondary/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="font-mono text-[13px] text-muted-foreground">Contato</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-tighter sm:text-5xl">
            Me conta o que você precisa
          </h2>
          <p className="mt-5 max-w-[46ch] leading-relaxed text-muted-foreground">
            Preencha o básico e a conversa abre no WhatsApp com tudo escrito. Quem responde sou eu.
          </p>

          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">WhatsApp</dt>
              <dd className="mt-0.5 text-base font-medium">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-brand-text">
                  {SITE.whatsappDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">E-mail</dt>
              <dd className="mt-0.5 text-base font-medium">
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-brand-text">
                  {SITE.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={enviar}
          noValidate
          className="rounded-lg border border-border bg-background p-6 shadow-[0_24px_60px_-40px_rgba(24,24,27,0.35)] sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor={`${id}-nome`} className="text-sm font-medium">
                Seu nome
              </label>
              <input
                ref={nomeRef}
                id={`${id}-nome`}
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (erro) setErro(null);
                }}
                autoComplete="given-name"
                aria-invalid={!!erro}
                aria-describedby={erro ? `${id}-erro` : undefined}
                className={cn(campo, erro && "border-red-500 focus-visible:ring-red-500/30")}
              />
              {erro && (
                <p id={`${id}-erro`} className="text-sm text-red-600 dark:text-red-400">
                  {erro}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor={`${id}-negocio`} className="text-sm font-medium">
                Nome do negócio
              </label>
              <input
                id={`${id}-negocio`}
                value={negocio}
                onChange={(e) => setNegocio(e.target.value)}
                autoComplete="organization"
                className={campo}
              />
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">O que te interessa</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {INTERESSES.map((item) => {
                const ativo = interesses.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => alternar(item)}
                    className={cn(
                      "h-9 rounded-full border px-3.5 text-sm transition-colors active:scale-[0.98]",
                      ativo
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-background hover:bg-secondary",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-2">
            <label htmlFor={`${id}-detalhe`} className="text-sm font-medium">
              Quer adiantar algum detalhe?
            </label>
            <textarea
              id={`${id}-detalhe`}
              value={detalhe}
              onChange={(e) => setDetalhe(e.target.value)}
              rows={3}
              placeholder="Ex.: tenho uma clínica e perco cliente por demorar a responder"
              className={cn(campo, "h-auto resize-none py-2.5 leading-relaxed")}
            />
          </div>

          <div className="mt-6 rounded-md bg-secondary px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground">Mensagem que vai abrir no WhatsApp</p>
            <p className="mt-1 text-sm leading-relaxed">{mensagem}</p>
          </div>

          <button type="submit" className={cn(pillBase, pillPrimary, "mt-6 h-12 w-full px-6 text-[15px] sm:w-auto")}>
            <WhatsappLogoIcon weight="fill" className="size-5" />
            {CTA_LABEL}
          </button>
        </form>
      </div>
    </section>
  );
}
