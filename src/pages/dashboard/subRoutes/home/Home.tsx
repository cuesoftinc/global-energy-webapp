import styles from "./Home.module.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { edit, trash } from "../../../../../public/assets";
import { useToggleMenu } from "../../../../utils/useToggleMenu";
import useGetAllBlogs from "../../../../hook/useGetAllBlogs";
import useDeletePost from "../../../../hook/useDeletePost";


const Home = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const nav = useNavigate()
    const { toggleMenu } = useToggleMenu()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage] = useState<number>(10)

    const { posts, refetch, totalPages, isLoading } = useGetAllBlogs(currentPage, perPage)

    useEffect(() => {
        refetch();
    }, [refetch, currentPage]);


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

    const deletePostMutation = useDeletePost()

    const handleDelete = (postId: string) => {
        deletePostMutation.mutate(postId)
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
                    {filteredPosts.length > 0 ? (
                        <>
                            <div className={toggleMenu ? styles.blogContainer : styles.newBlogContainer}>
                                {filteredPosts.map((post) => (
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
                                                <img onClick={() => handleDelete(post._id)} src={trash} alt="trash icon" />
                                                <img onClick={() => handleUpdateNavigation(post._id)} src={edit} alt="edit icon" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.paginationContainer}>
                                <button
                                    className={styles.prevBtn}
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </button>
                                <span>{currentPage} of {totalPages}</span>
                                <button
                                    className={styles.nextBtn}
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>No posts found</p>
                    )}
                </>
            )}
        </main>
    )
}


export default Home;
