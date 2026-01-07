// Centralized runtime config for deans-frontend
// Values are read from process.env (REACT_APP_*) with safe fallbacks
const getEnv = (key, fallback) => {
  const val = process.env[key];
  return typeof val === "undefined" ? fallback : val;
};

const config = {
  API_BASE_URL: getEnv("REACT_APP_API_BASE_URL", "http://localhost:8000/api"),
  WS_URL: getEnv("REACT_APP_WS_URL", "ws://localhost:8000/api/ws/crises/"),
  GOOGLE_MAPS_KEY: getEnv("REACT_APP_GOOGLE_MAPS_KEY", ""),
  DEFAULT_TIMEOUT_MS: Number(getEnv("REACT_APP_DEFAULT_TIMEOUT_MS", 5000)),
  STORAGE_KEYS: {
    TOKEN: getEnv("REACT_APP_STORAGE_TOKEN_KEY", "token"),
    USER: getEnv("REACT_APP_STORAGE_USER_KEY", "user")
  },
  FEATURE_FLAGS: {
    NEW_UI: getEnv("REACT_APP_FEATURE_NEW_UI", "false") === "true"
  },
  // ROUTES are now defined in src/routes/index.js to separate routing concerns from environment config.
};

export default config;
