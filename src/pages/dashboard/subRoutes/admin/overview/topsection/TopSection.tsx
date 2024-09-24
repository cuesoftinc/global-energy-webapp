// import Skeleton from "react-loading-skeleton";


import { checkedIcon, postIconCopy, usersCopy } from "../../../../../../../public/assets";
import Widget from "../../../../../../components/widget/Widget";
import useGetAllBlogs from "../../../../../../hook/useGetAllBlogs";
import useGetAllUsers from "../../../../../../hook/useGetAllUsers";
import styles from "./TopSection.module.scss"


const TopSection = () => {

	const {posts} = useGetAllBlogs(1, 10)
	// const {users} = useGetAllUsers()

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
					value={posts.length}
				/>
				<Widget
					title="Total Numbers of Subscribed Users"
					label="Subscribed users"
					icon={checkedIcon}
					value={2}
				/>
			</section>
		</main>
	);
};

export default TopSection


