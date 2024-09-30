import axios from "axios";
import Cookies from "js-cookie";
import { handleRefreshToken } from "./RefreshFunction";

const api = axios.create({
    baseURL: import.meta.env.VITE_MY_BASE_URL,
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("glbATK");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh and retry original request
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error;
        
        // Only handle 401 status and ensure it's due to an expired token
        if (response && response.status === 401 && !config.__isRetryRequest) {
            config.__isRetryRequest = true; // Mark the request as a retry to avoid infinite loops

            try {
                // Refresh token and retry original request
                await handleRefreshToken(() => api(config));
                return api(config); // Retry the original request with the new token
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
