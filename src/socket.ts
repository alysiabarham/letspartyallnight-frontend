// src/socket.ts
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", backendUrl); // ✅ debug log

export const socket = io(backendUrl, {
  withCredentials: true,
  transports: ["websocket"],
});
