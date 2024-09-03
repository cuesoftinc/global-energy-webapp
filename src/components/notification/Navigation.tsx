import { useLocation } from "react-router-dom";
import { renderHeader } from "./constant";
import userIcon from "../../../public/assets/user-icon.svg"

import styles from "./Navigation.module.scss"



const Navigation = () => {
    const location = useLocation()
    const splitPath = location.pathname.split("/")


    return (
        <main className={styles.main}>
            <p className={styles.path}>
                {renderHeader(splitPath)}
            </p>
            <div>
                <img src={userIcon} alt="profile icon" />
            </div>
        </main>
    )
}

export default Navigation;