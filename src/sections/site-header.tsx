import { useState } from "react";
import { RoadHorizonIcon, StackIcon } from "@phosphor-icons/react";

import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
  motionNavigationMenuTriggerStyle,
} from "@/components/unlumen-ui/motion-navigation-menu";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SERVICOS, type ServicoId } from "@/data/services";
import { cn } from "@/lib/utils";

const TRABALHO = [
  { icon: RoadHorizonIcon, title: "Como funciona", desc: "Do primeiro contato até o site no ar", href: "#processo" },
  { icon: StackIcon, title: "Experiência", desc: "Onde já coloquei automação pra rodar", href: "#experiencia" },
];

interface SiteHeaderProps {
  /** o menu usa os mesmos dados do carrossel (data/services.ts), entao
   * clicar num serviço aqui manda o carrossel pro card certo em vez de só
   * rolar até o topo da seção. */
  onSelectServico: (id: ServicoId) => void;
}

export function SiteHeader({ onSelectServico }: SiteHeaderProps) {
  // controla o menu por fora pra poder fechar o dropdown ao escolher um
  // item - sem isso ele fica flutuando aberto por cima da pagina depois
  // do clique (e chega a bloquear clique em quem estiver embaixo dele).
  const [menuAberto, setMenuAberto] = useState("");

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#topo" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-[13px] font-bold text-brand-foreground">
            JZ
          </span>
          <span className="hidden sm:inline">Jorge Zanela</span>
        </a>

        <MotionNavigationMenu className="hidden md:flex" value={menuAberto} onValueChange={setMenuAberto}>
          <MotionNavigationMenuList>
            <MotionNavigationMenuItem value="servicos">
              <MotionNavigationMenuTrigger>Serviços</MotionNavigationMenuTrigger>
              <MotionNavigationMenuContent innerClassName="grid w-[460px] grid-cols-2 gap-1">
                {SERVICOS.map(({ id, icon: Icon, navLabel, navDescription }) => (
                  <MotionNavigationMenuLink
                    key={id}
                    href="#servicos"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectServico(id);
                      setMenuAberto("");
                    }}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Icon className="size-4 text-brand-text" />
                      {navLabel}
                    </span>
                    <span className="text-[13px] leading-snug text-muted-foreground">{navDescription}</span>
                  </MotionNavigationMenuLink>
                ))}
              </MotionNavigationMenuContent>
            </MotionNavigationMenuItem>

            <MotionNavigationMenuItem value="trabalho">
              <MotionNavigationMenuTrigger>Trabalho</MotionNavigationMenuTrigger>
              <MotionNavigationMenuContent innerClassName="grid w-[300px] gap-1">
                {TRABALHO.map(({ icon: Icon, title, desc, href }) => (
                  <MotionNavigationMenuLink key={title} href={href} onClick={() => setMenuAberto("")}>
                    <span className="flex items-center gap-2 font-medium">
                      <Icon className="size-4 text-brand-text" />
                      {title}
                    </span>
                    <span className="text-[13px] leading-snug text-muted-foreground">{desc}</span>
                  </MotionNavigationMenuLink>
                ))}
              </MotionNavigationMenuContent>
            </MotionNavigationMenuItem>

            <MotionNavigationMenuItem>
              <MotionNavigationMenuLink
                href="#sobre"
                onClick={() => setMenuAberto("")}
                className={cn(motionNavigationMenuTriggerStyle(), "flex-row")}
              >
                Sobre
              </MotionNavigationMenuLink>
            </MotionNavigationMenuItem>
          </MotionNavigationMenuList>
        </MotionNavigationMenu>

        <WhatsAppButton size="sm" />
      </div>
    </header>
  );
}
