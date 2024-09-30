// import Skeleton from "react-loading-skeleton";


import { checkedIcon, postIconCopy, usersCopy } from "../../../../../../../public/assets";
import Widget from "../../../../../../components/widget/Widget";
import useGetAllBlogs from "../../../../../../hook/useGetAllBlogs";
import useGetAllSubscription from "../../../../../../hook/useGetAllSubscription";
import useGetAllUsers from "../../../../../../hook/useGetAllUsers";
// import useGetAllUsers from "../../../../../../hook/useGetAllUsers";
import styles from "./TopSection.module.scss"


const TopSection = () => {

	const { posts } = useGetAllBlogs(1, 10)
	const { users } = useGetAllUsers(1, 10)
	const { subs } = useGetAllSubscription(1, 10)

	return (
		<main className={styles.main}>
			<section className={styles.widgetDiv}>
				<Widget
					title="Total Numbers of Users"
					label={users.length === 0 ? "User" : "Users"}
					icon={usersCopy}
					value={users.length}
				/>
				<Widget
					title="Total Numbers of Posts"
					label={posts.length === 0 ? "Post" : "Posts"}
					icon={postIconCopy}
					value={posts.length}
				/>
				<Widget
					title="Total Numbers of Subscribed Users"
					label={subs.length === 0 ? "Subscribed user" : "Subscribed users"}
					icon={checkedIcon}
					value={subs.length}
				/>
			</section>
		</main>
	);
};

export default TopSection


