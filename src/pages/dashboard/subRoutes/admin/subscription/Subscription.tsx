import { optionIcon } from "../../../../../../public/assets"
import styles from "./Subscription.module.scss"
import TableComponent from "../../../../../components/table/TableComponent"
import Input from "../../../../../components/input/Input"
import { useState } from "react"
import useGetAllSubscription from "../../../../../hook/useGetAllSubscription"


const Subscription = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage] = useState<number>(10)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [toggleOptionModal, setToggleOptionModal] = useState<{ [key: string]: boolean }>({});

    const { subs, totalPages, isLoading } = useGetAllSubscription(currentPage, perPage)

    const filteredSubs = subs.filter((sub) => sub.userId.toLocaleLowerCase().includes(searchTerm.toLowerCase()) || sub.paymentId.toLowerCase().includes(searchTerm.toLowerCase()))


    const handleToggle = (subId: string) => {
        setToggleOptionModal(prev => ({
            ...prev,
            [subId]: !prev[subId],
        }));
    }

    // const handleUpdate = (id: string) => {
    //     nav(`/dashboard/members-post/${id}`);
    // };

    // const deletePostMutation = useDeletePost()

    // const handleDelete = (postId: string) => {
    //     deletePostMutation.mutate(postId)
    // };


    const headings = ["type", "userid", "paymentid", "amount", "createdat", "Action"]

    const tableBody = (
        <tbody>
            {filteredSubs.map((sub) => (
                <tr key={sub.id}>
                    <td className={styles.customTD1}>{sub.type}</td>
                    <td className={styles.customTD2}>{sub.userId}</td>
                    <td className={styles.customTD3}>{sub.paymentId}</td>
                    <td className={styles.customTD4}>{sub.amount}</td>
                    <td className={styles.customTD5}>{new Date(sub.createdAt).toLocaleString()}</td>
                    <td className={styles.customTD6}>
                        <button onClick={() => handleToggle(sub.id)} className={styles.button}><img src={optionIcon} alt="option icon" /></button>
                        {toggleOptionModal[sub.id] && (
                            <div className={styles.optionModal}>
                                <button className={`${styles.optionButton} ${styles.view}`}>View User</button>
                                <button className={`${styles.optionButton} ${styles.update}`}>Update User</button>
                                <button className={`${styles.optionButton} ${styles.delete}`}>Delete User</button>
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
                        placeholder="Search by userId or paymentId"
                        alt={false}
                        showFilter={false}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {filteredSubs.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <p>No Subscriptions Found</p>
                    )}
                </>
            )}
        </div>
    )
}
export default Subscription