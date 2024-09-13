import { envelope } from "../../../../public/assets";
import styles from "./Verify.module.scss"

interface PROPS {
    setActive: (value: React.SetStateAction<string>) => void;
}

const Verify: React.FC<PROPS> = ({ setActive }) => {
    setActive("")
    return (
        <div className={styles.header}>
            <div className={styles.envelopeDiv}>
                <img src={envelope} alt="" />
            </div>
            <h1 className={styles.head}>Account Activation</h1>
            <span className={styles.subtitle}>We've sent you an email, please activate your account.</span>
        </div>
    )
}

export default Verify