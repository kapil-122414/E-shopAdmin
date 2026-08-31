import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export const getuser = () => api.get("/login");

export const createuser = (fromdata) => {
  return api.post("/login", fromdata);
};