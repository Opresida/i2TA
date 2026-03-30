# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── i2ta-site/          # Site institucional i2TA (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Artifacts

### `artifacts/i2ta-site` (Site Institucional i2TA)

Site institucional completo do Instituto de Inteligência e Tecnologia Aplicada da Amazônia (i2TA). React + Vite, sem backend.

**Seções:** Hero, Sobre, Cultura Organizacional (Missão/Visão/Valores/ODS), Áreas de Atuação, Diferenciais, Impactos, Contato, Footer.

**Identidade Visual:**
- Cores: Preto Profundo (#0A0F1C), Ciano (#00E0FF), Roxo Neon (#7B3FE4)
- Tipografia: Space Grotesk (display) + Inter (corpo)
- Efeitos: glassmorphism, glow, grid tech, rede neural animada
- Logos: claro para navbar (`https://i.imgur.com/S85l92Y.png`), escuro (`https://i.imgur.com/bw6rmMQ.png`)

**Componentes:**
- `src/components/Navbar.tsx` — Navegação fixa com scroll detection
- `src/components/Hero.tsx` — Canvas animado de rede neural
- `src/components/About.tsx` — Seção Sobre com visual de nós tech
- `src/components/MissionVisionValues.tsx` — Cultura organizacional
- `src/components/Services.tsx` — 6 áreas de atuação em cards
- `src/components/Differentials.tsx` — Diferenciais estratégicos
- `src/components/Impact.tsx` — Impactos esperados
- `src/components/Contact.tsx` — Formulário de contato com validação
- `src/components/Footer.tsx` — Rodapé com links rápidos

**Animações:** reveal on scroll via IntersectionObserver, rede neural no canvas, nós flutuantes, fluxo de dados SVG.

Preview path: `/`

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
