# React CRUD App

A small CRUD app built with React, Vite, MUI, and TanStack Query. It includes a mockable REST API client, client-side routing, and tests.

## Tech Features
- React 19 + TypeScript
- Vite dev/build pipeline
- TanStack Query for client-side data caching and mutations
- React Router for client-side routes
- MUI component library (with `sx` for styling)
- Tailwind for layout helpers in non-MUI contexts
- Vitest + Testing Library for unit tests
- Playwright for end-to-end tests
- Simple Node API server (optional)

## Scripts
- `npm run dev`: start the Vite dev server
- `npm run server`: start the API server on port 3001
- `npm run build`: type-check and build for production
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint
- `npm run lint:fix`: run ESLint with auto-fix
- `npm run test:ui`: run unit tests
- `npm run test:e2e`: run Playwright e2e tests (expects API server on `http://localhost:3001`)

## Notes
- API base URL is defined in `src/services/api.ts`.
