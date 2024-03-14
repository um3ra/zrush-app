import axios, { type CreateAxiosDefaults } from "axios";

import { extractErrorMessage } from "../lib/error.helper";
import { authService } from "./api-user/auth.service";
import { getAccessToken, removeFromStorage } from "./api-user/token-storage";

const options: CreateAxiosDefaults = {
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
};

const axiosInstance = axios.create(options);
const axiosInstanceWithAuth = axios.create(options);

axiosInstanceWithAuth.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (config?.headers && accessToken)
        config.headers.Authorization = accessToken;

    return config;
});

axiosInstanceWithAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (
            (error?.response?.status === 401 ||
                extractErrorMessage(error) === "jwt expired" ||
                extractErrorMessage(error) === "jwt must be provided") &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await authService.getNewTokens();
                return axiosInstanceWithAuth.request(originalRequest);
            } catch (error) {
                if (extractErrorMessage(error) === "jwt expired")
                    removeFromStorage();
            }
        }

        throw error;
    }
);

export { axiosInstance, axiosInstanceWithAuth };
