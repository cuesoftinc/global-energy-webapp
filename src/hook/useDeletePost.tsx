import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import api from "../utils/interceptor";


const useDeletePost = () => {
    const queryClient = useQueryClient();

    const deletePost = async (postId: string) => {
        await api.delete(`/post/${postId}`)
    };
    const mutation = useMutation(deletePost, {
        onSuccess: (_, postId) => {
            queryClient.invalidateQueries("getBlogPost");
            toast.success(`Post with ID: ${postId} deleted successfully`);
        },
        onError: () => {
            toast.error("Error deleting post");
        },
    });

    return mutation
}

export default useDeletePost