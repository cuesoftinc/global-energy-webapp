// import Skeleton from "react-loading-skeleton";
import { exclmIcon, postIconCopy, usersCopy } from "../../../../../../public/assets";
import Widget from "../../../../../components/widget/Widget";
import styles from "./TopSection.module.scss"


const TopSection = () => {
	return (
		<main className={styles.main}>
			<section className={styles.widgetDiv}>
				<Widget
					title="Total Numbers of Users"
					label="Users"
					icon={usersCopy}
					value={2}
				/>
				<Widget
					title="Total Numbers of Posts"
					label="Post"
					icon={postIconCopy}
					value={2}
				/>
				<Widget
					title="Total Numbers of Pending Posts"
					label="Pending"
					icon={exclmIcon}
					value={2}
				/>
			</section>
		</main>
	);
};

export default TopSection


