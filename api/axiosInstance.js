import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:8082/api/v1",
    baseURL: "http://10.10.103.149:8082/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location = "/";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
