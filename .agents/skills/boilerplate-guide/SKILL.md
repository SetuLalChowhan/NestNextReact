---
name: boilerplate-guide
description: Comprehensive architecture, development guidelines, and customization guide for the Fullstack Next.js, Vite React Admin, and NestJS + Prisma boilerplate with unified Better-Auth and Shadcn UI.
---

# Fullstack Monorepo Boilerplate Guide

This skill provides comprehensive instructions, architecture patterns, and conventions for starting and building new projects using this enterprise boilerplate.

---

## 1. Monorepo Architecture Overview

```
├── server/                 # Backend REST API (NestJS 12 + Prisma 7 + Better-Auth + PostgreSQL)
│   ├── prisma/             # Schema definitions and database seed scripts
│   │   ├── schema/         # Modular Prisma schema files (auth.prisma, schema.prisma)
│   │   └── seed.ts         # Database seeder for Super Admin & Demo accounts
│   ├── src/
│   │   ├── auth/           # Better-Auth server configuration, guards, and decorators
│   │   ├── users/          # User CRUD, profile self-update, and admin controls
│   │   ├── health/         # System & database health probe (/health)
│   │   ├── common/         # Global interceptors, exception filters, structured logger, pagination
│   │   └── config/         # Zod-validated environment configuration
│   └── package.json
│
├── admin/                  # Admin Management Panel (React 19 + Vite 7 + Tailwind v4 + Shadcn UI)
│   ├── src/
│   │   ├── app/            # Providers and React Router v7 configuration
│   │   ├── components/     # Shadcn UI primitives, layout wrappers, and dashboard charts
│   │   ├── features/       # Feature-specific state, queries, and APIs (auth, users)
│   │   ├── layout/         # AdminLayout with Sidebar, Navbar, and Responsive Drawer
│   │   └── pages/          # Admin pages (Dashboard, Users, Showcase, Settings, Login)
│   └── package.json
│
└── client/                 # Client & Customer Portal (Next.js 16 + React 19 + Tailwind v4 + Shadcn UI)
    ├── app/                # Next.js App Router (Public routes, (auth) routes, and /dashboard)
    │   ├── (auth)/         # Login, Register, Forgot Password, Reset Password
    │   ├── (site)/         # Public Landing page, About, Showcase
    │   └── dashboard/      # Authenticated user dashboard, Activity, and Settings
    ├── components/         # Shared Shadcn UI primitives, Header, Footer, and Showcase
    ├── features/           # Client Auth queries, Better-Auth client, and types
    └── lib/                # Axios API client, query cache policies, and SEO helpers
```

---

## 2. Authentication & Authorization Flow

The boilerplate uses **Better-Auth** with Prisma PostgreSQL adapter.

### Roles
- `ADMIN`: Full access to the Admin Panel (`admin/`), user deletion, role elevation, and system telemetry.
- `USER`: Access to the Client User Dashboard (`client/app/dashboard`) and self-profile settings.

### Session Propagation
- **Client (Next.js)**: Utilizes automatic HTTP-only cookies with credentials included.
- **Admin (Vite SPA)**: Authenticates with `Authorization: Bearer <session token>` (or cookies) using the `bearer()` plugin.

### Default Seed Credentials
- **Admin Account**: `admin@example.com` / `Admin@123456`
- **Demo User**: `user@example.com` / `User@123456`

---

## 3. Design System & Theme Customization

Both `admin` and `client` share the identical Shadcn UI design system and Tailwind v4 theme token structure.

### Changing Global Brand Colors
To reskin the entire application (e.g. from Blue to Emerald or Indigo):
1. **Client**: Update `:root` variables in `client/app/globals.css`:
   ```css
   :root {
     --primary: #4F46E5;        /* Change to your desired brand hex */
     --primary-foreground: #FFFFFF;
     --ring: #4F46E5;
   }
   ```
2. **Admin**: Update `:root` and `@theme` variables in `admin/src/index.css`.

---

## 4. UI Kitchen Sink / Component Showcase

Both applications feature an identical Component Showcase illustrating all interactive Shadcn primitives:
- **Admin**: Accessible at `/dashboard/showcase`
- **Client**: Accessible at `/showcase` and `/dashboard/showcase`

### Included Components:
- Buttons (Primary, Secondary, Outline, Destructive, Ghost, Loading)
- Form Controls (Input, Textarea, Single Select, MultiSelect, DatePicker)
- Selection Controls (Switch, Checkbox, RadioGroup)
- Feedback & Overlays (Dialog/Modal, Tooltips, Badge variants, Alert Callouts)
- Layout (Tabs, Separator, Breadcrumbs, Skeletons, Responsive Tables)

---

## 5. Developer Workflow: Starting a New Project

### Step 1: Configure Environment Variables
Copy `.env.example` to `.env` in `server/`:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/myapp_db?schema=public"
BETTER_AUTH_SECRET="your-32-char-random-secret"
BETTER_AUTH_URL="http://localhost:5000"
CLIENT_URL="http://localhost:3000"
TRUSTED_ORIGINS="http://localhost:3000,http://localhost:5173,http://localhost:5000"
```

### Step 2: Database Migration & Seeding
```bash
cd server
npx prisma db push
npm run seed
```

### Step 3: Run Development Servers
Open 3 terminal sessions:
1. **Server**: `cd server && npm run start:dev` (runs on `http://localhost:5000`, docs at `/api/docs`)
2. **Client**: `cd client && npm run dev` (runs on `http://localhost:3000`)
3. **Admin**: `cd admin && npm run dev` (runs on `http://localhost:5173`)

---

## 6. How to Add a New Domain Module

### 1. Add Prisma Schema Model
In `server/prisma/schema/<feature>.prisma`:
```prisma
model Product {
  id          String   @id @default(cuid())
  title       String
  price       Float
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 2. Scaffold NestJS Module
Create `server/src/products/` with `products.module.ts`, `products.controller.ts`, `products.service.ts`, `products.repository.ts`, and DTOs.
Import in `server/src/app.module.ts`.

### 3. Add API Hook in Client/Admin
In `client/features/products/api/queries.ts`:
```typescript
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await apiClient.get('/products');
      return res.data;
    },
  });
};
```
