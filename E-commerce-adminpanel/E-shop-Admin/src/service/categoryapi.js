import axios, { create } from "axios";
const api = axios.create({
  baseURL: "https://categoryapi-oluc.onrender.com/api",
  withCredentials: true,
});

export const categoryget = () => api.get("/category");
export const categorypost = (data) =>
  api.post("/category", data, {
    headers: {
      "Content-Length": "multipart/form-data",
    },
  });
export const categorydelete = (id) => {
  return api.delete(`/category/${id}`);
};
