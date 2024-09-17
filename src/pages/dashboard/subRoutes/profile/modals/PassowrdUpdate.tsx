import { useState } from "react"
import Input from "../../../../../components/input/Input"
import styles from "./Update.module.scss"
import api from "../../../../../utils/interceptor"
import { useMutation } from "react-query"
import toast from "react-hot-toast"
import Button from "../../../../../components/button/Button"

interface updateProps {
    oldPassword: string
    newPassword?: string;
    confirmPassword?: string;

}

const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
}
const PasswordUpdateModal = () => {
    const [userData, setUserData] = useState(initialState)

    const updateUser = async ({ oldPassword, newPassword, confirmPassword }: updateProps) => {
        const response = await api.patch(`/update-password`, {
            oldPassword,
            newPassword,
            confirmPassword
        })
        return response
    }
    const { mutate } = useMutation(updateUser, {
        onSuccess: () => {
            toast.success("Password updated successfully")
            setUserData(initialState)
        },
        onError: () => {
            toast.error("Error updating password")
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate(userData)
    }

    return (
        <div className={styles.main}>
            <div className={styles.form}>
                <div>
                    <h1>Update Password</h1>
                    <span>Enter information to change passowrd.</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContent}>
                <Input
                    value={userData.oldPassword}
                    id="oldPassword"
                    type="password"
                    label="Old Password"
                    placeholder="Enter old password"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            oldPassword: e.target.value
                        }))
                    }}
                />
                <Input
                    value={userData.newPassword}
                    id="newPassword"
                    type="password"
                    label="New Password"
                    placeholder="Enter new password"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            newPassword: e.target.value
                        }))
                    }}
                />
                <Input
                    value={userData.confirmPassword}
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value
                        }))
                    }}
                />
                <Button
                    type="submit"
                    isLoading={false}
                    disabled={false}
                    className={styles.button}
                >
                    Update Password
                </Button>
            </form>
        </div>
    )
}

export default PasswordUpdateModal