import { useCallback, useEffect, useState } from "react";
import { postRequest } from "../../../../utils/apiClient";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import styles from "./ResetPassword.module.scss"
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import { useLocation, useNavigate } from 'react-router-dom';


interface PROPS {
    setActive: (value: string) => void;
    setOverlay: (value: boolean) => void;
    setOverlayText: (value: string) => void;
}


const initialState = {
    newPassword: "",
    confirmPassword: "",
};

const ResetPassword: React.FC<PROPS> = ({ setOverlay, setOverlayText }) => {
    const [userData, setUserData] = useState(initialState)
    const [disabled, setDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const extractToken = useCallback(() => {
        const token = location.pathname.split("/").pop()
        return token
    }, [location])

    const resetPassword = async (token: string) => {
        setOverlay(true)
        setOverlayText("Resetting your password...")
        const base = import.meta.env.VITE_MY_BASE_URL
        const url = `${base}/auth/reset-password`
        const response = await postRequest(url, {
            resetToken: token,
            password: userData.newPassword.trim(),
            confirmPassword: userData.confirmPassword.trim(),
        })
        return response
    }

    const { mutate, isLoading } = useMutation(resetPassword, {
        onSuccess: (data) => {
            if (data?.message) {
                toast.error(data?.response?.data?.message?.message)
                setOverlay(false)
                setOverlayText("")
                return
            }
            toast.success(data.message)
                console.log("reset", data)
                setOverlay(false)
                setOverlayText("")
                setTimeout(() => {
                    navigate("/")
                }, 1500)
        },
        onError: (error: any) => {
            setOverlay(false)
            setOverlayText("")
            const errorMessage = error?.response?.data?.message?.message || "Something went wrong. Please try again."
            console.log("error", errorMessage)
            toast.error(errorMessage)
        }
    })

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const token = extractToken();
            if (token) {
                mutate(token);
            }
        },
        [mutate, extractToken]
    )

    const handleDisableButton = useCallback(() => {
        return userData.newPassword.length > 0 && userData.newPassword === userData.confirmPassword ? setDisabled(false) : setDisabled(true)
    }, [userData.newPassword, userData.confirmPassword])

    useEffect(() => {
        handleDisableButton();
    }, [handleDisableButton]);


    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

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
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    placeholder="Enter new password"
                    alt={true}
                    see={showPassword}
                    onClick={handleShowPassword}
                    showFilter={false}
                    onChange={(e) => {
                        setUserData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                        }));
                    }}
                />
                <Input
                    value={userData.confirmPassword}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    placeholder="Confirm your new password"
                    alt={true}
                    see={showConfirmPassword}
                    onClick={handleShowConfirmPassword}
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
                        <span onClick={() => navigate("/")} className={styles.span}>
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