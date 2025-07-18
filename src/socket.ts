// src/socket.ts
import { io } from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_SOCKET_URL!;
const socket = io(BACKEND_URL, {
  withCredentials: true
});

export default socket;
