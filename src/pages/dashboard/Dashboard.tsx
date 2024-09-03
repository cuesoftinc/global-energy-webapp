import { Outlet } from "react-router-dom"
import Navigation from "../../components/notification"
import SideBar from "../../components/sideBar"
import styles from "./Dashboard.module.scss"

const Dashboard = () => {
    return (
        <main className={styles.main}>
            <section className={styles.sidebar}>
                <SideBar />
            </section>
            <section className={styles.outletContainer}>
                <Navigation />
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default Dashboard