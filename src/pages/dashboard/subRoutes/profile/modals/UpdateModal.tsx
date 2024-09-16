import { useState } from "react"
import Input from "../../../../../components/input/Input"
import styles from "./Update.module.scss"
import api from "../../../../../utils/interceptor"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import Button from "../../../../../components/button/Button"

interface updateProps {
    name: string
    address?: string;
    accountType?: string;

}

const initialState = {
    name: "",
    address: "",
    accountType: "",
}
const UpdateAccountModal = () => {
    const [userData, setUserData] = useState(initialState)
    const queryClient = useQueryClient();

    const updateUser = async ({ name, address, accountType }: updateProps) => {
        const response = await api.patch(`/user`, {
            name,
            address,
            accountType
        })
        return response
    }
    const { mutate } = useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("getCurrentUser")
            toast.success("Profile updated successfully")
            setUserData(initialState)
        },
        onError: () => {
            toast.error("Error updating profile")
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
                    <h1>Update Profile</h1>
                    <span>Enter information to create update in your profile.</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContent}>
                    <Input
                        value={userData.name}
                        id="fullName"
                        type="text"
                        label="Full Name"
                        placeholder="Enter full name"
                        alt={false}
                        showFilter={false}
                        onChange={(e) => {
                            setUserData((prev) => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }}
                    />

                    <Input
                        value={userData.address}
                        id="address"
                        type="text"
                        label="Enter Address"
                        placeholder="Enter address"
                        alt={false}
                        showFilter={false}
                        onChange={(e) => {
                            setUserData((prev) => ({
                                ...prev,
                                address: e.target.value
                            }))
                        }}
                    />
                    <div className={styles.inputDiv}>
                        <label htmlFor="accountType" className={styles.label}>Account Type</label>
                        <select
                            id="accountType"
                            value={userData.accountType}
                            onChange={(e) => setUserData({ ...userData, accountType: e.target.value })}
                            className={styles.select}
                        >
                            <option value="" className={styles.option}>Select account type</option>
                            <option value="individual">Individual</option>
                            <option value="family">Family</option>
                            <option value="corporate">Corporate</option>
                        </select>
                        <Button
                            type="submit"
                            isLoading={false}
                            disabled={false}
                            className={styles.button}
                        >
                            Save Changes
                        </Button>
                    </div>
            </form>
        </div>
    )
}

export default UpdateAccountModal