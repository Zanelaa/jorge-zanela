import { WhatsappLogoIcon } from "@phosphor-icons/react";

import { CTA_LABEL, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

// Regra de forma do site: tudo que e clicavel e pilula (rounded-full),
// containers usam rounded-lg. Este e o unico CTA de contato da pagina.
export const pillBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,border-color] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const pillPrimary =
  "bg-brand text-brand-foreground shadow-[0_10px_30px_-12px_rgba(37,99,235,0.55)] hover:bg-[#1d4ed8]";

export const pillGhost =
  "border border-border bg-background/60 backdrop-blur hover:bg-secondary";

interface WhatsAppButtonProps {
  message?: string;
  size?: "sm" | "md";
  className?: string;
}

export function WhatsAppButton({ message, size = "md", className }: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        pillBase,
        pillPrimary,
        size === "sm" ? "h-9 px-4 text-sm" : "h-12 px-6 text-[15px]",
        className,
      )}
    >
      <WhatsappLogoIcon weight="fill" className={size === "sm" ? "size-4" : "size-5"} />
      {CTA_LABEL}
    </a>
  );
}
