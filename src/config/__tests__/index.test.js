import config from "../index";

describe("config defaults", () => {
  test("has sensible fallback for API_BASE_URL", () => {
    expect(config.API_BASE_URL).toBe("http://localhost:8000/api");
  });

  test("has a default WS_URL", () => {
    expect(config.WS_URL).toBe("ws://localhost:8000/api/ws/crises/");
  });

  test("exposes storage keys", () => {
    expect(config.STORAGE_KEYS).toHaveProperty("TOKEN");
  });
});
