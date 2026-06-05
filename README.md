# MediBridge India

MediBridge India is a medical tourism platform for international patients to explore treatments, compare hospitals and doctors, estimate care costs, book consultations, and coordinate support workflows.

## Phase Plan

1. Project setup
2. Design system
3. Landing page
4. Treatments
5. Hospitals
6. Doctors
7. Cost estimator
8. Consultation booking
9. Admin dashboard

Code is generated one phase at a time. Do not build later-phase screens until the current phase is accepted.

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

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Update `.env` with your PostgreSQL connection string and JWT secret.

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
JWT_SECRET="replace-with-at-least-32-random-characters"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Database Workflow

Generate Prisma client:

```bash
npm run db:generate
```

Push the schema to the configured database:

```bash
npm run db:push
```

Open Prisma Studio:

```bash
npm run db:studio
```

## Quality Checks

Run lint:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npm run typecheck
```

Run both:

```bash
npm run check
```
