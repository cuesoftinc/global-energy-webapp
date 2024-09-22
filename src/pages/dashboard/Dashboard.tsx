import { Outlet } from "react-router-dom"
import Navigation from "../../components/navigation"
import SideBar from "../../components/sideBar"
import styles from "./Dashboard.module.scss"
import ProtectedAuthRoute from "../../components/protectedRoutes/ProtectedAuthRoute"
import { ToggleMenuProvider, useToggleMenu } from "../../utils/useToggleMenu"

const Dashboard = () => {
    return (
      <ToggleMenuProvider>
        <ProtectedAuthRoute>
          <DashboardContent />
        </ProtectedAuthRoute>
      </ToggleMenuProvider>
    );
  };
  

    const DashboardContent = () => {

        const { toggleMenu, handleMenuToggle } = useToggleMenu();

        return (
            <main className={toggleMenu ? styles.main : styles.hideMenu}>
                <section className={styles.sidebar}>
                    <SideBar handleMenuToggle={handleMenuToggle} toggleMenu={toggleMenu} />
                </section>
                <section className={toggleMenu ? styles.outletContainer : styles.NewContainer}>
                    <Navigation handleMenuToggle={handleMenuToggle} toggleMenu={toggleMenu} />
                    <div className={toggleMenu ? styles.outlet : styles.Newoutlet}>
                        <Outlet />
                    </div>
                </section>
            </main>
        )
    }

export default Dashboard;


