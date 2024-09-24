import styles from "./Home.module.scss"
// import image1 from "../../../../../public/assets/image1.svg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { edit, trash } from "../../../../../public/assets";
import api from "../../../../utils/interceptor";
import { useToggleMenu } from "../../../../utils/useToggleMenu";
import useGetAllBlogs from "../../../../hook/useGetAllBlogs";


const Home = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const queryClient = useQueryClient();
    const nav = useNavigate()
    const { toggleMenu } = useToggleMenu()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage] = useState<number>(10)

    const { posts, refetch, totalPages, isLoading } = useGetAllBlogs(currentPage, perPage)

    useEffect(() => {
        refetch();
    }, [refetch, currentPage, queryClient]);

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

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewNavigation = (id: string) => {
        nav(`/dashboard/view-post/${id}`)
    }

    const handleUpdateNavigation = (id: string) => {
        nav(`/dashboard/members-post/${id}`);
    };

    return (
        <main className={styles.main}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Search for posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={toggleMenu ? styles.blogContainer : styles.newBlogContainer}>
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <div key={post._id} className={styles.blogDiv}>
                                    <div>
                                        <div className={styles.imageContainer}>
                                            <img src={post.imgUrl} alt="Blog Post Image" />
                                        </div>
                                        <div className={styles.contentDiv}>
                                            <div className={styles.dateContainer}>
                                                <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className={styles.titleContainer}>
                                                <p className={styles.title}>{post.title}</p>
                                                <p className={styles.subtitle}>{post.subTitle}</p>
                                            </div>
                                            <div className={styles.postContainer}>
                                                <p className={styles.postContent}>{post.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.btnDiv}>
                                        <button
                                            className={styles.btn}
                                            onClick={() => handleViewNavigation(post._id)}
                                        >
                                            View Post
                                        </button>
                                        <div className={styles.iconDiv}>
                                            <img onClick={() => mutation.mutate(post._id)} src={trash} alt="trash icon" />
                                            <img onClick={() => handleUpdateNavigation(post._id)} src={edit} alt="edit icon" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No posts available</p>
                        )}
                    </div>
                    
                    <div className={styles.paginationContainer}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span>{currentPage} of {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </main>
    )
}


export default Home;
