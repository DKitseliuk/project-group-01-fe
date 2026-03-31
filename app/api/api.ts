// app/api/api.ts

import axios from 'axios';

const DEFAULT_API_URL = 'https://relax-map-api.onrender.com';
const API_URL = (process.env.API_URL ?? DEFAULT_API_URL).replace(/\/$/, '');

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});
