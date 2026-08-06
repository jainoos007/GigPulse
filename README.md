# GigPulse – Operating System for Freelancers

**GigPulse** is a modern, full-stack Customer Relationship Management (CRM) & Operating System designed specifically for freelancers to streamline clients, leads, projects, tasks, meetings, proposals, invoices, and payments in one unified platform.

---

## Key Features

- **Authentication & Security**: Secure JWT auth, refresh token rotation, bcrypt password hashing, and role-based access control (`FREELANCER`, `ASSISTANT`).
- **Client Management**: Store client contacts, company information, tax IDs, industry verticals, and track activity history.
- **Lead Pipeline**: Manage leads, estimated deal values, stages (`NEW` -> `WON`/`LOST`), and convert leads directly into active clients.
- **Project Management**: Track budgets, start & deadline dates, completion progress percentages, and status priorities.
- **Interactive Task Kanban Board**: Manage project tasks, priority levels, due date deadlines, and kanban swimlanes.
- **Meeting Management**: Schedule meetings, log agenda notes, track platform URLs (Google Meet, Zoom), and set reminders.
- **Proposal Generator & Tracking**: Create client/lead proposals, valuation amounts, status lifecycle, and convert accepted proposals into active projects.
- **Invoicing & Payment Tracking**: Auto-calculate totals (subtotal, tax, discount), send invoices, record payments, and monitor revenue stats.
- **Dashboard Analytics**: Real-time business metrics for total clients, active projects, revenue summaries, and upcoming deadlines.

---

## Technology Stack

### Backend

- **Framework**: Express.js (v4) with TypeScript
- **Database ORM**: Prisma ORM (v5) + MySQL
- **Authentication**: JSON Web Tokens (JWT) & HTTP-Only Cookies
- **Middleware**: Express Rate Limit, Helmet, CORS, Express Validator / Zod

### Frontend

- **Framework**: Next.js (v14/v15 App Router) + React + TypeScript
- **Styling**: Tailwind CSS + Radix UI / shadcn/ui components
- **State Management**: Redux Toolkit & React Hooks
- **Icons & Visuals**: Lucide Icons, Recharts

---

## Project Structure

```
GigPulse/
|
├── backend/                   # Express.js API Monolith
│   ├── prisma/                # Prisma Schema & Database Seeds
│   │   ├── schema.prisma      # Models, Enums & Relations
│   │   └── seed.ts            # Seed Data
│   ├── src/
│   │   ├── config/            # Environment Configuration
│   │   ├── database/          # Prisma Client Instance
│   │   ├── middleware/        # Auth, Validation, Error Handling
│   │   ├── modules/           # Modular Domain Services
│   │   │   ├── auth/          # Authentication Module
│   │   │   ├── clients/       # Client CRM Module
│   │   │   ├── leads/         # Lead Pipeline Module
│   │   │   ├── projects/      # Project Management Module
│   │   │   ├── tasks/         # Task & Kanban Board Module
│   │   │   ├── meetings/      # Meeting Sync Module
│   │   │   ├── invoices/      # Invoicing & Billing Module
│   │   │   └── proposals/     # Proposal Lifecycle Module
│   │   ├── routes/            # Versioned API Router (/api/v1)
│   │   └── server.ts          # Server Lifecycle & HTTP Server
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                  # Next.js App Router Web Application
    ├── src/
    │   ├── app/               # Next.js App Router Pages & Layouts
    │   │   ├── (auth)/        # Login & Registration Pages
    │   │   └── (dashboard)/   # Main Dashboard & Submodule Views
    │   ├── components/        # Reusable Layout & UI Components
    │   ├── features/          # Encapsulated Feature Logic & Views
    │   ├── lib/               # Axios API Clients & Utilities
    │   └── store/             # Redux Store & State Slices
    ├── package.json
    └── tailwind.config.js
```

---

## Quick Start (Local Setup)

### 1. Prerequisites

- Node.js (v18+)
- MySQL Server (running on port 3306)

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables (.env)
cp .env.example .env

# Run Prisma database migrations
npx prisma migrate dev --name init

# (Optional) Seed demo database records
npx prisma db seed

# Start development backend API server (runs on port 5000)
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Configure environment variables (.env.local)
# Set NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"

# Start Next.js development server (runs on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser to launch **GigPulse**.

---
