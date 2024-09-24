import React from "react";
import styles from "./Widget.module.scss"
interface PROPS {
	title: string;
	icon: string;
	value: number;
	label: string
}


const Widget: React.FC<PROPS> = ({ title, icon, value, label }) => {

	const getColorClass = () => {
		switch (label) {
			case "Users":
				return styles.blue;
			case "Post":
				return styles.purple;
			case "Subscribed users":
				return styles.green;
			default:
				return "";
		}
	};
	return (
		<main className={styles.main}>
			<section className={styles.top}>
				<p className={styles.title}>{title}</p>
				<div className={`${styles.iconDiv} ${getColorClass()}`}>
					<img src={icon} alt="icon" className={styles.icon} />
				</div>
			</section>
			<section className={styles.bottom}>
				<p className={styles.value}>{value}</p>
				<p className={styles.label}>{label}</p>
			</section>
		</main>
	);
};

export default Widget;
