# Gateway

Residence security console prototype for Griya Harmoni Residence. It brings gate monitoring, visitor approval, digital passes, barcode scanning, and access records into one React interface. All records are sample data, and no gate device or backend is connected.

## Features

- Loading screen with progress indicator and skip control
- Dark navigation rail and light content canvas with a responsive two-tone layout
- Dashboard with sample metrics, activity chart, occupancy view, gate controls, visitor queue, and access monitoring
- Visitor approval and rejection, manual gate override with a required reason, digital pass issue, and SVG pass download
- Barcode scanner simulation that adds a sample access event
- Page search with `Ctrl K` or `Cmd K`, notifications, profile menu, offline simulation, and sample data reload
- Mobile layout with bottom navigation, slide-out sidebar, full-screen page search, and scrollable activity chart
- CSV export, filterable tables, detail dialogs, empty states, and error states

## Stack

- React 19 and React DOM 19
- Vite 8 with the React plugin
- Tailwind CSS 4 through `@tailwindcss/vite`
- TypeScript 5.7
- oxfmt for source formatting

## Requirements

Node.js 22 is pinned in `.mise.toml`. The commands below use npm because `package-lock.json` is included in the repository.

## Getting started

```bash
npm ci
npm run dev
```

The Vite server listens on `0.0.0.0:8443` by default. Set `PORT` to use another port, then open `http://localhost:8443`.

Sign in with any username and password. No credentials are stored or sent. The Create account flow also works and adds a sample pass to Digital Passes.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build production assets into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run format` | Format source files in `src/` with oxfmt |
| `npx tsc --noEmit` | Run the TypeScript checker without emitting files |

## Project structure

```text
src/
  App.tsx          Application screens, state, sample data, and interactions
  index.css        Tailwind import, theme tokens, and global component styles
  main.tsx         React entrypoint
  vite-env.d.ts    Vite client types
index.html         HTML shell and page metadata
vite.config.ts     Vite, React, Tailwind, and Figma Make configuration
```

## Prototype scope

- Data lives in React state and resets when the page reloads.
- Numbers shown in the dashboard are sample values, not live statistics.
- Registration, approval, gate override, scanning, pass issue, reload, and offline controls update local state only.
- There is no API, database, authentication provider, or gate hardware integration.

The formatter is intentionally scoped to `src/`. With the pinned oxfmt version, running it without a path would also parse dependency declarations and can corrupt them.

## Deployment

`npm run build` produces static assets in `dist/`. The folder can be hosted by any static host. The Vite config includes Figma Make plugins and reads `.figma/make/site.json`, so the project also runs inside Figma Make.
