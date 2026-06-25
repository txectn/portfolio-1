import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constants";

export const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        const isAuth = config.isAuth !== false;

        delete config.isAuth;

        if (token && isAuth) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);