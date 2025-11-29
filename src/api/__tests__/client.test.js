import config from "../../config";
import { client } from "../index";

describe("axios client configuration", () => {
  test("client defaults match config", () => {
    expect(client.defaults.baseURL).toBe(config.API_BASE_URL);
    expect(client.defaults.timeout).toBe(config.DEFAULT_TIMEOUT_MS);
  });

  test("request interceptor attaches Authorization header when token exists", () => {
    const token = "fake-token";
    global.localStorage = {
      getItem: jest.fn(() => token)
    };

    const handlers = client.interceptors.request.handlers;
    expect(handlers.length).toBeGreaterThan(0);
    const fulfilled = handlers[0].fulfilled;
    const cfg = { headers: {} };
    const result = fulfilled(cfg);
    expect(result.headers.Authorization).toBe(`Token ${token}`);
  });
});
