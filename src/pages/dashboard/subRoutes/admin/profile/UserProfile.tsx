import { useState } from "react"
import useCurrentUserAdmin from "../../../../../hook/admin/useCurrentUserAdmin"
import styles from "../../profile/Profile.module.scss"
import Button from "../../../../../components/button/Button"
import ViewedUser from "./ViewedUser"
import DeleteModal from "../../profile/modals/DeleteModal"
import Overlay from "../../../../../components/overlay/OverlayComponent"
import UpdateAccountModal from "../../profile/modals/updateModal/UpdateModal"





const UserProfile = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const { viewedUser } = useCurrentUserAdmin()

    const handleUpdateProfile = () => {
        setShowUpdateModal(true)
    }
   
    const handleDeleteOverlay = () => {
        setShowDeleteModal(true)
    }


    return (
        <main className={styles.main}>
            <Overlay showOverlay={showUpdateModal} onCloseOverlay={() => setShowUpdateModal(false)}>
                <UpdateAccountModal userId={viewedUser?.id} onCloseOverlay={() => setShowUpdateModal(false)} />
            </Overlay>
            <Overlay showOverlay={showDeleteModal} onCloseOverlay={() => setShowDeleteModal(false)}>
                <DeleteModal userId={viewedUser?.id} onCloseOverlay={() => setShowDeleteModal(false)} />
            </Overlay>
            <div className={styles.borderDiv}>
                <div className={styles.titleDiv}>
                    <p className={styles.title}>Profile</p>
                    <p className={styles.subText}>Lorem ipsum dolor Vivamus nisl ligula, congue sodales interdum vel.</p>
                </div>
                <div className={styles.detailDiv}>
                    <ViewedUser />
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

export default UserProfile