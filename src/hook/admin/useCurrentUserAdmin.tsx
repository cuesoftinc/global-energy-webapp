import { useParams } from "react-router-dom";
import useCurrentUserStore from "../../store/CurrentUserStore";
import api from "../../utils/interceptor";
import { useQuery } from "react-query";
import toast from "react-hot-toast";



const useCurrentUserAdmin = () => {
    const { id } = useParams<{ id: string }>()

    const { setViewedUser } = useCurrentUserStore()

    const getUserById = async () => {
        if (!id) {
            return null;
        }
        const response = await api.get(`/user/${id}`)
        return response.data;
    };

    useQuery(["getUserById", id], getUserById, {
        enabled: !!id,
        onSuccess: (data) => {
            setViewedUser(data);
        },
        onError: () => {
            toast.error('Error fetching user by ID');
        },
    });
    return { viewedUser: useCurrentUserStore((state) => state.viewedUser) };

}

export default useCurrentUserAdmin

