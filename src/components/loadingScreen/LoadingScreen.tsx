import React from "react";
import styles from "./LoadingScreen.module.scss";
import { loadingBall } from "../../../public/assets";

interface PROPS {
	overlay: boolean;
	overlayText: string;
	style?: React.CSSProperties;
}

const LoadingScreen: React.FC<PROPS> = ({ overlay, overlayText, style }) => {
	if (!overlay) return;

	return (
		<main className={styles.main} style={style}>
			<img src={loadingBall} alt="ball" className={styles.loadingBall} />
			<p className={styles.overlayText}>{overlayText}</p>
		</main>
	);
};

export default LoadingScreen;
