import axios from "axios";
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
export const getapi = (search = "", status, page = 1, limit = 10, sort = "-createdAt", startDate, endDate) => {
  let url = `/admin/order?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&sort=${encodeURIComponent(sort)}`;
  if (startDate) url += `&startDate=${encodeURIComponent(startDate)}`;
  if (endDate) url += `&endDate=${encodeURIComponent(endDate)}`;
  return api.get(url);
};

export const getOrderById = (id) =>
  api.get(`/admin/order/${id}`);

export const updateOrder = (id, data) =>
  api.patch(`/admin/order/${id}`, data);
