import axios from "axios";

const api = axios.create({
  baseURL: "https://categoryapi-oluc.onrender.com/api",
  withCredentials: true,
});

export const getuser = () => api.get("/login");

export const createuser = (fromdata) => {
  return api.post("/login", fromdata);
};