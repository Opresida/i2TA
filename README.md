# i2TA — Instituto de Inteligência e Tecnologia Aplicada

![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?style=flat-square&logo=pnpm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Drizzle_ORM-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

Repositório monorepo do projeto i2TA — Instituto de Inteligência e Tecnologia Aplicada da Amazônia. Contém o site institucional, a API backend e o ambiente de prototipação de componentes.

---

## Sobre o i2TA

O **i2TA** é um instituto dedicado ao desenvolvimento e aplicação de inteligência artificial e tecnologias avançadas na Amazônia. Com missão centrada na inovação regional, o instituto atua em pesquisa aplicada, formação de talentos, e parceria estratégica com organizações públicas e privadas para gerar impacto social e tecnológico sustentável.

**Identidade visual:**
- Cores primárias: Preto Profundo `#0A0F1C`, Ciano `#00E0FF`, Roxo Neon `#7B3FE4`
- Tipografia: Space Grotesk (display) + Inter (corpo)
- Estética: glassmorphism, glow, grid tech, rede neural animada

---

## Arquitetura do Monorepo

```text
.
├── artifacts/                  # Aplicações deployáveis
│   ├── i2ta-site/              # Site institucional (React + Vite)
│   ├── api-server/             # API REST (Express 5)
│   └── mockup-sandbox/         # Canvas de prototipação de componentes
├── lib/                        # Bibliotecas compartilhadas
│   ├── api-spec/               # Especificação OpenAPI + config Orval
│   ├── api-client-react/       # Hooks React Query gerados por codegen
│   ├── api-zod/                # Schemas Zod gerados a partir do OpenAPI
│   └── db/                     # Schema Drizzle ORM + conexão ao banco
├── scripts/                    # Scripts utilitários
├── pnpm-workspace.yaml         # Configuração do workspace pnpm
├── tsconfig.base.json          # Opções TypeScript compartilhadas
├── tsconfig.json               # Referências de projeto (root)
└── package.json                # Dependências de desenvolvimento (root)
```

---

## Artefatos

### `artifacts/i2ta-site` — Site Institucional

Site institucional completo do i2TA, desenvolvido com **React 19** e **Vite 7**, sem dependência de backend. Inclui as seções:

- **Hero** — canvas animado com rede neural interativa
- **Sobre** — apresentação do instituto com visual tech de nós
- **Cultura Organizacional** — Missão, Visão, Valores e alinhamento com ODS
- **Áreas de Atuação** — 6 áreas em cards interativos
- **Diferenciais** — diferenciais estratégicos do instituto
- **Impactos** — impactos esperados das iniciativas
- **Contato** — formulário com validação via Zod
- **Footer** — rodapé com links rápidos

**Preview path:** `/`

---

### `artifacts/api-server` — API REST

Servidor de API construído com **Express 5**, **TypeScript** e **Drizzle ORM** sobre **PostgreSQL**. As rotas ficam em `src/routes/` e utilizam schemas Zod gerados a partir da especificação OpenAPI para validação de requisições e respostas.

**Principais tecnologias:**
- Express 5 + Pino (logging estruturado)
- Drizzle ORM + PostgreSQL
- Zod (validação via `@workspace/api-zod`)
- OpenAPI 3.1 (especificação em `lib/api-spec/openapi.yaml`)

**Preview path:** `/api`

---

### `artifacts/mockup-sandbox` — Canvas de Prototipação

Ambiente isolado para prototipação e visualização de componentes UI. Utiliza shadcn/ui, Radix UI, Recharts, Framer Motion e o ecossistema completo de componentes para exploração de design.

**Preview path:** `/__mockup`

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Gerenciador de pacotes | pnpm workspaces |
| Linguagem | TypeScript 5.9 |
| Runtime | Node.js 24 |
| Frontend framework | React 19 |
| Build tool (frontend) | Vite 7 |
| Estilização | Tailwind CSS 4 |
| Componentes UI | Radix UI + shadcn/ui |
| Backend framework | Express 5 |
| Banco de dados | PostgreSQL |
| ORM | Drizzle ORM |
| Validação | Zod |
| API spec | OpenAPI 3.1 |
| Codegen | Orval |
| Animações | Framer Motion |

---

## Pré-requisitos

- **Node.js** >= 24
- **pnpm** >= 9 — [instruções de instalação](https://pnpm.io/installation)
- **PostgreSQL** — instância local ou variável `DATABASE_URL` configurada

---

## Instalação e Execução Local

### 1. Clone o repositório

```bash
git clone https://github.com/Opresida/i2TA.git i2ta
cd i2ta
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente por artefato

Cada artefato requer as variáveis listadas abaixo. Exporte-as antes de executar o `pnpm dev` correspondente, ou crie um arquivo `.env` na pasta do artefato.

**Site institucional (`artifacts/i2ta-site`):**
```env
PORT=3000
BASE_PATH=/
```

**API Server (`artifacts/api-server`):**
```env
PORT=3001
DATABASE_URL=postgresql://usuario:senha@localhost:5432/i2ta
```

**Canvas de prototipação (`artifacts/mockup-sandbox`):**
```env
PORT=3002
BASE_PATH=/__mockup
```

### 4. Execute os artefatos

Cada artefato roda de forma independente. Abra um terminal para cada um:

**Site institucional:**
```bash
cd artifacts/i2ta-site
PORT=3000 BASE_PATH=/ pnpm dev
```

**API Server:**
```bash
cd artifacts/api-server
PORT=3001 DATABASE_URL=postgresql://usuario:senha@localhost:5432/i2ta pnpm dev
```

**Canvas de prototipação:**
```bash
cd artifacts/mockup-sandbox
PORT=3002 BASE_PATH=/__mockup pnpm dev
```

| Artefato | Porta sugerida | Base Path |
|---|---|---|
| Site institucional | 3000 | `/` |
| API Server | 3001 | — |
| Canvas de prototipação | 3002 | `/__mockup` |

---

## Scripts do Workspace Raiz

| Comando | Descrição |
|---|---|
| `pnpm run typecheck` | Verifica tipos em todos os pacotes via referências de projeto TypeScript |
| `pnpm run build` | Executa typecheck e em seguida o build de todos os artefatos |

---

## Deploy

O projeto é configurado para deploy na plataforma **Replit**. Cada artefato é um serviço independente exposto via roteamento por path:

| Artefato | Path de Preview |
|---|---|
| Site institucional | `/` |
| API Server | `/api` |
| Canvas de prototipação | `/__mockup` |

Para publicar o projeto, utilize a funcionalidade de Deploy da Replit a partir do painel do workspace.

---

## Status Atual

### Concluido
- [x] Setup monorepo com pnpm workspaces
- [x] Site institucional completo (Hero, Sobre, Cultura, Areas, Diferenciais, Contato, Footer)
- [x] Compatibilidade Windows (binarios nativos + remocao plugins Replit)
- [x] Secoes de Noticias, Depoimentos e Impactos com placeholder "em breve" (estrutura UI preservada)

### Pendente
- [ ] Painel administrativo (/admin)
- [ ] Dados reais: depoimentos de parceiros, numeros de impacto, noticias
- [ ] Deploy em producao
- [ ] Formulario de contato funcional (backend)

---

## Licenca

Este projeto esta licenciado sob a licenca **MIT**.
