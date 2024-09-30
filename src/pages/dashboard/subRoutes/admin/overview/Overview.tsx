import DoubleBar from "./bottomSection/DoubleBar";
import TopSection from "./topsection/TopSection";
import styles from "./Overview.module.scss"


const Overview = () => {
    return (
        <div className={styles.main}>
            <TopSection />
            <DoubleBar />
        </div>
    )
}

export default Overview;