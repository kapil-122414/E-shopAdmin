import axios, { create } from "axios";
const api = axios.create({
  baseURL: "https://categoryapi-oluc.onrender.com/api",
  withCredentials: true,
});

export const categoryget = (page) => api.get(`/category?page=${page}&limit=4`);
export const categorypost = (data) =>
  api.post("/category", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const categorydelete = (id) => {
  return api.delete(`/category/${id}`);
};
export const categoryupdate = (id, data) => {
  return api.patch(`/category/${id}`, data);
};
