import axios from "axios";
const api = axios.create({
  baseURL: "https://categoryapi-oluc.onrender.com/api",
  withCredentials: true,
});
export const categorys = () => api.get("/category");
export const brand = () => api.get("/brand");
export const createDescription = () => api.post("/generate-description");
