import { useState } from "react";
import Login from "./subComponents/Login"
import SignUp from "./subComponents/SignUp";
import styles from "./Auth.module.scss"
import { Logo } from "../../../public/assets";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import ForgetPassword from "./subComponents/ForgetPassword";
import ResetPassword from "./subComponents/ResetPassword";
import ProtectedRoute from "../../components/protectedRoutes/ProtectedRoute";
import Verify from "./subComponents/Verify";


const Auth = () => {
    const [active, setActive] = useState("login")
    const [overlay, setOverlay] = useState(false)
    const [overlayText, setOverlayText] = useState("")

    let content = (
        <Login setActive={setActive} setOverlay={setOverlay} setOverlayText={setOverlayText} />
    );

    if (active === "signup") {
        content = (
            <SignUp setActive={setActive} setOverlay={setOverlay} setOverlayText={setOverlayText} />
        )
    }
    if (active === "forgotPassword") {
        content = (
            <ForgetPassword setActive={setActive} setOverlay={setOverlay} setOverlayText={setOverlayText} />
        )
    }
    if (active === "resetPassword") {
        content = (
            <ResetPassword setActive={setActive} setOverlay={setOverlay} setOverlayText={setOverlayText} />
        )
    }
    if (active === "verify") {
        content = (
            <Verify setActive={setActive} />
        )
    }

    return (
        <ProtectedRoute>
            <main className={styles.main}>
                <section className={styles.left}>
                    <div className={styles.logoContainer}>
                        <img src={Logo} alt="logo" className={styles.logo} />
                    </div>
                    {content}
                    <LoadingScreen overlay={overlay} overlayText={overlayText} />
                </section>
                <section className={styles.right}>
                    <img src="" alt="authImage" className={styles.authImg} />
                    {/* <div className={styles.overlayContainer}>
                    <div className={styles.overlay}>
                        <p className={styles.header}>Welcome...</p>
                        <p className={styles.sub}></p>
                    </div>
                </div> */}
                </section>
            </main>
        </ProtectedRoute>
    )
}

export default Auth;