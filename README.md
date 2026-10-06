# Portfolio — Carlos Daniel Alencar

Portfólio pessoal de Carlos Daniel da Silva Alencar: analista de sistemas e automação. Sistemas web em produção, automação com n8n, infraestrutura de TI e suporte.

Stack: Vite + React 19 + TypeScript, Tailwind CSS v4, motion (animações), i18n (pt-BR / en / fr), react-router v7.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | `prebuild` (fetch github + sitemap) → `tsc -b` → `vite build` |
| `npm run preview` | Servir o `dist` localmente |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm run shots` | Capturas de tela dos projetos (Playwright) → `public/projects/<slug>/cover.png` |
| `npm run thumbs` | Converte covers/quadros para WebP + miniaturas |

## Env vars

Copie `.env.example` para `.env.local` e preencha:

- `VITE_SITE_URL` — URL final do site (canonical, sitemap, og:*).
- `VITE_CONTACT_EMAIL` — e-mail usado no link de contato.
- `VITE_WHATSAPP_URL` — link do WhatsApp.
- `GITHUB_TOKEN` — token GitHub (facilita o rate limit do fetch de repos).
- `VITE_N8N_WEBHOOK_URL` — webhook do n8n para o formulário (veja abaixo).

## Formulário de contato (n8n)

O formulário publica para `VITE_N8N_WEBHOOK_URL`. Sem essa env: 0 webhook, e o envio abre o `mailto:` de `VITE_CONTACT_EMAIL` como fallback. Há honeypot e rate limit de 30s no cliente.

Sugestão de workflow no n8n:

1. **Webhook** (POST, JSON):
   ```json
   {
     "name": "...",
     "email": "...",
     "subject": "...",
     "message": "..."
   }
   ```
2. **Edit Fields (Set)** — montar o corpo do e-mail e o assunto.
3. **Gmail** — `to: <VITE_CONTACT_EMAIL>`, assunto `[portfolio] <subject>`, texto com nome/e-mail/mensagem.

Prazo/Hook: retorne `200` para o cliente mostrar sucesso. Após o primeiro envio, registre a URL do webhook no Vercel e remova o `.env.local` local se quiser.

## Imagens

- `public/profile.webp` — foto de perfil (About).
- `public/cv/Carlos-Daniel-Alencar-CV.pdf` — currículo para download.
- `public/projects/<slug>/cover.webp` + `gallery-*.webp` — geradas por `npm run shots`/`npm run thumbs`.
- `public/og-image.png` — gerada por `node scripts/gen-og.mjs`.

## SEO

- `index.html` — title/description/OpenGraph/Twitter/JSON-LD (Person).
- Canonical e OG absolutos são injetados via `VITE_SITE_URL` (sem env, ficam relativos).
- `public/sitemap.xml` + `public/robots.txt` — gerados no `prebuild` por `scripts/gen-seo.mjs` a partir de `VITE_SITE_URL`.

## Deploy (Vercel)

1. Importe o repositório pelo painel (Git Integration).
2. Build: `npm run build`, output `dist`.
3. Env vars no painel: `VITE_SITE_URL`, `VITE_CONTACT_EMAIL`, `VITE_WHATSAPP_URL`, `GITHUB_TOKEN`, `VITE_N8N_WEBHOOK_URL` (opcional).
4. `vercel.json` cuida do redirect SPA (`/` → `/index.html`).

## Estrutura

```
public/projects/          # screenshots/webp por projeto
scripts/                  # fetch-github, screenshots, make-thumbs, gen-seo, gen-og
src/data/                 # dados (perfil, projetos, skills, timeline, interesses, github)
src/components/           # UI (Nav, Starfield, SceneCarousel, SolarSystem, ...
src/i18n/                 # i18n lite: locales pt-BR, en, fr
src/pages/                # Home, About, Skills, Projects, Trajectory, Contact, NotFound
src/styles/               # tokens.css + index.css (Tailwind v4)
```