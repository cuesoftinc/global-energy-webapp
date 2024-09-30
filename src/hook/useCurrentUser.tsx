import { useQuery } from "react-query";
import toast from "react-hot-toast";
import api from "../utils/interceptor";
import useCurrentUserStore from "../store/CurrentUserStore";


const useCurrentUser = () => {

    const { setCurrentUser } = useCurrentUserStore()

    const getCurrentUser = async () => {
        const response = await api.get(`/user/me`)
        return response.data;
    };

    useQuery("getCurrentUser", getCurrentUser, {
        onSuccess: (data) => {
            if (data) {
                setCurrentUser(data)
            }
        },
        onError: () => {
            toast.error('Error fetching user');
        },
    });

    return { currentUser: useCurrentUserStore((state) => state.currentUser) };

}

export default useCurrentUser

