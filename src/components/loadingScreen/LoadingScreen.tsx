import React from "react";
import { ball } from "../../../public/assets";
import styles from "./LoadingScreen.module.scss"

interface PROPS {
	overlay: boolean;
	overlayText: string;
	style?: React.CSSProperties;
}

const LoadingScreen: React.FC<PROPS> = ({ overlay, overlayText, style }) => {
	if (!overlay) return;

	return (
		<main className={styles.main} style={style}>
			<img src={ball} alt="ball" className={styles.loadingBall} />
			<p className={styles.overlayText}>{overlayText}</p>
		</main>
	);
};

export default LoadingScreen;
