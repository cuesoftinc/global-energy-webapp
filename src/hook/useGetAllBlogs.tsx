import toast from "react-hot-toast"
import api from "../utils/interceptor"
import { BlogPost } from "../types";
import { useState } from "react";
import { useQuery } from "react-query";

const useGetAllBlogs = (page: number, perPage: number) => {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalItems, setTotalItems] = useState<number>(0)


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
        }
    })

    return { posts, refetch, totalPages, totalItems, isLoading}
}

export default useGetAllBlogs