import { useState } from "react"
import api from "../../../../../utils/interceptor"
import toast from "react-hot-toast";
import styles from "./Update.module.scss"
import Input from "../../../../../components/input/Input";
import Button from "../../../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


interface DeleteAccountModalProps {
    userId: string | undefined
    onCloseOverlay: () => void
}

const DeleteModal: React.FC<DeleteAccountModalProps> = ({ userId, onCloseOverlay }) => {
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const deleteUser = async ({ password }: { password: string }) => {
        try {
            await api.delete(`/user/${userId}`, {
                data: { password }
            });
            toast.success("User deleted successfully")
            Cookies.remove("glbATK")
            Cookies.remove("glbRTK")
            onCloseOverlay()
            navigate("/")
            window.location.reload();
        } catch (error: any) {
            toast.error(error.response?.data?.message?.message || "Error deleting user")
        }
    }
    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        deleteUser({ password });
    };


    return (
        <div className={styles.main}>
            <div>
                <div className={styles.header}>
                    <h1>Delete Account</h1>
                    <p className={styles.delSubtitle}>This is a permanent action. Please enter your<span className={styles.delSPan}>password to confirm deletion.</span></p>
                </div>
            </div>
            <form onSubmit={handleDelete} className={styles.formContent}>
                <Input
                    id="password"
                    label=""
                    type="password"
                    value={password}
                    alt={false}
                    showFilter={false}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to delete account"
                />
                <Button
                    type="submit"
                    isLoading={false}
                    disabled={false}
                    className={styles.delButton}
                >
                    Delete Account
                </Button>
            </form>
        </div>
    )
}

export default DeleteModal