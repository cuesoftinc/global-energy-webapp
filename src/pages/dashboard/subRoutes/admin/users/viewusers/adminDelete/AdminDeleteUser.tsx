import api from "../../../../../../../utils/interceptor"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import Button from "../../../../../../../components/button/Button"
import styles from "./AdminDelete.module.scss"


interface DeleteAccountModalProps {
    userId: string | undefined
    onCloseOverlay: () => void
}

const AdminDeleteModal: React.FC<DeleteAccountModalProps> = ({ userId, onCloseOverlay }) => {

    const deleteUser = async () => {
        try {
            await api.delete(`/user/deleteByAdmin/${userId}`)
            toast.success("User deleted successfully")
            Cookies.remove("glbATK")
            Cookies.remove("glbRTK")
            window.location.reload()
            onCloseOverlay()
        } catch (error: any) {
            toast.error(error.response?.data?.message?.message || "Error deleting user")
        }
    }
    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        deleteUser();
    };


    return (
        <div className={styles.main}>
            <div>
                <div className={styles.header}>
                    <h1>Delete Account</h1>
                    <p className={styles.delSubtitle}>This is a permanent action and cannot be reversed.</p>
                </div>
            </div>
            <Button
                type="submit"
                isLoading={false}
                disabled={false}
                className={styles.delButton}
                action={handleDelete}
            >
                Delete Account
            </Button>
        </div>
    )
}

export default AdminDeleteModal