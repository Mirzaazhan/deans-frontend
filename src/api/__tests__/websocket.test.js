import config from "../../config";
import * as api from "../index";

describe("WebSocket usage", () => {
  const OriginalWebSocket = global.WebSocket;

  beforeEach(() => {
    global.WebSocket = jest.fn();
  });
  afterEach(() => {
    global.WebSocket = OriginalWebSocket;
  });

  test("createWebSocket uses config.WS_URL", () => {
    api.createWebSocket();
    expect(global.WebSocket).toHaveBeenCalledWith(config.WS_URL);
  });
});
