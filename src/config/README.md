# Configuration for deans-frontend

This file documents environment variables used by `src/config/index.js`.

Required (recommended) env var names:

- REACT_APP_API_BASE_URL - e.g. `https://api.example.com/api` (fallback: `http://localhost:8000/api`)
- REACT_APP_WS_URL - e.g. `wss://api.example.com/ws/crises/` (fallback: `ws://localhost:8000/api/ws/crises/`)
- REACT_APP_GOOGLE_MAPS_KEY - API key for Google Maps (if used)
- REACT_APP_DEFAULT_TIMEOUT_MS - default axios request timeout (ms) (default: 5000)
- REACT_APP_STORAGE_TOKEN_KEY - the localStorage key for token (default: `token`)
- REACT_APP_FEATURE_NEW_UI - feature flag value (`true`/`false`)

Notes:
- Do not commit secret keys to source control. Use environment variables in your CI/CD pipeline.
- For local development, use a `.env` file or `cross-env` in your npm scripts to set these values.
- Tests can override these env vars by setting them in the test configuration.

Routes:
- Routes are no longer stored in config. See `src/routes/index.js` for application route constants (single source of truth for navigation).

Adding new keys:
- To add additional config keys, add them to `src/config/index.js` and update `src/config/README.md` with expected env var names and fallback values.
