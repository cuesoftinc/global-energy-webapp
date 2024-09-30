import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/Button";
import Input from "../../../../components/input/Input";
import styles from "./Login.module.scss"
import { useCallback, useEffect, useState } from "react";
import { postRequest } from "../../../../utils/apiClient";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie";


interface PROPS {
    setActive: (value: React.SetStateAction<string>) => void
    setOverlayText: (value: React.SetStateAction<string>) => void
    setOverlay: (value: React.SetStateAction<boolean>) => void
}

const initialState = {
    email: "",
    password: ""
}

const Login: React.FC<PROPS> = ({ setActive, setOverlay, setOverlayText }) => {
    const nav = useNavigate()

    const [userData, setUserData] = useState(initialState)
    const [disabled, setDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const loginUser = async () => {
        setOverlay(true)
        setOverlayText("Logging you in...")
        const base = import.meta.env.VITE_BASE_URL;
        const url = `${base}/auth/sign-in`
        const response = await postRequest(url, userData)
        console.log("data", response)
        return response
    }

    const { mutate, isLoading } = useMutation(loginUser, {
        onSuccess: (data) => {
            if (data?.user) {
                // Successful login
                const exp = new Date(new Date().getTime() + 120 * 60 * 1000);
                toast.success("Login successful!"), { duration: 5000 };
                console.log("data", data)
                Cookies.set("glbATK", data.accessToken, { expires: exp });
                Cookies.set("glbRTK", data?.refreshToken, { expires: exp })
                Cookies.set("userRole", data.user.role);
                setTimeout(() => {
                    setOverlay(false);
                    setOverlayText("");
                    nav("/dashboard");
                }, 1500);
            } else if (data.response?.status) {
                // Specific error handling for 'message'
                toast.error(data.response?.data?.message?.message);
                setOverlay(false);
                setOverlayText("");
            }
        },
        onError: () => {
            // Handle unexpected errors here (network issues, etc.)
            toast.error("An unexpected error occurred. Please try again.");
            setOverlay(false);
            setOverlayText("");
        }
    });

    const handleLogin = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            mutate()
        },
        [mutate]
    )

    const handleDisableButton = useCallback(() => {
        return userData.email.length > 0 && userData.password.length > 0 ? setDisabled(false) : setDisabled(true)
    }, [userData.email, userData.password])

    useEffect(() => {
        handleDisableButton()
    }, [handleDisableButton])

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <div className={styles.form}>
            <div className={styles.header}>
                <h1 className={styles.head}>Login</h1>
                <span className={styles.subtitle}>Enter your email address and password to login.</span>
            </div>
            <form onSubmit={handleLogin} className={styles.formContent}>
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
                <div className={styles.forgotDiv}>
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
                        autocomplete="current-password"
                        onChange={(e) => {
                            setUserData((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }}
                    />
                    <div onClick={() => setActive("forgotPassword")} className={styles.forgotPassword}>
                        <p className={styles.forgotText}>Forgot password?</p>
                    </div>
                </div>

                <div className={styles.buttonDiv}>
                    <Button
                        type="submit"
                        isLoading={false}
                        disabled={disabled || isLoading}
                        className={styles.button}
                    >
                        Login
                    </Button>
                    <p className={styles.signupLink}>
                        Don’t have an account?
                        <span onClick={() => setActive("signup")} className={styles.span}>
                            {" "}
                            Create Account
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
