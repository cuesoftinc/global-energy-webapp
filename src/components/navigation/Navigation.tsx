import { Link, useLocation, useNavigate } from "react-router-dom";
import { renderHeader } from "./constant";
import { Logo, backIconCopy, menuIcon, userIcon } from "../../../public/assets";
import styles from "./Navigation.module.scss"
import useCurrentUser from "../../hook/useCurrentUser";


interface NavigationProps {
    handleMenuToggle: () => void,
    toggleMenu: boolean,
    userRole: string,
}

const Navigation: React.FC<NavigationProps> = ({ handleMenuToggle, toggleMenu, userRole }) => {
    const location = useLocation()
    const splitPath = location.pathname.split("/")
    const currentLocation = location.pathname.startsWith("/dashboard/user-profile/") || location.pathname.startsWith("/dashboard/members-post/")
    const nav = useNavigate()
    const { currentUser } = useCurrentUser();

    return (
        <main className={toggleMenu ? styles.main : styles.Newmain}>
            <div className={toggleMenu ? styles.path : styles.Newpath}>
                {!toggleMenu && (
                    <Link to="#" className={styles.logoContainer}>
                        <p className={styles.logo}>
                            <img src={Logo} alt="logo" />
                        </p>
                    </Link>
                )}
                <div className={toggleMenu ? styles.menu : styles.Newmenu}>
                    {!toggleMenu && (
                        <img onClick={handleMenuToggle} className={styles.menuIcon} src={menuIcon} alt="menu icon" />
                    )}

                    {currentLocation && userRole === "admin" && <img className={styles.arrowLeft} onClick={() => nav(-1)} src={backIconCopy} alt="arrow icon" />}
                    {renderHeader(splitPath)}
                </div>
            </div>
            <div className={toggleMenu ? styles.profileDiv : styles.newProfileDiv}>
                <p className={styles.name}>{currentUser?.name}</p>
                <div>
                    <img src={userIcon} alt="profile icon" />
                    {/* <img src={dropDown} alt="dropdownicon" /> */}
                </div>
            </div>
        </main>
    )
}

export default Navigation;