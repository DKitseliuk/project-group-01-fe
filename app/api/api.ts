<<<<<<< HEAD
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});
=======
// app/api/api.ts

import axios from 'axios';

const API_URL = process.env.API_URL;

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});
>>>>>>> main
