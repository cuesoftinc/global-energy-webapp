import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./SideBar.module.scss"
import { links } from "./constant"
import { Logo, close, logoutIcon, menuIcon } from "../../../public/assets"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { postRequest } from "../../utils/apiClient"
import { useMutation } from "react-query"

interface SideBarProps {
    toggleMenu: boolean;
    handleMenuToggle: () => void,
}

const SideBar: React.FC<SideBarProps> = ({ toggleMenu, handleMenuToggle }) => {
    const nav = useNavigate()
    const location = useLocation();
    const [toggleCaret, setToggleCaret] = useState<number | null>(null)



    const handleToggle = (id: number) => {
        setToggleCaret(toggleCaret === id ? null : id);
    }

    const logoutAPI = async (refreshToken: string) => {
        const base = import.meta.env.VITE_BASE_URL;
        const url = `${base}/auth/logout`;
        const response = await postRequest(url, { refreshToken });
        // const response = api.post(`/auth/logout`, {
        //     refreshToken
        // })
        return response;
    }

    const { mutate: logout } = useMutation(logoutAPI, {
        onSuccess: (data) => {
            if (data?.message) {
                // toast.success(data.response?.data?.message?.message)
                // toast.success("Logout successfully")
                Cookies.remove("glbATK")
                Cookies.remove("glbRTK")
                nav("/")
                window.location.reload()
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message?.message || "Logout failed, Please try again"
            toast.error(errorMessage)
        }
    })

    const handleLogout = () => {
        const refreshToken = Cookies.get("glbRTK")
        if (refreshToken) {
            toast.loading("Logging out...")
            setTimeout(() => {
                toast.dismiss();
                nav("/");
                window.location.reload();
            }, 1500);
            logout(refreshToken)
        } else {
            toast.error("No refresh token found.")
            nav("/")
        }
    }

    return (
        <>
            {toggleMenu && (
                <main className={styles.main}>
                    <Link to="#" className={styles.logoContainer}>
                        <p className={styles.logo}>
                            <img src={Logo} alt="logo" />
                        </p>
                        <img onClick={handleMenuToggle} className={styles.menuIcon} src={toggleMenu ? menuIcon : close} alt="menu icon" />
                        <img onClick={handleMenuToggle} className={styles.menuMobileIcon} src={toggleMenu ? close : menuIcon} alt="menu icon" />
                    </Link>
                    <div className={styles.bottom}>
                        <section className={styles.navContainer}>
                            {links.map((item) => (
                                <div key={item.id} className={styles.itemDiv}>
                                    <Link
                                        to={item.to}
                                        className={`${styles.nav} ${location.pathname === item.to ||
                                            (item.subItems && item.subItems.some(subItem => location.pathname === subItem.to))
                                            ? styles.active
                                            : ""
                                            }`}
                                        onClick={(e) => {
                                            if (item.subItems) {
                                                e.preventDefault();
                                                handleToggle(item.id);
                                            }
                                        }}
                                    >
                                        <img className={styles.icon} src={item.icon} alt="icon" />
                                        <div className={styles.caretIconDiv}>
                                            <p>{item.label}</p>
                                            {item.icn && (
                                                <img
                                                    src={item.icn}
                                                    alt="icon"
                                                    className={`${toggleCaret === item.id ? styles.iconUp : styles.iconDown}`}
                                                />
                                            )}
                                        </div>
                                    </Link>
                                    {item.subItems && toggleCaret === item.id && (
                                        <div className={styles.subItems}>
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    to={subItem.to}
                                                    key={subItem.id}
                                                    className={`${styles.subItem} ${location.pathname === subItem.to ? styles.subActive : ""}`}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                        <section onClick={handleLogout} className={styles.logoutContainer}>
                            <img src={logoutIcon} alt="logout" className={styles.logout} />
                            <p className={styles.logoutText}>Logout</p>
                        </section>
                    </div>
                </main>
            )}
        </>

    )
}

export default SideBar