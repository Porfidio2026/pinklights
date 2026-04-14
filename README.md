# Pinklights

Premium companion platform — Vite + React + TypeScript frontend with a Supabase backend.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (database, auth, edge functions)
- TanStack Query, React Router, React Hook Form + Zod

## Getting started

```sh
npm install
npm run dev
```

The dev server runs on http://localhost:8080.

## Environment variables

Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Required for location autocomplete.
# https://console.cloud.google.com/apis/credentials — enable Places API + Maps JavaScript API.
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Optional monitoring — leave empty to disable.
VITE_SENTRY_DSN=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

`.env` is gitignored — never commit it.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run build:dev` — development-mode build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm test` — run Vitest
