import { useState } from "react"
import Input from "../../../../../components/input/Input"
import styles from "./Update.module.scss"
import api from "../../../../../utils/interceptor"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import Button from "../../../../../components/button/Button"


interface UpdateAccountModalProps {
    userId: string | undefined
    onCloseOverlay: () => void
}

interface updateProps {
    firstName?: string
    lastName?: string
    address?: string;
    accountType?: string;

}

const initialState = {
    firstName: "",
    lastName: "",
    address: "",
    accountType: "",
}
const UpdateAccountModal: React.FC<UpdateAccountModalProps > = ({ userId, onCloseOverlay }) => {
    const [userData, setUserData] = useState(initialState)
    const queryClient = useQueryClient();

    const updateUser = async ({ firstName, lastName, address, accountType }: updateProps) => {
        const payload: any = {}

        if (firstName && firstName.length >= 3) payload.firstName = firstName;
        if (lastName && lastName.length >= 3) payload.lastName = lastName
        if (address) payload.address = address
        if (accountType) payload.accountType = accountType

        const response = await api.patch(`/user/${userId}`, payload)
        return response
    }


    const { mutate } = useMutation(updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("getCurrentUser")
            toast.success("Profile updated successfully")
            setUserData(initialState)
            onCloseOverlay()
        },
        onError: () => {
            toast.error("Error updating profile")
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Validation before submission
        if (userData.firstName && userData.firstName.length < 3) {
            toast.error("First name must be at least 3 characters long");
            return;
        }
        if (userData.lastName && userData.lastName.length < 3) {
            toast.error("Last name must be at least 3 characters long");
            return;
        }
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
                        value={userData.firstName}
                        id="firstName"
                        type="text"
                        label="First Name"
                        placeholder="Enter first name"
                        alt={false}
                        showFilter={false}
                        onChange={(e) => {
                            setUserData((prev) => ({
                                ...prev,
                                firstName: e.target.value
                            }))
                        }}
                    />
                    <Input
                        value={userData.lastName}
                        id="lastName"
                        type="text"
                        label="Last Name"
                        placeholder="Enter last name"
                        alt={false}
                        showFilter={false}
                        onChange={(e) => {
                            setUserData((prev) => ({
                                ...prev,
                                lastName: e.target.value
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