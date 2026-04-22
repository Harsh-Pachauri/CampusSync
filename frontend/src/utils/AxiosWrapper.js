import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

axiosWrapper.interceptors.request.use((config) => {
  // Ensure the URL starts with /api if it's a relative path and doesn't have it
  if (config.url && config.url.startsWith('/') && !config.url.startsWith('/api')) {
    config.url = `/api${config.url}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosWrapper.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.data?.message === "Invalid or expired token" &&
      error.response?.data?.success === false &&
      error.response?.data?.data === null
    ) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosWrapper;
