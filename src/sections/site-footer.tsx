import { SITE } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-32 pt-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-foreground">{SITE.fullName}</p>
          <p className="mt-1">{SITE.role}, {SITE.city}</p>
        </div>
        <nav aria-label="Redes" className="flex gap-6">
          <a href={`mailto:${SITE.email}`} className="hover:text-foreground">
            E-mail
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            LinkedIn
          </a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            GitHub
          </a>
        </nav>
        <p>© {new Date().getFullYear()} {SITE.fullName}</p>
      </div>
    </footer>
  );
}
