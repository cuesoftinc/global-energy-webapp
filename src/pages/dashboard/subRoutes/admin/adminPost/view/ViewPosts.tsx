
import { useState } from "react"
import { optionIcon } from "../../../../../../../public/assets"
import Input from "../../../../../../components/input/Input"
import TableComponent from "../../../../../../components/table/TableComponent"
import useGetAllBlogs from "../../../../../../hook/useGetAllBlogs"
import styles from "./View.module.scss"
import { useNavigate } from "react-router-dom"
import useDeletePost from "../../../../../../hook/useDeletePost"



const ViewPosts = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage] = useState<number>(10)
    const { posts, totalPages, isLoading } = useGetAllBlogs(currentPage, perPage)

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [toggleOptionModal, setToggleOptionModal] = useState<{ [key: string]: boolean }>({});
    const nav = useNavigate()
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase())
    }

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggle = (postId: string) => {
        setToggleOptionModal(prev => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    }
    const handleView = (id: string) => {
        nav(`/dashboard/view-post/${id}`)
    }
    const handleUpdate = (id: string) => {
        nav(`/dashboard/members-post/${id}`);
    };

    const deletePostMutation = useDeletePost()

    const handleDelete = (postId: string) => {
        deletePostMutation.mutate(postId)
    };


    const headings = ["Title", "Slug", "Created", "Updated", "Action"]

    const tableBody = (
        <tbody>
            {filteredPosts.map((post) => (
                <tr key={post._id}>
                    <td className={styles.customTD1}>
                        <div className={styles.webkitBox}>{post.title}</div>
                    </td>
                    <td className={styles.customTD2}>
                        <div className={styles.webkitBox}>{post.content}</div>
                    </td>
                    <td className={styles.customTD3}>{new Date(post.createdAt).toLocaleString()}</td>
                    <td className={styles.customTD4}>{new Date(post.updatedAt).toLocaleString()}</td>
                    <td className={styles.customTD5}>
                        <button className={styles.button} onClick={() => handleToggle(post._id)}><img src={optionIcon} alt="option icon" /></button>
                        {toggleOptionModal[post._id] && (
                            <div className={styles.optionModal}>
                                <button className={`${styles.optionButton} ${styles.view}`} onClick={() => handleView(post._id)}>View Post</button>
                                <button className={`${styles.optionButton} ${styles.update}`} onClick={() => handleUpdate(post._id)}>Update Post</button>
                                <button className={`${styles.optionButton} ${styles.delete}`} onClick={() => handleDelete(post._id)}>Delete Post</button>
                            </div>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    )

    return (
        <div className={styles.main}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Input
                        value={searchTerm}
                        id="firstName"
                        type="text"
                        label=""
                        placeholder="Search by title"
                        alt={false}
                        showFilter={false}
                        onChange={handleSearch}
                    />
                    {filteredPosts.length > 0 ? (
                        <div className={styles.Container}>
                            <TableComponent
                                headings={headings}
                                bodyContent={tableBody}
                            />

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
                        </div>
                    ) : (
                        <p>No posts found</p>
                    )}
                </>
            )}
        </div>
    )
}

export default ViewPosts