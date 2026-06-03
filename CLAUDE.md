# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

DVD Collector is a Vue 3 + TypeScript SPA for managing a personal DVD collection. Movie data is fetched from the [OMDB API](https://www.omdbapi.com/) and persisted in Firebase Firestore. Reads are public; writes require Firebase Authentication (email/password login). Deployed to Firebase Hosting.

## Commands

```sh
npm run dev          # Vite dev server with HMR
npm run build        # type-check (vue-tsc) then vite build → dist/
npm run build-only   # vite build without type-check
npm run type-check   # vue-tsc --build (full project)
npm run typecheck    # vue-tsc --noEmit on tsconfig.app.json only (faster)
npm run lint         # eslint . --fix
npm run format       # prettier --write src/
npm run prettier:check
firebase deploy      # deploy dist/ to Firebase Hosting (after build)
```

There is **no test framework** configured in this project.

Node version is pinned to 24 (`.nvmrc`).

## Environment

Copy `.env.example` to `.env` and fill in all `VITE_*` values. The app will not function without them — Firebase config (`src/firebase/index.ts`), the Firestore collection name (`VITE_FIREBASE_DB_NAME`), the OMDB key (`VITE_OMDB_APIKEY`), and `VITE_USERNAME` are all read from `import.meta.env` at runtime. Also configure `.firebaserc` (see `.firebaserc.example`) before deploying.

## Architecture

**State — Pinia stores (`src/stores/`)**, the data backbone:
- `storeDVDs.ts` — owns the movie collection. `getDVDs()` opens a Firestore `onSnapshot` real-time subscription (ordered by `name`), so the UI updates live on any DB change; it is called once from `HomeView.onMounted`. Mutations (`addDVD`/`updateDVD`/`deleteDVD`) write to the collection named by `VITE_FIREBASE_DB_NAME`, using the doc `id` as the key.
- `storeAuth.ts` — wraps Firebase Auth. `init()` (called from `App.vue`) subscribes to `onAuthStateChanged` and redirects away from the login route once authenticated. Note: stores access the router via `this.router`, injected by a Pinia plugin in `main.ts` (`store.router = markRaw(router)`); the `PiniaCustomProperties` augmentation lives there too.

**Data flow for adding a title:** `ModalAddTitle.vue` queries OMDB via `axios` (`https://www.omdbapi.com/?t=<title>&apikey=...`), assigns a `nanoid(14)` id and `dateAdded`, then calls `storeDVDs.addDVD()`. The `Movie` type (`src/types/index.ts`) is the canonical shape; most fields are optional except `id`, `name`, and `rating`.

**UI stack:** PrimeVue 4 (Aura preset) for components + Toast, Tailwind CSS v4 for styling, `vue-i18n` for all user-facing strings.
- **Theming bridge:** Tailwind CSS custom properties are the single source of truth for the primary color palette. `main.ts` reads `--color-primary-*` vars via `src/utils/tailwind.ts` (`getComputedStyle`) and feeds them into a PrimeVue `definePreset`, so PrimeVue components match the Tailwind theme. Dark mode is handled by Tailwind (`darkModeSelector: false` in PrimeVue config), toggled in `DarkModeToggle.vue`.
- **i18n:** never hardcode UI text. Add keys under `src/lang/en/` (split into `common`, `titles`, `errors`, `sort`) and use `t('...')`. Config in `src/config/i18n.ts` (Composition API / `legacy: false`).

**Routing (`src/router/index.ts`):** all views are lazy-loaded. `beforeEach` sets `document.title` from route `meta.title` (the `detail` route derives it from the movie name param). The catch-all 404 route is declared first.

## Conventions

- Path alias `@/` → `src/` (configured in both `vite.config.ts` and tsconfig).
- `__APP_VERSION__` is a Vite `define` injected from `npm_package_version` (typed in `env.d.ts`).
- Prettier (`.prettierrc.js`) enforces 4-space indent, single quotes, 80 print width, trailing commas, and `vueIndentScriptAndStyle`. Imports and Vue template attributes are auto-sorted by plugins — run `npm run format` rather than ordering by hand.
- SFCs use `<script setup lang="ts">`. Heavier components (modals) are loaded with `defineAsyncComponent` + `<Suspense>`.
