import { Link } from "react-router-dom"
import styles from "./SideBar.module.scss"
import { links } from "./constant"

const SideBar = () => {
    return (
        <main className={styles.main}>
            <Link to="#" className={styles.logoContainer}>
                <p className={styles.logo}>Logo</p>
            </Link>
            <div className={styles.bottom}>
                <section className={styles.navContainer}>
                    {links.map((item) => {
                        return (
                            <Link to={item.to}
                                key={item.id} className={`${styles.nav} ${
									location.pathname === item.to && styles.active
								}`}>
                                <img src={item.icon} alt="icon" />
                                <p>{item.label}</p>
                            </Link>
                        )
                    })}
                </section>
                <section className={styles.logoutContainer}>
                    <p className={styles.logoutText}>Logout</p>
                </section>
            </div>
        </main>
    )
}

export default SideBar