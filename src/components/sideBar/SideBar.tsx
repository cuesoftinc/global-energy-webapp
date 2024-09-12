import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./SideBar.module.scss"
import { links } from "./constant"
import { Logo, logoutIcon } from "../../../public/assets"

interface SideBarProps {
    toggleMenu: boolean;

}

const SideBar: React.FC<SideBarProps> = ({ toggleMenu }) => {
    const location = useLocation();
    const [toggleCaret, setToggleCaret] = useState<number | null>(null)


    const handleToggle = (id: number) => {
        setToggleCaret(toggleCaret === id ? null : id);
    }

    return (
        <>
            {toggleMenu && (
                <main className={styles.main}>
                    <Link to="#" className={styles.logoContainer}>
                        <p className={styles.logo}>
                            <img src={Logo} alt="logo" />
                        </p>
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
                                        <img src={item.icon} alt="icon" />
                                        <p>{item.label}</p>
                                        {item.icn && (
                                            <img
                                                src={item.icn}
                                                alt="icon"
                                                className={`${toggleCaret === item.id ? styles.iconUp : styles.iconDown}`}
                                            />
                                        )}
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
                        <section className={styles.logoutContainer}>
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