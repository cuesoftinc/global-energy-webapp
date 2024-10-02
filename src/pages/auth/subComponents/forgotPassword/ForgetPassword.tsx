import { useCallback, useState } from "react";
import Input from "../../../../components/input/Input"
import styles from "./ForgotPassword.module.scss"
import { postRequest } from "../../../../utils/apiClient";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import Button from "../../../../components/button/Button";


interface PROPS {
    setActive: (value: React.SetStateAction<string>) => void;
    setOverlayText: (value: React.SetStateAction<string>) => void;
    setOverlay: (value: React.SetStateAction<boolean>) => void;
}

const initialState = {
    email: ""
}
const ForgetPassword: React.FC<PROPS> = ({ setOverlay, setOverlayText, setActive }) => {
    const [userData, setUserData] = useState(initialState);
    const [disabled, setDisabled] = useState(true);

    const passwordForgotten = async () => {
        setOverlay(true)
        setOverlayText("Sending password to your email...")
        const base = import.meta.env.VITE_MY_BASE_URL;
        const url = `${base}/auth/forgot-password`
        const response = await postRequest(url, {
            email: userData.email.trim()
        })
        return response
    }

    const { mutate, isLoading } = useMutation(passwordForgotten, {
        onSuccess: (data) => {
            if (data?.message) {
                toast.success(data?.message)
                console.log("frget", data)
                setOverlay(false)
                setOverlayText("")
                setTimeout(() => {
                    setActive("login");
                }, 1500);
            }
        },
        onError: (error: any) => {
            setOverlay(false);
            setOverlayText("");
            const errorMessage = error?.response?.data?.message?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    })

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate()
    },
        [mutate]
    )


    return (
        <div className={styles.form}>
            <div className={styles.header}>
                <h1 className={styles.head}>Forgot Password</h1>
                <span className={styles.subtitle}>We will send your password to your recovery email to reset your password.</span>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContent}>
                <Input
                    value={userData.email}
                    id="forgotPassword"
                    type="email"
                    label="Email Address"
                    placeholder="Enter email address"
                    alt={false}
                    showFilter={false}
                    onChange={(e) => {
                        const email = e.target.value;
                        setUserData((prev) => ({
                            ...prev,
                            email
                        }));
                        setDisabled(email.length === 0);
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
    )
}

export default ForgetPassword