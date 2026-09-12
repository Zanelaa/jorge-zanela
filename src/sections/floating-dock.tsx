import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  HouseIcon,
  LinkedinLogoIcon,
  MoonIcon,
  SquaresFourIcon,
  SunIcon,
  UserIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

import { Dock, type DockItem } from "@/components/unlumen-ui/dock";
import { CTA_LABEL, SITE, whatsappLink } from "@/config/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/hooks/use-theme";

export function FloatingDock() {
  const { dark, toggle } = useTheme();
  const compacto = useMediaQuery("(max-width: 480px)");

  const items: DockItem[] = [
    { icon: <HouseIcon />, label: "Início", href: "#topo" },
    { icon: <SquaresFourIcon />, label: "Serviços", href: "#servicos" },
    { icon: <UserIcon />, label: "Sobre", href: "#sobre", separator: true },
    { icon: <WhatsappLogoIcon weight="fill" />, label: CTA_LABEL, href: whatsappLink(), external: true },
    { icon: <LinkedinLogoIcon />, label: "LinkedIn", href: SITE.linkedin, external: true },
    { icon: <GithubLogoIcon />, label: "GitHub", href: SITE.github, external: true },
    { icon: <EnvelopeSimpleIcon />, label: "E-mail", href: `mailto:${SITE.email}`, separator: true },
    {
      icon: dark ? <SunIcon /> : <MoonIcon />,
      label: dark ? "Tema claro" : "Tema escuro",
      onClick: toggle,
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
      <Dock
        items={items}
        iconSize={compacto ? 32 : 40}
        magnification={compacto ? 1 : 1.7}
        className="pointer-events-auto"
      />
    </div>
  );
}
