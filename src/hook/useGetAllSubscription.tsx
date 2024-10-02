import toast from "react-hot-toast"
import api from "../utils/interceptor"
import { useQuery } from "react-query";
import useSubscriptionStore from "../store/subscriptionStore";

const useGetAllSubscription = (page: number, perPage: number) => {

    const { setSubs, setTotalItems, setTotalPages } = useSubscriptionStore()

    const getAllSub = async () => {
        const response = await api.get("/subscription", {
            params: { page, perPage }
        })
        setTotalPages(response.data.totalPages)
        setTotalItems(response.data.totalItems)
        return response.data.data
    }

    const { isLoading } = useQuery("getBlogPost", getAllSub, {
        onSuccess: (data) => {
            setSubs(data);
        },
        onError: () => {
            toast.error("error fetching data")
        }
    })

    return { isLoading, ...useSubscriptionStore() }
}

export default useGetAllSubscription