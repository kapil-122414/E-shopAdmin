import axios from "axios";
const api = axios.create({
  baseURL: "https://categoryapi-oluc.onrender.com/api",
  withCredentials: true,
});
export const getapi = (search = "", status) =>
  api.get(
    `/admin/order?page=1&limit=4&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`,
  );
