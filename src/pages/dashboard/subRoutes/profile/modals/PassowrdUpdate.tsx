import { useState } from "react"
import Input from "../../../../../components/input/Input"
import styles from "./updateModal/Update.module.scss"
import api from "../../../../../utils/interceptor"
import { useMutation } from "react-query"
import toast from "react-hot-toast"
import Button from "../../../../../components/button/Button"

interface PasswordModalProps {
    onCloseOverlay: () => void
}
interface updateProps {
    oldPassword: string
    password?: string;
    confirmPassword?: string
}

const initialState = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
}
const PasswordUpdateModal: React.FC<PasswordModalProps> = ({onCloseOverlay}) => {
    const [userData, setUserData] = useState(initialState)

    const updateUser = async ({ oldPassword, password, confirmPassword }: updateProps) => {
        const response = await api.patch(`auth/update-password`, {
            oldPassword,
            password,
            confirmPassword
        })
        return response.data
    }
    const { mutate } = useMutation(updateUser, {
        onSuccess: (data) => {
            toast.success("Password updated successfully")
            console.log("newdata", data.response?.data?.message?.message)
            setUserData(initialState)
            onCloseOverlay()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message?.message, { duration: 5000 })
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
                    value={userData.password}
                    id="newPassword"
                    type="password"
                    label="New Password"
                    placeholder="Enter new password"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            password: e.target.value
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