import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { refreshPostRequest } from "./apiClient";

const usePostRefreshToken = () => {

    const refreshPostAccess = async (currentRefreshToken: string) => {
        const base = import.meta.env.VITE_BASE_URL;
        const url = `${base}/auth/refresh-token`;
        const response = await refreshPostRequest(url, { refreshToken: currentRefreshToken });
        console.log("API Response:", response.data)
        return response.data;
    };

    const { mutate: refreshAccessMutate } = useMutation(refreshPostAccess, {
        onSuccess: (data) => {
            if (data && data.accessToken && data.refreshToken) {
                Cookies.set("glbATK", data.accessToken, { expires: 1 / 24 });
                Cookies.set("glbRTK", data.refreshToken, { expires: 7 });
            }
        },
        onError: (error: any) => {
            console.error("Error during token refresh:", error);
        }
    });


    return { refreshAccessMutate };
};

export default usePostRefreshToken;
