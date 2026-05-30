# Express + @mostajs/orm Starter — Blog

> Express blog API (Users · Posts · Comments) on **[@mostajs/orm](https://www.npmjs.com/package/@mostajs/orm)** — one API, 13 databases, zero codegen. **Boots in the browser / Bolt.new / Cloudflare Workers with no native binary** (sqljs SQLite WASM).

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open in Bolt.new](https://img.shields.io/badge/Open_in-Bolt.new-000?style=for-the-badge&logo=stackblitz)](https://bolt.new/github.com/apolocine/express-mostajs-orm-starter)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/apolocine/express-mostajs-orm-starter)

## Quick start

```bash
git clone https://github.com/apolocine/express-mostajs-orm-starter.git
cd express-mostajs-orm-starter
npm install
npm run dev      # http://localhost:3000
```

No database to install — the default `sqljs` dialect runs SQLite in WebAssembly, **in-memory**, and seeds demo data on boot (3 users / 5 posts / 12 comments).

## Routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | HTML page — list of published posts (author + comment count) |
| `GET` | `/posts/:id` | HTML page — a post with its comments |
| `GET` | `/api/posts` | JSON — published posts |
| `GET` | `/api/posts/:id` | JSON — a post with `author` + `comments` populated |
| `POST` | `/api/posts` | JSON — create a post (`{ title, slug, content, authorId, published? }`) |

## Stack

- **Express 4** · **TypeScript** run with **tsx** (no build step)
- **@mostajs/orm 2.5.x** — `sqljs` (SQLite WASM) by default
- **Plain CSS** server-rendered pages (no framework, no native dep)

## Switch database (one env, no code change)

```bash
# Local Node, durable file (install the driver first: npm i better-sqlite3)
DB_DIALECT=sqlite DATABASE_URL=./blog.db npm run dev

# PostgreSQL in WASM, browser-persistent (npm i @electric-sql/pglite)
DB_DIALECT=pglite DATABASE_URL=idb://blog npm run dev

# Any of the 13 dialects — change DB_DIALECT + DATABASE_URL only.
```

## Project layout

```
src/
├── server.ts            # Express app: HTML pages + JSON API
├── view.ts              # plain-CSS server-rendered HTML
└── orm/
    ├── schemas.ts       # EntitySchema: User, Post, Comment
    ├── repositories.ts  # typed repositories
    ├── client.ts        # ORM connection (singleton) + seed-on-boot
    └── seed-on-boot.ts  # idempotent demo seed (anti empty-page)
```

## License

MIT — © Dr Hamid MADANI. The underlying [@mostajs/orm](https://github.com/apolocine/mosta-orm) is AGPL-3.0 (commercial license: drmdh@msn.com).
