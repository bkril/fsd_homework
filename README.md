# GeoWorld

Explore detailed information about all 195 countries — geography, culture, population, economy and more.

**Live demo:** [fsd-homework.vercel.app](https://fsd-homework.vercel.app)

---

## Features

- Browse all countries with search and region filtering
- Country detail pages — flag, capital, population, languages, currencies, bordering countries
- Authentication (sign up / sign in) via better-auth
- Internationalization — English and German (i18n via next-intl)
- ISR for the countries list, SSR for detail pages
- E2E tests with Playwright

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Auth | better-auth |
| Data fetching | TanStack React Query |
| Forms | React Hook Form + Zod |
| i18n | next-intl |
| State | Zustand |
| Database | PostgreSQL (pg) |
| E2E testing | Playwright |
| Architecture | Feature-Sliced Design (FSD) |

## Architecture

The project follows [Feature-Sliced Design](https://feature-sliced.design/) methodology:

```
src/
├── app/
│   ├── (web)/          # Next.js routing (pages, layouts)
│   ├── modules/        # Core business logic
│   ├── entities/       # API clients, React Query hooks, data models
│   └── shared/         # Reusable hooks, stores, components
├── config/             # Env vars, fonts, global styles
└── pkg/                # Third-party integrations
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Yarn 4

### Installation

```bash
yarn install
```

### Environment variables

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
BETTER_AUTH_SECRET=your_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## E2E Tests

```bash
# copy and fill in credentials for a test account
cp .env.test .env.test.local
# edit TEST_EMAIL and TEST_PASSWORD

yarn test:e2e

# Interactive Playwright UI
yarn test:e2e:ui
```

Tests are located in `tests/e2e/flows/`.
