import { useState } from "react"
import { optionIcon } from "../../../../../../../public/assets"
import Input from "../../../../../../components/input/Input"
import TableComponent from "../../../../../../components/table/TableComponent"
import useGetAllUsers from "../../../../../../hook/useGetAllUsers"
import styles from "./Viewusers.module.scss"
import { useNavigate } from "react-router-dom"
import UpdateAccountModal from "../../../profile/modals/updateModal/UpdateModal"
import Overlay from "../../../../../../components/overlay/OverlayComponent"
import DeleteModal from "../../../profile/modals/DeleteModal"


const ViewUsers = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage] = useState<number>(10)
    const [toggleOptionModal, setToggleOptionModal] = useState<{ [key: string]: boolean }>({});
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState<string | undefined>()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [selectedId, setSelectedId] = useState<string | undefined>()
    const nav = useNavigate()

    const { users, totalPages, isLoading } = useGetAllUsers(currentPage, perPage)

    const handleToggle = (userId: string) => {
        setToggleOptionModal(prev => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    }

    const handleViewProfile = (id: string) => {
        if (id) {
            nav(`/dashboard/user-profile/${id}`)
            console.log("view", id)
        }
    }

    const handleUpdateModal = (userId: string) => {
        setShowUpdateModal(true)
        setSelectedUserId(userId)
    }

    const handleDeleteModal = (userId: string) => {
        setShowDeleteModal(true)
        setSelectedId(userId)
    }

    const filteredUsers = users.filter((user) => user.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))

    const headings = ["Name", "Email", "Account", "Subscription", "Creation", "Action"]

    const tableBody = (
        <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td className={styles.customTD1}>{user.name}</td>
                    <td className={styles.customTD2}>{user.email}</td>
                    <td className={styles.customTD3}>{user.accountType}</td>
                    <td className={styles.customTD4}>{user.subscriptionType}</td>
                    <td className={styles.customTD5}>{new Date(user.createdAt).toLocaleString()}</td>
                    <td className={styles.customTD6}>
                        <button onClick={() => handleToggle(user.id)} className={styles.button}><img src={optionIcon} alt="option icon" /></button>
                        {toggleOptionModal[user.id] && (
                            <div className={styles.optionModal}>
                                <button onClick={() => handleViewProfile(user.id)} className={`${styles.optionButton} ${styles.view}`}>View User</button>
                                <button onClick={() => handleUpdateModal(user.id)} className={`${styles.optionButton} ${styles.update}`}>Update User</button>
                                <button onClick={() => handleDeleteModal(user.id)} className={`${styles.optionButton} ${styles.delete}`}>Delete User</button>
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
                        placeholder="Search for users by name or email"
                        alt={false}
                        showFilter={false}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {filteredUsers.length > 0 ? (
                        <div>
                            <Overlay showOverlay={showUpdateModal} onCloseOverlay={() => setShowUpdateModal(false)}>
                                {selectedUserId && (
                                    console.log("update", selectedUserId),
                                    <UpdateAccountModal
                                        userId={selectedUserId}
                                        onCloseOverlay={() => setShowUpdateModal(false)}
                                    />
                                )}
                            </Overlay>
                            <Overlay showOverlay={showDeleteModal} onCloseOverlay={() => setShowDeleteModal(false)}>
                                {selectedId && (
                                    <DeleteModal userId={selectedUserId} onCloseOverlay={() => setShowDeleteModal(false)} />
                                )}
                            </Overlay>

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
                        </div>
                    ) : (
                        <p>No posts found</p>
                    )}
                </>
            )}
        </div>
    )
}

export default ViewUsers