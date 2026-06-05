# MedBridge India

Premium medical tourism concierge for international patients seeking trusted, cost-effective healthcare in India.

MedBridge India helps patients discover treatments, compare hospitals and doctors, estimate care costs, book consultations, and coordinate support workflows across the full international patient journey.

## Product Overview

MedBridge India is designed as a high-trust healthcare marketplace and concierge platform. The public experience focuses on treatment discovery, hospital credibility, doctor expertise, transparent cost expectations, and consultation conversion. The backend foundation supports patient identity, appointments, reports, reviews, visa assistance, support tickets, and admin operations.

## Core Capabilities

- Treatment discovery by category, recovery profile, risks, and partner hospital availability
- Hospital comparison with city, accreditation, rating, specialties, gallery, and contact metadata
- Doctor profiles with specialty, experience, languages, consultation fees, success rate, and hospital affiliation
- Multi-currency cost estimation foundation for international patients
- Consultation booking entry point for medical concierge workflows
- Patient account, report upload, appointment, visa, review, and support-ticket schema
- Role-aware identity model for patients, doctors, staff, and admins

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/Base UI components
- Prisma 7
- PostgreSQL
- Zod validation
- JWT auth helpers
- TanStack Query
- Zustand
- Motion/Framer Motion
- Lucide icons

## Project Structure

```txt
medi-bridge-india/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── constants.ts
│   │   ├── env.ts
│   │   ├── prisma.ts
│   │   ├── utils.ts
│   │   └── validators.ts
│   └── types/
├── components.json
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a local environment file:

```bash
cp .env.example .env
```

Recommended local values:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
JWT_SECRET="replace-with-at-least-32-random-characters"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`DATABASE_URL` and `JWT_SECRET` are optional in local development for screens that do not touch the database, but both should be configured before working on auth, Prisma, or production builds.

### 3. Prepare the Database

Generate Prisma Client:

```bash
npm run db:generate
```

Push the schema to PostgreSQL:

```bash
npm run db:push
```

Open Prisma Studio:

```bash
npm run db:studio
```

### 4. Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

If port `3000` is already in use, Next.js will automatically choose the next available port.

## Available Scripts

```bash
npm run dev          # Start the Next.js development server
npm run build        # Create a production build
npm run start        # Start the production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run check        # Run lint and typecheck together
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push Prisma schema to the database
npm run db:studio    # Open Prisma Studio
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Production, database workflows | PostgreSQL connection string used by Prisma |
| `JWT_SECRET` | Production | Secret used for signing JWT auth tokens. Minimum 32 characters |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public site URL used for metadata and shareable links |
| `NODE_ENV` | Runtime | `development`, `test`, or `production` |

## Data Model

The Prisma schema is organized around a medical tourism operating model:

- `User`, `Patient`, `Doctor`, and `Admin` for identity and role-specific profiles
- `Country` for patient origin, currency, phone code, and visa metadata
- `Hospital`, `Treatment`, and `HospitalTreatment` for provider catalog and treatment pricing
- `Appointment` for scheduled consultations and treatment planning
- `Report` for patient medical file metadata
- `Review` for moderated patient feedback
- `VisaApplication` for travel assistance workflows
- `SupportTicket` and `ChatMessage` for patient support operations

## Design System

The UI uses a premium clinical-concierge visual language:

- Deep emerald for trust, authority, and primary actions
- Warm gold accents for premium highlights
- Alabaster and glass surfaces for calm, elevated layouts
- Playfair Display for editorial headings
- Manrope for readable product UI and navigation
- Compact, responsive components optimized for international patient workflows

Global tokens and utilities live in `src/app/globals.css`.

## Quality Workflow

Before shipping a change:

```bash
npm run lint
npm run typecheck
npm run build
```

For UI work, verify:

- Desktop, tablet, and mobile layouts
- Header and CTA spacing
- Text wrapping and overflow
- Interactive states for buttons, links, menus, and forms
- Production build output

## Production Checklist

- Configure `DATABASE_URL` with a production PostgreSQL database
- Set a strong `JWT_SECRET` with at least 32 characters
- Set `NEXT_PUBLIC_SITE_URL` to the deployed domain
- Run `npm run db:generate`
- Apply schema changes with your preferred Prisma deployment workflow
- Run `npm run check`
- Run `npm run build`
- Verify critical pages and conversion flows after deployment

## Deployment

This app is ready for any Node-compatible Next.js hosting provider.

Recommended deployment flow:

```bash
npm install
npm run db:generate
npm run build
npm run start
```

For managed platforms such as Vercel, configure the environment variables in the project dashboard and use the default Next.js build command:

```bash
npm run build
```

## Roadmap

- Treatments directory with advanced filtering
- Hospital directory with city, accreditation, and specialty filters
- Doctor directory with language, fee, and specialty filters
- Cost estimator with multi-currency breakdowns
- Consultation booking and patient intake
- Patient portal for appointments, reports, visa support, and support tickets
- Admin dashboard for catalog, user, and workflow management

## License

Private project. All rights reserved.
