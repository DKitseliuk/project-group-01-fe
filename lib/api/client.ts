import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});
