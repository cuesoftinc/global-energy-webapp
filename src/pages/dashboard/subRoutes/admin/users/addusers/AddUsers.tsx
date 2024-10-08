import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import styles from "./AddUsers.module.scss"
import { checkEmail } from "../../../../../../utils/emailChecker";
import { validatePassword } from "../../../../../../utils/passwordChecker";
import Input from "../../../../../../components/input/Input";
import Button from "../../../../../../components/button/Button";
import api from "../../../../../../utils/interceptor";
import { UserData } from "../../../../../../types";
import LoadingScreen from "../../../../../../components/loadingScreen/LoadingScreen";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    address: "",
    phoneNumber: "",
    accountType: "",
    password: "",
    confirmPassword: "",
}


const AddUsers = () => {
    const [userData, setUserData] = useState(initialState)
    const [disabled, setDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const createUser = async (userData: UserData) => {
        const response = await api.post("/auth/sign-up", {
            firstName: userData.firstName.trim(),
            lastName: userData.lastName.trim(),
            email: userData.email.trim(),
            userName: userData.userName.trim(),
            address: userData.address.trim(),
            phoneNumber: userData.phoneNumber.trim(),
            accountType: userData.accountType,
            password: userData.password.trim(),
            confirmPassword: userData.confirmPassword.trim()
        })
        console.log("data", response)
        return response
    }

    const { mutate, isLoading } = useMutation(createUser, {
        onSuccess: (data) => {
            toast.success(data?.data?.message, { duration: 5000 })
            setUserData(initialState)
        },

        onError: (error: any) => {
            console.error("Error Response:", error);
        },
    });

    const handleRegister = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const validEmail = checkEmail(userData.email)
            if (!validEmail) {
                toast.error("Invalid Email")
                return
            }
            const validPassword = validatePassword(userData.password)
            if (!validPassword) {
                toast.error("Password must contain a number, uppercase, and symbol")
                return
            }
            if (userData.password !== userData.confirmPassword) {
                toast.error("password do not match")
                return
            }
            mutate(userData)
        },
        [mutate, userData]
    )

    const handleDisableButton = useCallback(() => {
        return userData.firstName.length > 0 &&
            userData.lastName.length > 0 &&
            userData.email.length > 0 &&
            userData.userName.length > 0 &&
            userData.password.length > 0 &&
            userData.confirmPassword.length > 0 &&
            (userData.accountType === "individual" ||
                userData.accountType === "family" ||
                userData.accountType === "corporate")
            ? setDisabled(false)
            : setDisabled(true);
    }, [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.userName,
        userData.password,
        userData.confirmPassword,
        userData.accountType,
    ]);


    useEffect(() => {
        handleDisableButton()
    }, [handleDisableButton])

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }


    return (
        <div className={styles.form}>
            <LoadingScreen style={{ width: "100%" }} overlay={isLoading} overlayText={'Creating new user...'} />
            <div className={styles.header}>
                <h1 className={styles.head}>ADD A NEW USER</h1>
                <span className={styles.subtitle}>Enter personal details to add a new user.</span>
            </div>
            <form onSubmit={handleRegister} className={styles.formContent}>
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
                    value={userData.email}
                    id="email"
                    type="email"
                    label="Email Address"
                    placeholder="Enter email address"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            email: e.target.value
                        }))
                    }}
                />
                <Input
                    value={userData.userName}
                    id="userName"
                    type="text"
                    label="Enter a User Name"
                    placeholder="Enter username"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            userName: e.target.value.toLowerCase()
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

                <Input
                    value={userData.phoneNumber}
                    id="phonenumber"
                    type="number"
                    label="Phone Number"
                    placeholder="Enter phone number"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            phoneNumber: e.target.value
                        }))
                    }}
                />
                <div className={styles.inputDiv}>
                    <label htmlFor="accountType" className={styles.label}>Account Type</label>
                    <select
                        id="accountType"
                        value={userData.accountType}
                        onChange={(e) => setUserData({ ...userData, accountType: e.target.value })}
                        className={styles.selectInput}
                    >
                        <option value="">Select account type</option>
                        <option value="individual">Individual</option>
                        <option value="family">Family</option>
                        <option value="corporate">Corporate</option>
                    </select>
                </div>
                <Input
                    value={userData.password}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="Enter password"
                    alt={true}
                    see={showPassword}
                    onClick={handleShowPassword}
                    showFilter={false}
                    autocomplete="new-password"
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            password: e.target.value
                        }))
                    }}
                />
                <Input
                    value={userData.confirmPassword}
                    id="comfirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirms Password"
                    placeholder="Confirm password"
                    alt={true}
                    see={showConfirmPassword}
                    onClick={handleShowConfirmPassword}
                    showFilter={false}
                    autocomplete="new-password"
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value
                        }))
                    }}
                />

                <div className={styles.buttonDiv}>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={disabled || isLoading}
                        className={styles.button}
                    >
                        Create User
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddUsers;