import { websocketUrl } from "../config";

let socket = null;
let listeners = [];
let reconnectTimer = null;
let manuallyDisconnected = false;

export const connectWebSocket = () => {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return socket;
  }

  const url = websocketUrl();
  if (!url) return null;

  manuallyDisconnected = false;

  try {
    socket = new WebSocket(url);
  } catch (error) {
    console.error("WebSocket initialization failed:", error);
    scheduleReconnect();
    return null;
  }

  socket.onopen = () => {
    console.log("websocket connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      listeners.forEach((callback) => callback(data));
    } catch (error) {
      console.error("WS parse error:", error);
    }
  };

  socket.onclose = (event) => {
    console.log("websocket disconnected", event.code, event.reason);
    socket = null;
    scheduleReconnect();
  };

  socket.onerror = (event) => {
    // WebSocket browser events do not expose the underlying network error.
    console.error("WebSocket connection error", event);
  };

  return socket;
};

function scheduleReconnect() {
  if (manuallyDisconnected || reconnectTimer !== null) return;

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    if (!manuallyDisconnected) connectWebSocket();
  }, 5000);
}

export const subscribeWebSocket = (callback) => {
  listeners.push(callback);

  return () => {
    listeners = listeners.filter((cb) => cb !== callback);
  };
};

export const disconnectWebSocket = () => {
  manuallyDisconnected = true;

  if (reconnectTimer !== null) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  if (socket) {
    const currentSocket = socket;
    socket = null;
    currentSocket.close();
  }

  listeners = [];
};
