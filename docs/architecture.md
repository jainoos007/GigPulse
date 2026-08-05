# System Architecture Documentation

## Overview
FreelanceFlow is structured as a **Modular Monolith** application written in TypeScript across backend and frontend.

## Backend Architecture
- **Framework**: Express.js with TypeScript.
- **Entry Points**:
  - `server.ts`: Listens on HTTP port and handles lifecycle events.
  - `app.ts`: Express application setup, security headers (Helmet), CORS, JSON parsers, Rate Limiting, and Routing.
- **Routing**: Centralized versioned routing in `src/routes/index.ts` under `/api/v1`.
- **Database Layer**: Prisma ORM with MySQL in `src/database/prisma.ts`.
- **Domain Modules** (`src/modules/*`):
  - Self-contained folders owning `controller`, `service`, `repository`, `routes`, `validators`, `dto`, `types`, `constants`, and `interfaces`.
- **Shared Infrastructure** (`src/shared/*`):
  - Pure utility functions (`utils/`), shared constants (`constants/`), domain enums (`enums/`), contract interfaces (`interfaces/`), third-party services (`services/`), and global types (`types/`).

## Frontend Architecture
- **Framework**: Next.js 14/15 App Router + TypeScript + Tailwind CSS.
- **Feature Modules** (`src/features/*`):
  - Encapsulated UI components, custom hooks, Axios API services, Redux slice integrations, and Zod schemas per domain feature.
- **State Management**: Redux Toolkit for global auth and session state.
