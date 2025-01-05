import axios, { AxiosInstance } from "axios";

const URI = import.meta.env.VITE_BACKEND_URI;

if (!URI) {
  throw new Error("Missing VITE_BACKEND_URI environment variable");
}

const API: AxiosInstance = axios.create({
  baseURL: URI,
  withCredentials: true,
});
// API.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const { statusCode, data } = error.response;
//     return Promise.reject({ statusCode, ...data });
//   }
// );

export default API;
