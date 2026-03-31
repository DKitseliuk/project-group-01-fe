// app/lib/api.ts

import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:3001';

export const nextServer = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export const backendServer = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export const api = nextServer;