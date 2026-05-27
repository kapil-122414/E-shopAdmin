import axios, { create } from "axios";
const api = axios.create({
  baseURL: "https://categoryapi-oluc.onrender.com/api",
  withCredentials: true,
});

export const categoryget = () => api.get("/category");

