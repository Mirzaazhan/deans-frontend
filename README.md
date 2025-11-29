# Dean's Crisis Management System (Web Client UI)

[![CircleCI](https://circleci.com/gh/Deans-CMS/deans-frontend.svg?style=svg)](https://circleci.com/gh/Deans-CMS/deans-frontend)

## How to start

1. Install dependencies

`$ yarn install`

2. Run on a development server

`$ yarn start`

3. The development server runs on `localhost:3000`

## Environment configuration

This frontend reads runtime configuration from environment variables (prefixed with `REACT_APP_`). Important variables:

- `REACT_APP_API_BASE_URL` - base URL for the backend API (default: `http://localhost:8000/api`)
- `REACT_APP_WS_URL` - WebSocket endpoint for realtime crises (default: `ws://localhost:8000/api/ws/crises/`)
- `REACT_APP_GOOGLE_MAPS_KEY` - Google Maps API key when using the GMap component
- `REACT_APP_DEFAULT_TIMEOUT_MS` - default axios timeout in ms (default: 5000)
- `REACT_APP_STORAGE_TOKEN_KEY` - localStorage key to store the token (default: `token`)
- `REACT_APP_FEATURE_NEW_UI` - feature flag (`true`/`false`)

See `src/config/README.md` for more details and development notes.

## Summary of reengineering changes on Assigment 1 (by Rahimi)

This project has been updated to centralize runtime configuration and reduce duplicated magic strings:

- Centralized runtime config in `src/config/index.js` — API base URL, WebSocket URL, feature flags, timeout and storage keys are read from `REACT_APP_*` environment variables with safe fallbacks.
- Separate `src/routes/index.js` provides a single source of truth for app routes (e.g. `ROUTE_HOME`, `ROUTE_DASHBOARD`), used throughout components.
- Replaced global `axios.defaults` with a dedicated `client` (`axios.create(...)`) in `src/api/index.js`; added a request interceptor to attach auth tokens from localStorage.
- WebSocket creation now uses `REACT_APP_WS_URL` from config (`createWebSocket()` uses `config.WS_URL`).
- Replaced hard-coded Google Maps key in `src/components/GMap` with `config.GOOGLE_MAPS_KEY`.
- Updated NavBar, PageLogin, PageStaff and other components to use the `ROUTES` module rather than hard-coded routes.
- Added tests for config defaults, `client` defaults and header interceptor, and verification of `createWebSocket` usage.

These changes improve maintainability and testability, reduce duplication and hard-coded literals, and make the app safer to configure per environment.

## Running tests

Run the full test suite with:

```powershell
npm test
```

Run specific tests:

```powershell
npm test -- -t config
npm test -- -t client
npm test -- -t websocket
```
