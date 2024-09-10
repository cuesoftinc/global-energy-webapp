import { useState } from "react";
import Login from "./subComponents/Login"
import SignUp from "./subComponents/SignUp";
import styles from "./Auth.module.scss"
import { Logo } from "../../../public/assets";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import ForgetPassword from "./subComponents/ForgetPassword";


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
    return (
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
    )
}

export default Auth;