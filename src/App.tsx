import { useState } from "react";
import { MotionConfig } from "motion/react";

import type { ServicoFoco, ServicoId } from "@/data/services";
import { About } from "@/sections/about";
import { Contact } from "@/sections/contact";
import { Experience } from "@/sections/experience";
import { FloatingDock } from "@/sections/floating-dock";
import { Hero } from "@/sections/hero";
import { Process } from "@/sections/process";
import { Services } from "@/sections/services";
import { SiteFooter } from "@/sections/site-footer";
import { SiteHeader } from "@/sections/site-header";

export default function App() {
  // vive aqui (acima dos dois) pro menu do header conseguir mandar o
  // carrossel de servicos pro card certo.
  const [foco, setFoco] = useState<ServicoFoco | null>(null);
  const irParaServico = (id: ServicoId) => setFoco({ id, nonce: Date.now() });

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader onSelectServico={irParaServico} />
      <main>
        <Hero />
        <Services foco={foco} />
        <Process />
        <Experience />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingDock />
    </MotionConfig>
  );
}
