# Tofu Jobs

[Open the hosted demo](https://tofu-jobs-demo.vercel.app) · [Frontend source](https://github.com/brennanbutler01/tofu-jobs) · [API source](https://github.com/brennanbutler01/tofu-jobs-api)

A personal job-search organizer built with React, TypeScript, Mantine and a C#/.NET API. Track companies, move applications between stages, schedule interviews, keep activity notes and save cover-letter links.

This public edition recovers the original application with updated dependencies, repaired workflows and isolated visitor sessions. It is a portfolio project, not a service for storing real applications or personal information.

## Run the complete app locally

Start the companion `tofu-jobs-api` using its `compose.visitor.yaml` instructions. Then:

```sh
nvm use
corepack yarn install --frozen-lockfile
corepack yarn dev:visitor
```

Open http://127.0.0.1:5216. Each browser tab gets an isolated session, with real API/PostgreSQL persistence for one hour. Reset deletes the session and its records. No signup or external credentials are required.

## Checks

```sh
corepack yarn build
corepack yarn test:ci
corepack yarn test:visitor
```

The browser suite uses the local visitor API on port 5215. It exercises desktop/mobile creation, failure recovery, persisted edits, interviews, session isolation and reset. For a hosted check, set `VISITOR_URL` and `VISITOR_API_URL` to the dedicated demo deployments. Local runs use installed Chrome; CI installs Playwright Chromium.

The older component suite contains 13 unfinished test placeholders. These are reported as todo, not counted as passing checks.

## Boundaries

- Visitor mode needs `VITE_VISITOR_DEMO=true` and `VITE_BACKEND_API` pointing at the visitor API.
- The development-only Alice/Bob mode uses `VITE_DEMO_MODE=true`, only on loopback.
- Normal Auth0 mode requires your own public Auth0 application configuration. No credentials from the original deployment are included.
- File uploads are disabled in the visitor demo. Cover letters use HTTPS document links.
- Board moves persist the destination list. Ordering inside a list is creation order.
- External Auth0 and Cloudinary integrations are not exercised by the no-signup demo.
