import toast from "react-hot-toast"
import api from "../utils/interceptor"
import { useQuery } from "react-query";
import useUsersStore from "../store/UserStore";

const useGetAllUsers = (page: number, perPage: number) => {
    const { setUsers, setTotalPages, setTotalItems } = useUsersStore();

    const getAllUsers = async () => {
        const response = await api.get("/user", {
            params: { page, perPage }
        })
        setTotalPages(response.data.totalPages)
        setTotalItems(response.data.totalItems)
        return response.data.data
    }
    const {isLoading } = useQuery("getAllUsers", getAllUsers, {
        onSuccess: (data) => {
            setUsers(data);
        },
        onError: () => {
            toast.error("error fetching users")
        }
    })

    return { isLoading, ...useUsersStore() }
}

export default useGetAllUsers