import axios from "axios";
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
export const getapi = (search = "", status) =>
  api.get(
    `/admin/order?page=1&limit=4&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`,
  );

export const getOrderById = (id) =>
  api.get(`/admin/order/${id}`);

export const updateOrder = (id, data) =>
  api.patch(`/admin/order/${id}`, data);
