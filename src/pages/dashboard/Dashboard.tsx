import { Outlet } from "react-router-dom"
import Navigation from "../../components/navigation"
import SideBar from "../../components/sideBar"
import styles from "./Dashboard.module.scss"
import { useState } from "react"

const Dashboard = () => {
    const [toggleMenu, setToggleMenu] = useState(true);

    const handleMenuToggle = () => {
        setToggleMenu(!toggleMenu);
    };

    return (
        <main className={toggleMenu ? styles.main : styles.hideMenu}>
            <section className={styles.sidebar}>
                <SideBar toggleMenu={toggleMenu} />
            </section>
            <section className={styles.outletContainer}>
                <Navigation handleMenuToggle={handleMenuToggle} toggleMenu={toggleMenu} />
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default Dashboard

