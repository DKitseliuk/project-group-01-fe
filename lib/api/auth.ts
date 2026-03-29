import axios from "axios";

const authApi = axios.create({
  baseURL: "https://relax-map-api.onrender.com/api/auth",
  withCredentials: true,
});

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};

async function register(payload: RegisterRequest) {
  const { data } = await authApi.post("/register", payload);
  return data;
}

async function login(payload: LoginRequest) {
  const { data } = await authApi.post("/login", payload);
  return data;
}

export { register, login };
