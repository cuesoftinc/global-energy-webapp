import { useCallback, useEffect, useState } from "react";
import { postRequest } from "../../../utils/apiClient";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import styles from "./ResetPassword.module.scss"
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { useLocation } from 'react-router-dom';


interface PROPS {
    setActive: (value: React.SetStateAction<string>) => void;
    setOverlayText: (value: React.SetStateAction<string>) => void;
    setOverlay: (value: React.SetStateAction<boolean>) => void;
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const initialState = {
    newPassword: "",
    confirmPassword: "",
};

const ResetPassword: React.FC<PROPS> = ({ setOverlay, setOverlayText, setActive }) => {
    const query = useQuery();
    const resetToken = query.get("token");

    const [userData, setUserData] = useState(initialState)
    const [disabled, setDisabled] = useState(true)

    const resetPassword = async () => {
        setOverlay(true)
        setOverlayText("Resetting your password...")
        const base = import.meta.env.VITE_BASE_URL
        const url = `${base}/auth/reset-password`
        const response = await postRequest(url, {
            resetToken,
            password: userData.newPassword.trim(),
            confirmPassword: userData.confirmPassword.trim(),
        })
        return response
    }

    const { mutate, isLoading } = useMutation(resetPassword, {
        onSuccess: (data) => {
            if (data?.message) {
                toast.success(data.message)
                setOverlay(false)
                setOverlayText("")
                setActive("login");
            }
        },
        onError: (error: any) => {
            setOverlay(false)
            setOverlayText("")
            const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again."
            toast.error(errorMessage)
        }
    })

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            mutate()
        },
        [mutate]
    )

    const handleDisableButton = useCallback(() => {
        return userData.newPassword.length > 0 && userData.newPassword === userData.confirmPassword ? setDisabled(false) : setDisabled(true)
    }, [userData.newPassword, userData.confirmPassword])

    useEffect(() => {
        handleDisableButton();
    }, [handleDisableButton]);

    return (
        <div className={styles.form}>
            <div className={styles.header}>
                <h1 className={styles.head}>Reset Password</h1>
                <span className={styles.subtitle}>Enter your new password below.</span>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContent}>
                <Input
                    value={userData.newPassword}
                    id="password"
                    type="password"
                    label="New Password"
                    placeholder="Enter new password"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }));
                    }}
                />
                <Input
                    value={userData.confirmPassword}
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your new password"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                        }));
                    }}
                />
                <div className={styles.buttonDiv}>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={disabled || isLoading}
                        className={styles.button}
                    >
                        Submit
                    </Button>
                    <p className={styles.signupLink}>
                        Go back to
                        <span onClick={() => setActive("login")} className={styles.span}>
                            {" "}
                            Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;