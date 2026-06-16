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

export const brandget = () => api.get("/brand");
