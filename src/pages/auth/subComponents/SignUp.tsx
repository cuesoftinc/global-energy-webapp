import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import styles from "./SignUp.module.scss"
import { postRequest } from "../../../utils/apiClient";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { checkEmail } from "../../../utils/emailChecker";
import { validatePassword } from "../../../utils/passwordChecker";


interface PROPS {
    setActive: (value: React.SetStateAction<string>) => void;
    setOverlayText: (value: React.SetStateAction<string>) => void;
    setOverlay: (value: React.SetStateAction<boolean>) => void;
}

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
    checkbox: false
}


const SignUp: React.FC<PROPS> = ({ setOverlay, setOverlayText, setActive }) => {
    const [userData, setUserData] = useState(initialState)
    const [disabled, setDisabled] = useState(true);

    const registerUser = async () => {
        setOverlay(true)
        setOverlayText("Please wait while we create your account...")
        const base = import.meta.env.VITE_BASE_URL
        const url = `${base}/auth/sign-up`
        const response = await postRequest(url, {
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
        return response
    }

    const { mutate, isLoading } = useMutation(registerUser, {
        onSuccess: (data) => {
            if (data?.message) {
                toast.success(data.message, { duration: 5000 });
                setOverlay(false);
                setOverlayText("");
                setTimeout(() => {
                    setActive("verify");
                }, 1500);
            }
        },
        onError: (error: any) => {
            setOverlay(false)
            setOverlayText("")
            toast.error(error?.response?.data?.message, { duration: 5000 })
            if (error?.response?.data?.errors) {
                error.response.data.errors.forEach((err: any) => {
                    toast.error(Object.values(err).join(" "));
                });
            } else {
                // Generic error message
                toast.error(error?.response?.data?.message || "An error occurred");
            }
        }
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
            mutate()
        },
        [mutate, userData]
    )

    const handleDisableButton = useCallback(() => {
        return userData.firstName.length > 0 &&
            userData.lastName.length > 0 &&
            userData.email.length > 0 &&
            userData.userName.length > 0 &&
            userData.password.length > 0 &&
            userData.confirmPassword.length > 0 && userData.checkbox &&
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
        userData.checkbox
    ]);


    useEffect(() => {
        handleDisableButton()
    }, [handleDisableButton])

    return (
        <div className={styles.form}>
            <div className={styles.header}>
                <h1 className={styles.head}>Create an Account</h1>
                <span className={styles.subtitle}>Enter your personal details to create an account with us.</span>
            </div>
            <form onSubmit={handleRegister} className={styles.formContent}>
                <div className={styles.namesDiv}>
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
                </div>

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

                <div className={styles.namesDiv}>
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
                </div>

                <Input
                    value={userData.password}
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    alt={false}
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
                    type="password"
                    label="Confirms Password"
                    placeholder="Confirm password"
                    alt={false}
                    showFilter={false}
                    autocomplete="new-password"
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value
                        }))
                    }}
                />
                <div>
                    <label className={styles.checkbox}>
                        <input type="checkbox" checked={userData.checkbox} onChange={(e) => {
                            setUserData((prev) => ({
                                ...prev,
                                checkbox: e.target.checked
                            }))
                        }} />
                        <p className={styles.checkboxText}>I agree and accept the <span className={styles.span}>terms and conditions</span></p>
                    </label>
                </div>

                <div className={styles.buttonDiv}>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={disabled || isLoading}
                        className={styles.button}
                    >
                        Create Account
                    </Button>
                    <p className={styles.signupLink}>
                        Already have an account?
                        <span onClick={() => setActive("")} className={styles.span}>
                            {" "}
                            Log In
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;