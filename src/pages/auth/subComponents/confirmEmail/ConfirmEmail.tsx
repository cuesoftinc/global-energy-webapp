import { useCallback, useEffect } from "react";
import { postRequest } from "../../../../utils/apiClient";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../../../../public/assets";
import styles from "./ConfirmEmail.module.scss"



const ConfirmEmail = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const extractToken = useCallback(() => {
        const token = location.pathname.split("/").pop()
        return token
    }, [location])

    const emailConfirm = async (token: string) => {
        const base = import.meta.env.VITE_BASE_URL;
        const url = `${base}/auth/confirm-email`
        const response = await postRequest(url, {
            confirmationToken: token
        })
        return response
    }

    const { mutate } = useMutation(emailConfirm, {
        onSuccess: (data) => {
            if (data?.response?.status) {
                toast.error(data?.response?.data?.message?.message, { duration: 5000 });
                return
            }
            toast.success("Confirmed successfully")
            navigate("/")
        },
        onError: (error: any) => {
            const erroMessage = error?.reponse?.data?.message?.message || 'Something went wrong'
            toast.error(erroMessage)
        }
    })

    // Automatically confirm the email when the component mounts
    useEffect(() => {
        const token = extractToken()
        if (token) {
            mutate(token)
        } else {
            toast.error("Invalid token or URL")
        }
    }, [extractToken, mutate])


    return (
        <div className={styles.main}>
            <div className={styles.logoContainer}>
                <img src={Logo} alt="logo" className={styles.logo} />
            </div>
            <p className={styles.head}>Confirming your email...</p>
        </div>
    )
}

export default ConfirmEmail