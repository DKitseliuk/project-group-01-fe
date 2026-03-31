// app/lib/api.ts

import axios from 'axios';

const DEFAULT_API_URL = 'https://relax-map-api.onrender.com';

const API_URL = (process.env.API_URL ?? DEFAULT_API_URL).replace(/\/$/, '');
const NEXT_PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(
  /\/$/,
  ''
);

const backendServer = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

const nextServer = axios.create({
  baseURL: NEXT_PUBLIC_API_URL ? `${NEXT_PUBLIC_API_URL}/api` : '/api',
  withCredentials: true,
});

export { backendServer, nextServer };
