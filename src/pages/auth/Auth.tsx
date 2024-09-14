import React, { useEffect, useState } from "react";
import Login from "./subComponents/Login"
import SignUp from "./subComponents/SignUp";
import styles from "./Auth.module.scss"
import { Logo } from "../../../public/assets";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import ForgetPassword from "./subComponents/ForgetPassword";
import ProtectedRoute from "../../components/protectedRoutes/ProtectedRoute";
import Verify from "./subComponents/Verify";

interface AuthProps {
    children?: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
    const [active, setActive] = useState("login");
    const [overlay, setOverlay] = useState(false);
    const [overlayText, setOverlayText] = useState("");

    useEffect(() => {
        console.log("Active state:", active);
    }, [active]);

    const renderChildren = () => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children as React.ReactElement, {
            setActive,
            setOverlay,
            setOverlayText,
          });
        }
        return null;
      };

    let content = (
        <Login setActive={setActive} setOverlay={setOverlay} setOverlayText={setOverlayText} />
    );

    if (active === "signup") {
        content = (
            <SignUp setActive={setActive} setOverlay={setOverlay} setOverlayText={setOverlayText} />
        );
    }
    if (active === "forgotPassword") {
        content = (
            <ForgetPassword setActive={setActive} setOverlay={setOverlay} setOverlayText={setOverlayText} />
        );
    }
    if (active === "verify") {
        content = <Verify />;
    }

    return (
        <ProtectedRoute>
            <main className={styles.main}>
                <section className={styles.left}>
                    <div className={styles.logoContainer}>
                        <img src={Logo} alt="logo" className={styles.logo} />
                    </div>

                    {/* Render children if present, otherwise render the current active component */}
                    {/* {children && React.isValidElement(children)
                        ? React.cloneElement(children as React.ReactElement, {
                            setActive,
                            setOverlay,
                            setOverlayText,
                        })
                        : content} */}
                        {renderChildren() || content}
                    <LoadingScreen overlay={overlay} overlayText={overlayText} />
                </section>

                <section className={styles.right}>
                    <img src="" alt="authImage" className={styles.authImg} />
                </section>
            </main>
        </ProtectedRoute>
    );
};


export default Auth;