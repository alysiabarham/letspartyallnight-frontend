// src/socket.ts
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://letspartyallnight-backend.onrender.com";
console.log("🧪 VITE_BACKEND_URL at runtime:", import.meta.env.VITE_BACKEND_URL);

if (!backendUrl) {
  throw new Error("❌ VITE_BACKEND_URL is not defined. Check Vercel env vars.");
}

export const socket = io(backendUrl, {
  transports: ["websocket"],
  autoConnect: true,
});
