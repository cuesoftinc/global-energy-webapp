import toast from "react-hot-toast"
import api from "../utils/interceptor"
import { useQuery } from "react-query";
import useDashboardStore from "../store/DashboardStore";

const useGetAllBlogs = (page: number, perPage: number) => {
    const { setPosts, setTotalItems, setTotalPages } = useDashboardStore()
    const posts = useDashboardStore((state) => state.posts)
    const totalItems = useDashboardStore((state) => state.totalItems)
    const totalPages = useDashboardStore((state) => state.totalPages)
    

    const getBlogPost = async () => {
        const response = await api.get("/post", {
            params: { page, perPage }
        })
        setTotalPages(response.data.totalPages)
        setTotalItems(response.data.totalItems)
        return response.data.data
    }

    const { refetch, isLoading } = useQuery("getBlogPost", getBlogPost, {
        onSuccess: (data) => {
            setPosts(data);
        },
        onError: () => {
            toast.error("error fetching data")
        },
        refetchOnWindowFocus: false
    })

    return { posts, refetch, totalPages, totalItems, isLoading }
}

export default useGetAllBlogs