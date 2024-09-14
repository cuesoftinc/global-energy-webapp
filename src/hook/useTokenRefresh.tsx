import { useEffect } from 'react';
import useRefreshToken from '../utils/usePostRefresh'; 
import Cookies from "js-cookie";

const useTokenRefresh = () => {
    const { refreshAccessMutate } = useRefreshToken();

    useEffect(() => {
        const refreshToken = Cookies.get("glbRTK");

        // Trigger an immediate refresh on component mount
        const handleTokenRefresh = async () => {
            if (refreshToken) {
                try {
                    await refreshAccessMutate(refreshToken);
                    console.log("Token refreshed successfully");
                } catch (error) {
                    console.error("Error during token refresh:", error);
                }
            } else {
                console.log("No refresh token found");
            }
        };

        // Call the function immediately on mount
        handleTokenRefresh();

        // Set up the interval to refresh every 15 minutes
        const refreshInterval = 15 * 60 * 1000; // 15 minutes
        const intervalId = setInterval(handleTokenRefresh, refreshInterval);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [refreshAccessMutate]);
};

export default useTokenRefresh;
