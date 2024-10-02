import React from "react";
import styles from "./Chart.module.scss";

interface PROPS {
	title?: string;
	smallText?:boolean;
	chart: any;
	label?: string;
	element?: React.ReactNode;
}

const Chart: React.FC<PROPS> = ({
	title,
	smallText,
	chart,
	element,
}) => {
	return (
		<main className={styles.main}>
			<section className={styles.top}>
				<p className={`${styles.title} ${smallText && styles.small}`}>{title}</p>
				<div className={styles.group}>
					<div className={styles.element}>{element}</div>
				</div>
			</section>
			<section className={styles.chart}>{chart}</section>
		</main>
	);
};

export default Chart;
