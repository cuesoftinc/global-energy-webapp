import { useState } from "react"
import Button from "../../../../components/button/Button"
import Overlay from "../../../../components/overlay/OverlayComponent"
import CurrentUser from "./CurrentUser"
import styles from "./Profile.module.scss"
import UpdateAccountModal from "./modals/UpdateModal"
import DeleteModal from "./modals/DeleteModal"
import PasswordUpdateModal from "./modals/PassowrdUpdate"
import useCurrentUser from "./useUser"




const Profile = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const { currentUser } = useCurrentUser()

    const handleUpdateProfile = () => {
        setShowUpdateModal(true)
    }
    const handleChangePassword = () => {
        setShowPasswordModal(true)
    }
    const handleDeleteOverlay = () => {
        setShowDeleteModal(true)
    }


    return (
        <main className={styles.main}>
            <Overlay showOverlay={showUpdateModal} onCloseOverlay={() => setShowUpdateModal(false)}>
                <UpdateAccountModal userId={currentUser?.id} onCloseOverlay={() => setShowUpdateModal(false)} />
            </Overlay>
            <Overlay showOverlay={showPasswordModal} onCloseOverlay={() => setShowPasswordModal(false)}>
                <PasswordUpdateModal onCloseOverlay={() => setShowPasswordModal(false)} />
            </Overlay>
            <Overlay showOverlay={showDeleteModal} onCloseOverlay={() => setShowDeleteModal(false)}>
                <DeleteModal userId={currentUser?.id} onCloseOverlay={() => setShowDeleteModal(false)} />
            </Overlay>
            <div className={styles.borderDiv}>
                <div className={styles.titleDiv}>
                    <p className={styles.title}>Profile</p>
                    <p className={styles.subText}>Lorem ipsum dolor Vivamus nisl ligula, congue sodales interdum vel.</p>
                </div>
                <div className={styles.detailDiv}>
                    <CurrentUser />
                </div>
            </div>
            <div className={styles.borderDiv}>
                <div className={styles.titleDiv}>
                    <p className={styles.title}>Update Account</p>
                    <p className={styles.subText}>Make updates to your account by filling the required form.</p>
                </div>
                <div className={styles.btnDiv}>
                    <Button
                        type="submit"
                        isLoading={false}
                        disabled={false}
                        className={styles.button}
                        action={handleUpdateProfile}
                    >
                        Update Account
                    </Button>
                </div>
            </div>
            <div className={styles.borderDiv}>
                <div className={styles.titleDiv}>
                    <p className={styles.title}>Change Password</p>
                    <p className={styles.subText}>Change your Password</p>
                </div>
                <div>
                    <Button
                        type="submit"
                        isLoading={false}
                        disabled={false}
                        className={styles.button}
                        action={handleChangePassword}
                    >
                        Change Password
                    </Button>
                </div>
            </div>
            <div className={styles.borderDiv}>
                <div className={styles.titleDiv}>
                    <p className={styles.title}>Delete Account</p>
                    <p className={styles.subText}>Deleting your account is a permanent action and cannot be undone.</p>
                </div>
                <div>
                    <Button
                        type="submit"
                        isLoading={false}
                        disabled={false}
                        className={styles.delButton}
                        action={handleDeleteOverlay}
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default Profile