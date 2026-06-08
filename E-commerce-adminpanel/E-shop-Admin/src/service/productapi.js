import axios from "axios";
const api = axios.create({
  baseURL: "https://categoryapi-oluc.onrender.com/api",
  withCredentials: true,
});
export const categorys = () => api.get("/category");

export const brand = () => api.get("/brand");
export const createDescription = (data) =>
  api.post("/generate-description", data);
export const postproduct = (data) => {
  return api.post("/product", data);
};
export const productget = (page, search, status) => {
  return api.get(
    `/product?page=${page}&limit=4&search=${search}&status=${status}`,
    {
      headers: {
        "Cache-Control": "no-cache",
      },
    },
  );
};
