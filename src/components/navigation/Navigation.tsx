import { Link, useLocation } from "react-router-dom";
import { renderHeader } from "./constant";
import { Logo, menuIcon, userIcon } from "../../../public/assets";
import styles from "./Navigation.module.scss"

interface NavigationProps {
    handleMenuToggle: () => void,
    toggleMenu: boolean
}

const Navigation: React.FC<NavigationProps> = ({ handleMenuToggle, toggleMenu }) => {
    const location = useLocation()
    const splitPath = location.pathname.split("/")


    return (
        <main className={styles.main}>
            <div className={styles.newPath}>
                {!toggleMenu && (
                    <Link to="#" className={styles.logoContainer}>
                        <p className={styles.logo}>
                            <img src={Logo} alt="logo" />
                        </p>
                    </Link>
                )}
                <div className={styles.menu}>
                    <img onClick={handleMenuToggle} src={menuIcon} alt="menu icon" />
                    {renderHeader(splitPath)}
                </div>
            </div>
            <div>
                <img src={userIcon} alt="profile icon" />
            </div>
        </main>
    )
}

export default Navigation;