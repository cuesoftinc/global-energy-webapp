import axios from 'axios';
import Cookies from 'js-cookie';

export const handleRefreshToken = async (retryRequest: () => Promise<any>) => {
    const refreshToken = Cookies.get('glbRTK');

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Save new tokens
        Cookies.set('glbATK', accessToken, { expires: 1 / 24 });
        Cookies.set('glbRTK', newRefreshToken, { expires: 7 });

        // Retry original request with new access token
        return retryRequest();
    } catch (error) {
        console.error("Error during token refresh:", error);
        throw error; // Rethrow the error to be handled by the response interceptor
    }
};
