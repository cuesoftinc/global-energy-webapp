import React from "react";

import {
	Chart as ChartJS,
	CategoryScale,
	BarElement,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Chart from "./Chart";
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Filler,
	Tooltip
);

interface PROPS {
	title: string;
	smallText?: boolean;
	label?: string;
	labelColor: string;
	data: any;
	options: any;
	repColor?: string;
	element?: React.ReactNode;
}

const SingleBarChart: React.FC<PROPS> = ({
	title,
	smallText,
	label,
	labelColor,
	data,
	options,
	element,
}) => {
	return (
		<Chart
			smallText={smallText}
			title={title}
			label={label}
			labelColor={labelColor}
			chart={<Bar data={data} options={options} />}
			element={element}
		/>
	);
};

export default SingleBarChart;
