# CONTEXT — i2TA

Regras, stack e logica de negocio. Leia antes de fazer qualquer alteracao.

---

## Stack Tecnologica

| Camada | Tecnologia | Versao |
|--------|-----------|--------|
| Monorepo | pnpm workspaces | 10.x |
| Linguagem | TypeScript | 5.9 |
| Runtime | Node.js | 24 |
| Frontend | React + Vite | 19 / 7 |
| Estilizacao | Tailwind CSS | 4 |
| Componentes UI | Radix UI + shadcn/ui | — |
| Animacoes | Framer Motion | 12.x |
| Roteamento | Wouter | 3.x |
| Backend | Express 5 | 5.x |
| ORM | Drizzle ORM | 0.45 |
| Banco | PostgreSQL | — |
| Validacao | Zod | 3.x |
| API Spec | OpenAPI 3.1 + Orval | — |

---

## Estrutura do Monorepo

- `artifacts/i2ta-site` — Site institucional (React + Vite, porta 5000 local)
- `artifacts/api-server` — API REST (Express 5 + Drizzle)
- `artifacts/mockup-sandbox` — Canvas de prototipacao de componentes
- `lib/` — Bibliotecas compartilhadas (api-spec, api-client-react, api-zod, db)

---

## Logica de Negocio

### Organizacao
- i2TA = Instituto de Inteligencia e Tecnologia Aplicada da Amazonia
- Foco: IA, tecnologias avancadas, pesquisa aplicada, formacao de talentos
- Areas: bioeconomia, industria, saude digital, educacao, meio ambiente

### Identidade Visual
- Cores primarias: Preto Profundo `#0A0F1C`, Ciano `#00E0FF`, Roxo Neon `#7B3FE4`
- Tipografia: Space Grotesk (display) + Inter (corpo)
- Estetica: glassmorphism, glow, grid tech, rede neural animada

### Paginas do Site
- `/` — Home (Hero, Sobre, Cultura, Areas, Diferenciais, Impactos, Depoimentos, Contato, Footer)
- `/noticias` — Pagina de noticias (em breve)

### Secoes com dados mockados removidos (aguardando dados reais)
- **Noticias** — componente NoticiasGrid preservado no git history
- **Depoimentos de Parceiros** — TestimonialSlider preservado em comentario no Testimonials.tsx
- **Impactos Transformadores** — AnimatedCounter, ProgressBar e cards preservados em comentario no Impact.tsx

---

## Regras para a IA

- **Nunca commitar** o arquivo `.env`
- Projeto usa **pnpm** — nunca usar npm ou yarn
- Para rodar localmente: `cd artifacts/i2ta-site && PORT=5000 pnpm dev`
- O workspace do Replit exclui binarios Windows — necessario instalar manualmente: `@rollup/rollup-win32-x64-msvc`, `lightningcss-win32-x64-msvc`, `@tailwindcss/oxide-win32-x64-msvc`
- Removido plugin `@replit/vite-plugin-runtime-error-modal` do vite.config para compatibilidade local
- Sempre atualizar README, CONTEXT e TODO apos cada funcionalidade aprovada
