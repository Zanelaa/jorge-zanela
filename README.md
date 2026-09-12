# jorge-zanela

Landing page pessoal do Jorge Zanela: landing pages, agentes de IA no WhatsApp e
automação para negócios de Joinville. Todo CTA leva pro WhatsApp.

Stack: Vite + React 19 + TypeScript + Tailwind v4 + Motion + Three.js + Phosphor Icons.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build em dist/
npm run preview    # serve o build
```

## Onde mexer

| O quê | Arquivo |
|---|---|
| Nome, WhatsApp, e-mail, redes | `src/config/site.ts` |
| Texto do botão de contato (único no site) | `CTA_LABEL` em `src/config/site.ts` |
| Cores e tema claro/escuro | tokens em `src/index.css` (`--brand`, `--background`...) |
| Seções da página | `src/sections/*.tsx`, ordem em `src/App.tsx` |
| Números do panorama | `src/sections/panorama.tsx` (vêm do workspace `prospeccao-leads`) |

## Componentes do unlumen-ui

Em `src/components/unlumen-ui/`, copiados de https://ui.unlumen.com:
`tilt-card`, `hover-expand`, `dock`, `motion-navigation-menu`, `pixel-liquid-bg`.

As primitivas que eles importam não vinham nos snippets e foram reimplementadas
com a mesma API em `src/components/unlumen-ui/primitives/`: `tilt`,
`clipped-circle` e `highlight`.

Adaptações feitas nos originais (todas comentadas no topo de cada arquivo):
- `motion-navigation-menu`: importa de `motion/react` (em vez de `framer-motion`)
  e usa `CaretDownIcon` do Phosphor (em vez de lucide), pra ficar com um pacote de
  animação e uma família de ícones só.
- `pixel-liquid-bg`: importa os tipos `ComponentProps`/`ReactNode` explicitamente.
- `dock`: prop opcional `external` pra abrir link em nova aba.
- `hover-expand`: toque abre/fecha a linha em celular (não existe hover no touch).
- `tilt-card`: nada. Atenção: o `className` vai pro elemento interno, então
  `col-span` precisa ficar num wrapper (veja `src/sections/services.tsx`).

## Imagens pendentes

- `public/img/landing-preview.jpg`: print do próprio hero, usado no card de
  landing page. Regerar quando o hero mudar.
- Experiência (`src/sections/experience.tsx`): fotos de ambiente do Picsum em P&B,
  sem relação com os projetos. Trocar por fotos reais em `public/img/`
  (proporção ~16:7).

## Deploy

É um site estático (`dist/`). Vercel, Netlify ou Cloudflare Pages servem direto:
build `npm run build`, pasta de saída `dist`.
