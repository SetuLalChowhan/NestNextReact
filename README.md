# Enterprise Fullstack Monorepo Boilerplate

A production-grade monorepo starter kit featuring:
- **Server**: NestJS 12 + Prisma 7 + PostgreSQL + Better-Auth + Swagger OpenAPI
- **Admin**: React 19 + Vite 7 + Tailwind CSS v4 + Shadcn UI + TanStack Query
- **Client**: Next.js 16 + React 19 + Tailwind CSS v4 + Shadcn UI + TanStack Query

---

## 🚀 Quick Start

### 1. Configure Server Environment
```bash
cd server
cp .env.example .env
```
Ensure your `DATABASE_URL` points to a running PostgreSQL database.

### 2. Push Prisma Schema & Seed Super Admin & Demo User
```bash
cd server
npx prisma db push
npm run seed
```

Default credentials seeded:
- **Super Admin**: `admin@example.com` / `Admin@123456`
- **Demo User**: `user@example.com` / `User@123456`

### 3. Launch Development Servers

| App | Command | Port | Description |
|---|---|---|---|
| **Server** | `cd server && npm run start:dev` | `http://localhost:5000` | REST API (`/api/docs` for Swagger) |
| **Client** | `cd client && npm run dev` | `http://localhost:3000` | Next.js 16 Client Portal |
| **Admin** | `cd admin && npm run dev` | `http://localhost:5173` | React 19 Vite Admin Panel |

---

## 🎨 Design System & Theme Customization

Both **Client** and **Admin** share the exact same Shadcn UI component suite and Tailwind v4 theme tokens.

To customize your brand color across the entire platform, simply update the CSS variable `--primary` in:
- `client/app/globals.css`
- `admin/src/index.css`

### Component Showcase / Kitchen Sink
- **Admin**: Visit `http://localhost:5173/dashboard/showcase`
- **Client**: Visit `http://localhost:3000/showcase` or `http://localhost:3000/dashboard/showcase`

---

## 📖 Architecture & Agent Skills

Detailed architecture conventions and developer guidelines are documented in:
[`.agents/skills/boilerplate-guide/SKILL.md`](.agents/skills/boilerplate-guide/SKILL.md)
