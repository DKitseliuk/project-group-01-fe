import { LoginValues, RegisterValues } from "@/types/auth";
import axios from "axios";

const authApi = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

async function register(payload: RegisterValues) {
  const { data } = await authApi.post("/register", payload);
  return data;
}

async function login(payload: LoginValues) {
  const { data } = await authApi.post("/login", payload);
  return data;
}

export { register, login };
