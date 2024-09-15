import { useState } from "react";
import { useQuery } from "react-query";
import { User } from "../../../../types";
import api from "../../../../utils/interceptor";
import toast from "react-hot-toast";



export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const getCurrentUser = async () => {
        const response = await api.get(`/user/me`);
        return response.data;
    };

    const query = useQuery("getCurrentUser", getCurrentUser, {
        onSuccess: (data) => {
            setCurrentUser(data);
        },
        onError: () => {
            toast.error('Error fetching post');
        }
    });

    return { currentUser, ...query };
  
}

export default useCurrentUser

