import { useState } from "react"
import api from "../../../../../utils/interceptor"
import toast from "react-hot-toast";
import styles from "./Update.module.scss"
import Input from "../../../../../components/input/Input";
import Button from "../../../../../components/button/Button";


const DeleteModal = () => {
    const [password, setPassword] = useState("")

    const deleteUser = async ({ password }: { password: string }) => {
        try {
            const response = await api.delete(`/user`, {
                data: { password }
            });
            console.log("User deleted:", response.data)
            toast.success(response.data.message)
        } catch (error: any) {
            console.error("Error deleting user:", error)
            toast.error(error.response?.data?.message || "Error deleting user")
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