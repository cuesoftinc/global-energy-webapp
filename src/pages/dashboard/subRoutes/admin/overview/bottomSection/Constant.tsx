import { useEffect, useState } from "react";
import api from "../../../../../../utils/interceptor";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { ChartResponse } from "../../../../../../types";


interface ConstantProps {
    dateRange: [string, string];
}


export const useConstant = ({ dateRange }: ConstantProps) => {
    const [barChartData, setBarChartData] = useState<ChartResponse | null>(null)

    const getBarChartData = async () => {
        const response = await api.get<ChartResponse>("/subscription/dailyUsersAndSubscriptions")
        console.log("data", response)
        return response.data
    }

    const { error, refetch } = useQuery("getBarChartData", getBarChartData, {
        onSuccess: (data) => {
            setBarChartData(data);
        },
        onError: () => {
            toast.error("Error fetching data");
        },
    });

    // useEffect(() => {
    //     if (dateRange && dateRange.length === 2) {
    //         refetch();
    //     } else {
    //         setBarChartData([]);
    //     }
    // }, [dateRange, refetch]);

    useEffect(() => {
        if (error) {
            toast.error("Error fetching data");
        }
    }, [error]);

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'sat', 'Sun'],
        datasets: [
            {
                label: 'All Users',
                backgroundColor: '#E3E8F0',
                borderColor: 'blue',
                maxBarThickness: 80,
                borderWidth: 1,
                minBarLength: 5,
                data: [65, 59, 80, 81, 56, 55, 40],
                // data: barChartData ? barChartData.todayUsers.map(() => 1) : [],
            },
            {
                label: 'Subscribed users',
                backgroundColor: '#E0F2E9',
                borderColor: 'green',
                borderWidth: 1,
                maxBarThickness: 80,
                minBarLength: 5,
                data: [65, 59, 80, 81, 56, 55, 40],
                // data: barChartData ? barChartData.todaySubscribers.map(() => 1) : [],
            }
        ]
    };


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        categoryPercentage: 0.7,
        barPercentage: 0.7,
        scales: {
            x: {
                grid: {
                    drawBorder: true,
                    display: false,
                    offset: true,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#BCBCBC",
                    font: {
                        family: "Helvetica",
                        size: 14,
                        style: "normal",
                        weight: "lighter",
                    },
                },
            },
            y: {
                grid: {
                    drawBorder: false,
                    display: true,
                    color: "#E0E0E0",
                    drawTicks: false,
                    barThickness: 8,
                },
                border: {
                    dash: [4, 5],
                    display: false,
                },
                ticks: {
                    drawBorder: false,
                    textStrokeWidth: 0.5,
                    color: "#BCBCBC",
                    font: {
                        family: "Helvetica",
                        size: 14,
                        style: "normal",
                    },
                    stepSize: 20,
                    min: 20,
                },
                beginAtZero: true,
                min: 0,
            },
        },
        elements: {
            bar: {
                borderRadius: {
                    topLeft: 4,
                    topRight: 4,
                },
                borderSkipped: false,
            },
        },
    };

    return { chartData, chartOptions };
};


