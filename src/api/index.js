import axios from "axios";
import config from "../config";

// Create a dedicated axios client so we don't rely on global defaults
const client = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.DEFAULT_TIMEOUT_MS
});

// Attach Authorization header automatically if token is present
client.interceptors.request.use(cfg => {
  try {
    const token = localStorage.getItem(config.STORAGE_KEYS.TOKEN);
    if (token) cfg.headers.Authorization = `Token ${token}`;
  } catch (e) {
    // don't break in environments without localStorage (SSR / tests)
  }
  return cfg;
});

const _getCSRFToken = () => {
  const cookies = document.cookie && document.cookie.split("; ");
  let csrftoken = "";
  cookies.forEach(cookie => {
    if (cookie.slice(0, 9) === "csrftoken") {
      csrftoken = cookie.slice(10);
    }
  });
  return csrftoken;
};

const _getAuthToken = () => {
  try {
    return localStorage.getItem(config.STORAGE_KEYS.TOKEN);
  } catch (e) {
    return null;
  }
};

export const getCrises = () => {
  return client.get("/crises/");
};

export const reportCrises = form => {
  if (form) form.append("csrfmiddlewaretoken", _getCSRFToken());
  return client.post("/crises/", form);
};

export const userLogin = form => {
  if (form) form.append("csrfmiddlewaretoken", _getCSRFToken());
  return client.post("/rest-auth/login/", form); // it is important to keep the ending slash
};

export const userLogout = () => {
  const form = new FormData();
  form.append("csrfmiddlewaretoken", _getCSRFToken());
  return client.post("/rest-auth/logout/", form); // it is important to keep the ending slash
};

export const getUserList = () => {
  return client.get("/users/");
};

export const getCrisisType = () => {
  return client.get("/crisistype/");
};

export const getAssistanceType = () => {
  return client.get("/crisisassistance/");
};

export const dispatchCrisis = (id, phoneNumberToNotify) => {
  return client.put(
    "/crises/update-partial/" + id + "/",
    {
      crisis_status: "DP",
      phone_number_to_notify: phoneNumberToNotify
    }
  );
};

export const resolveCrisis = (id, undo) => {
  return client.put(
    "/crises/update-partial/" + id + "/",
    {
      crisis_status: undo ? "PD" : "RS"
    }
  );
};

export const addUser = form => {
  return client.post("/users/", form);
};

export const editUser = (id, form) => {
  return client.put("/users/update-partial/" + id + "/", form);
};

export const addCrisisType = form => {
  return client.post("/crisistype/", form);
};

export const addAssistanceType = form => {
  return client.post("/crisisassistance/", form);
};

export const getEmergencyAgencies = () => {
  return client.get("/emergencyagencies/");
};

export const addEmergencyAgencies = form => {
  return client.post("/emergencyagencies/", form);
};

export const editEmergencyAgencies = (id, form) => {
  return client.put("/emergencyagencies/update-partial/" + id + "/", form);
};

export const editSiteSettings = form => {
  return client.post("/sitesettings/", form);
};

export const getCurrentUser = () => {
  return client.get("/rest-auth/user/");
};

export const createWebSocket = () => {
  return new WebSocket(config.WS_URL);
};

export { client };

// from data.gov.sg
export const getHumidity = () => {
  return client.get("https://api.data.gov.sg/v1/environment/relative-humidity");
};

// from data.gov.sg
export const getPSI = () => {
  return client.get("https://api.data.gov.sg/v1/environment/psi");
};

// from data.gov.sg
export const getRainfall = () => {
  return client.get("https://api.data.gov.sg/v1/environment/rainfall");
};

// from data.gov.sg
export const getTemperature = () => {
  return client.get("https://api.data.gov.sg/v1/environment/air-temperature");
};
