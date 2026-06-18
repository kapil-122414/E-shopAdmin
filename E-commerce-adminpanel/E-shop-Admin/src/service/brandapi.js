import axios from "axios";
const api = axios.create({
  baseURL: "https://categoryapi-oluc.onrender.com/api",
  withCredentials: true,
});
export const brandpost = (data) =>
  api.post("/brand", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const brandget = (page, search) => {
  return api.get(
    `/brand?page=${page}&limit=4&search=${encodeURIComponent(search)}`,
  );
};
export const branddelete = (id) => {
  return api.delete(`/brand/${id}`);
};
export const brandget_byid = (id) => {
  return api.get(`/brand/${id}`);
};
export const brandupdate = (id, data) => {
  return api.patch(`/brand/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
