
import { useState } from "react"
import { optionIcon } from "../../../../../../../public/assets"
import Input from "../../../../../../components/input/Input"
import TableComponent from "../../../../../../components/table/TableComponent"
import useGetAllBlogs from "../../../../../../hook/useGetAllBlogs"
import styles from "./View.module.scss"



const ViewPosts = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage] = useState<number>(10)
    const { posts, totalPages, isLoading } = useGetAllBlogs(currentPage, perPage)

    const headings = ["Title", "Slug", "Created", "Updated", "Action"]

    const tableBody = (
        <tbody>
            {posts.map((post) => (
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
                        <button className={styles.button}><img src={optionIcon} alt="option icon" /></button>
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
                        value=""
                        id="firstName"
                        type="text"
                        label=""
                        placeholder="Search posts"
                        alt={false}
                        showFilter={false}
                        onChange={() => { }}
                    />
                    <div className={styles.Container}>
                        <TableComponent
                            headings={headings}
                            bodyContent={tableBody}
                        />

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
                    </div>
                </>
            )}
        </div>
    )
}

export default ViewPosts