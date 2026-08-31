import axios from "axios";
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
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
export const productdelete = (id) => {
  return api.delete(`/product/${id}`);
};
export const productedit = (id, data) => {
  return api.patch(`/product/${id}`, data);
};
export const getbyid = (id) => {
  return api.get(`/product/${id}`);
};
export const getDashboardStats = () => {
  return api.get("/dashboard/stats");
};
export const getCustomers = (page, search, limit = 10, sortBy = "createdAt", sortOrder = "desc") => {
  return api.get(`/admin/customers?page=${page}&search=${encodeURIComponent(search)}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
};
export const getCustomerById = (id) => {
  return api.get(`/admin/customers/${id}`);
};
export const updateCustomer = (id, data) => {
  return api.patch(`/admin/customers/${id}`, data);
};
export const deleteCustomer = (id) => {
  return api.delete(`/admin/customers/${id}`);
};
