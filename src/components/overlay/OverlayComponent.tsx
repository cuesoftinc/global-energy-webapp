import { closeIcon } from "../../../public/assets";
import styles from "./Overlay.module.scss";

interface Props {
    showOverlay: boolean;
    onCloseOverlay: () => void;
    children: React.ReactNode;
}

const Overlay: React.FC<Props> = ({ showOverlay, onCloseOverlay, children }) => {
    const closeOverlay = () => {
        onCloseOverlay();
    };

    return (
        <>
            {showOverlay && (
                <main className={styles.overlay}>
                    <div className={styles.wrapper}>
                        <div className={styles.closeIconDiv}>
                            <img src={closeIcon} alt="close icon" onClick={closeOverlay} />
                        </div>
                        {children}
                    </div>
                </main>
            )}
        </>
    );
};

export default Overlay;
