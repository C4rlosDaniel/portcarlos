# Portfólio — Carlos Daniel Alencar

## Visão geral
Site pessoal (portfólio) de Carlos Daniel: analista de sistemas e automação.
Live: https://portcarlos.vercel.app  ·  Repo: https://github.com/C4rlosDaniel/portcarlos (branch `main`)

Stack: Vite + React 19 + TypeScript · Tailwind CSS v4 · motion (animações) ·
i18next (pt-BR / en / fr) · react-router v7. Deploy estático na Vercel.

## Comandos
| Comando | Descrição |
| --- | --- |
| `npm run dev` | Dev server (Vite) |
| `npm run build` | `prebuild` (fetch-github + gen-seo + gen-knowledge) → `tsc -b` → `vite build` |
| `npm run preview` | Serve o `dist` localmente |
| `npm run lint` | ESLint (rodar após edições) |
| `npm run format` | Prettier (write) |
| `npm run knowledge` | Regenera `agent/knowledge.md` a partir de `src/data/*.ts` |
| `npm run shots` | Screenshots Playwright dos projetos |
| `npm run thumbs` | WebP + miniaturas (sharp) |

Ambiente: Windows + PowerShell 5.1. Evitar JSON/aspas inline em `node -e`;
preferir escrever arquivos `.mjs` temporários. Imports de `.ts` em scripts Node
funcionam nativamente (Node 24, type stripping), mas em Windows usar
`pathToFileURL()` ao passar caminhos absolutos para `import()`.

## Representante digital (agente de IA)
Duas peças em `agent/`, além do chat embutido no site:

- **`agent/system-prompt.md`** — prompt de sistema (34 seções) do representante
  digital de Carlos. Para uso com LLM externo: combinar com `agent/knowledge.md`.
  Não é interpretado pelo site; o comportamento equivalente está em
  `src/assistant/` (spec de comportamento).
- **`agent/knowledge.md`** — base de conhecimento **gerada** por
  `scripts/gen-knowledge.mjs` a partir de `src/data/*.ts`. Roda no `prebuild`
  e é commitada. **Não editar à mão** — editar os dados em `src/data/` e
  regenerar (`npm run knowledge`).
- **Chat do site (sem LLM, sem custo)** — `src/assistant/`
  (`normalize.ts`, `entities.ts`, `intents.ts`, `engine.ts`) +
  `src/components/ChatWidget.tsx`, montado globalmente no `App.tsx`.
  Intenções por palavra-chave (pt/en/fr), contexto de conversa (projeto/skill
  em foco), chips de sugestão e fallback honesto. Toda resposta é derivada de
  `src/data/*.ts` — nunca diverge do site e nunca inventa conteúdo.
  Strings de UI nos 3 `src/i18n/locales/*.json` sob a chave `assistant.*`.
  Ao adicionar projeto/skill novo em `src/data/`, as respostas se atualizam
  sozinhas; só adicione keywords novas em `src/assistant/intents.ts` se o
  nome do projeto for inesperado (ex.: "bingo" → clubingo).

## Como o site funciona (arquitetura)
- `src/main.tsx`: injeta canonical/OG/JSON-LD absolutos via `VITE_SITE_URL`
  (sem a env, ficam relativos). Monta React.
- `src/App.tsx`: `BrowserRouter` + rotas lazy com `AnimatePresence`.
  Rotas: `/` (Home), `/sobre` (About), `/skills(/:planetId)`,
  `/projetos(/:slug)`, `/trajetoria`, `/contato`, `*` (NotFound). Nav + Footer +
  Starfield + **ChatWidget** globais.
- As páginas são finas: **todo o conteúdo fica em `src/data/*.ts`**.
  Para mudar textos, links, períodos, projetos, skills → editar esses arquivos.

### Camada de dados (`src/data/`)
- `profile.ts`: nome, role, location, links (linkedin/github/instagram),
  `scenes` (carrossel da Home) e blocos `about` (textos do Sobre).
- `projects.ts`: type `Project` (slug, title, tagline, category
  `sistemas|landing|automacao`, role, period, stack, liveUrl, access
  `public|login`, problem/solution/decisions/result opcionais, cover, gallery).
  `n8n-lab` existe com `hidden: true` (não aparece). `visibleProjects` = sem hidden.
- `skills.ts`: lista de habilidades (status `producao|estudando`, tools, usedIn
  com slugs de projetos, cores/orbit p/ sistema solar).
- `timeline.ts`: `experience`, `formation`, `certifications`. Cada item tem
  `mode?: 'remote'|'onSite'` (mostra badge "Remoto/Presencial").
- `interests.ts`: chips "Fora do computador" do Sobre.
- `github.json`: gerado automaticamente (não editar à mão).

### i18n
- `src/i18n/index.ts`: lê `portfolio.lang` do localStorage (fallback:
  navigator → `pt`/`fr`/`resto`). `l(objeto)` retorna a string do idioma atual.
  `setLanguage()` grava localStorage + `document.documentElement.lang`.
- Strings de UI (menu, botões, labels, chat): `src/i18n/locales/{pt-BR,en,fr}.json`
  — manter os 3 sincronizados.
- Strings de conteúdo (textos de seções/projetos): objetos `Localized`
  (`Record<'pt-BR'|'en'|'fr', string>`) nos arquivos `src/data/*.ts`,
  lidos com o helper `l()`.

### Temas / visual
- Tokens CSS: `src/styles/tokens.css` (`--accent: #6a4cf0`, `--accent-2`,
  `--bg`, `--surface`, `--border`, `--radius`, `--maxw`, `--gutter`).
- `src/index.css`: Tailwind v4 (`@layer base` p/ estilos de elementos;
  `@theme inline` expõe `--color-*`). Fonte: Space Grotesk (display) +
  Inter (texto) + JetBrains Mono (labels) via fontsource.

### Componentes relevantes
- `SceneCarousel`: carrossel de cenas da Home (de `profile.scenes`).
- `ProjectGrid`: cards + filtros (Todos/Sistemas/Landing/Automação) + estado
  vazio (`projects.noResults`).
- `ProjectPanel`: painel lateral do projeto (focus trap, Esc fecha,
  prev/next). Mostra Problem/Solution/Decisions/Result (opcionais), stack,
  botão "Abrir sistema" (só se access ≠ login), Gallery (usa `thumb ?? src`).
- `SolarSystem` + `PlanetDetail`: mapa de habilidades (/skills); clique no
  planeta abre detalhe. `orbitRadii` em `skills.ts`.
- `Timeline`: abas Experiência/Formação + lista de Certificações.
- `ChatWidget`: bolha flutuante + painel do representante digital (focus trap,
  Esc fecha). Ver seção "Representante digital".
- `PostcardForm` (Contato): envia p/ `VITE_N8N_WEBHOOK_URL`; sem a env, abre
  `mailto:` de `VITE_CONTACT_EMAIL`. Honeypot + rate limit de 30s no cliente.
  Coluna ao lado: LinkedIn, GitHub, Instagram, WhatsApp (só se env setada).
  **CV foi removido** (não há mais botão de download).

## Imagens (public)
- `public/projects/<slug>/cover.webp` + `gallery-1.webp` (+ `-thumb.webp`).
  Gerados por `scripts/screenshots.mjs` + `scripts/make-thumbs.mjs`.
- ⚠️ `clubeon`: **não** rodar screenshots de novo — a arte de login original
  (restaurada de um commit antigo) é a única cópia; `screenshots.mjs` já pula
  cover existente do clubeon. MyFly usa https://myfly.vercel.app.
- `og-image.png`, `favicon.svg`: estáticos. `robots.txt` + `sitemap.xml`:
  gerados no prebuild por `scripts/gen-seo.mjs` a partir de `VITE_SITE_URL`.

## Env vars
- `VITE_SITE_URL=`https://portcarlos.vercel.app (canonical/OG/sitemap)
- `VITE_CONTACT_EMAIL=devclub152@gmail.com` (fallback mailto)
- `GITHUB_TOKEN=<PAT>` (rate limit do fetch de repos)
- `VITE_N8N_WEBHOOK_URL` — **não configurado ainda** (form usa mailto)
- `VITE_WHATSAPP_URL` — não setado (Carlos sem WhatsApp; botão oculto)
- `.env.example` versionado; `.env.local` no gitignore. Na Vercel as envs são
  setadas no painel (mesmo projeto `portcarlos`); conferir escopo
  Production/Preview — sem `GITHUB_TOKEN` no Preview, `fetch-github` degrada
  mantendo o `github.json` anterior.

## Deploy (Vercel)
- Projeto: `portcarlos` (id `prj_h4ycxCuVosJG7E9Uo6qmGBu65Htp`,
  teamId `team_UkNYhhaq7QPH18tArVpK4Srg`). É o **único** projeto Vercel do site
  (duplicados foram deletados; `myfly-landingpage` é outro repo, não mexer).
- `vercel.json`: build `npm run build`, output `dist`, rewrite SPA (`/` → index).
- Fluxo: `git push origin main` dispara **produção**. Push em **outra branch**
  dispara **Preview** (usar para validar antes de subir). Toda sessão deve
  rodar `npm run lint` + `npm run build` antes de commitar.
- CLI Vercel pode estar logged out; preview automático vem da integração Git
  (push em branch ≠ main).
- ⚠️ Tokens que foram colados em chats passados (Vercel `vcp_...` e GitHub
  `github_pat_...`) precisam ser revogados/regenerados.

## Pendências / abertos (out/2026)
- Blocos "Resultado" dos projetos estão vazios (qualquer número real: telas
  sincronizadas, economia de tempo, participantes de eventos).
- Galeria: só 1 screenshot por projeto (dá p/ adicionar mais).
- Webhook n8n do formulário ainda não existe.
- README.md está desatualizado (cita `public/profile.webp` e pasta `cv/`,
  que não existem mais).

## Fatos atuais de conteúdo
- Instagram: `c4rl0s.alenc4r`. Professor FATECE encerrou Out/2026; estágio
  no Clube Pirassununga Mar–Set/2026 (ClubeON, ClubStrategy, Clubingo).
- Graduação: Ciência da Computação FATECE (previsão 12/2028); ETEC:
  Técnico em Eletrônica. Avatar do Sobre = monograma SVG "CD" (sem foto).
- Períodos da trajetória limpos (sem "TODO"/"encerrado"). Filtro "Automação"
  mantido com estado vazio amigável.
