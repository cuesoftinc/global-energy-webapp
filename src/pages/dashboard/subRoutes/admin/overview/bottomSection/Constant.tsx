import { useEffect } from "react";
import api from "../../../../../../utils/interceptor";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { ChartResponse } from "../../../../../../types";
import useCurrentChartStore from "../../../../../../store/ChartSore";


interface ConstantProps {
    dateRange: [string, string];
}

export const useConstant = ({ dateRange }: ConstantProps) => {
    const { barChartData, setBarChartData } = useCurrentChartStore()

    const getBarChartData = async () => {
        const response = await api.get<ChartResponse>("/subscription/weeklyUsersAndSubscriptions", {
            params: {
                startDate: dateRange[0],
                endDate: dateRange[1],
            },
        })
        return response.data
    }

    const { error, refetch } = useQuery("getBarChartData", getBarChartData, {
        enabled: !!dateRange[0] && !!dateRange[1],
        onSuccess: (data) => {
            setBarChartData(data )
        },
        onError: () => {
            toast.error("Error fetching data");
        },
    });


    useEffect(() => {
        if (error) {
            toast.error("Error fetching data");
        }
    }, [error]);

    const chartData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'All Users',
                backgroundColor: '#E3E8F0',
                borderColor: 'blue',
                maxBarThickness: 80,
                borderWidth: 1,
                minBarLength: 5,
                data: [
                    (barChartData?.users.Monday?.length || 0),
                    (barChartData?.users.Tuesday?.length || 0),
                    (barChartData?.users.Wednesday?.length || 0),
                    (barChartData?.users.Thursday?.length || 0),
                    (barChartData?.users.Friday?.length || 0),
                    (barChartData?.users.Saturday?.length || 0),
                    (barChartData?.users.Sunday?.length || 0),
                ],
            },
            {
                label: 'Subscribed users',
                backgroundColor: '#E0F2E9',
                borderColor: 'green',
                borderWidth: 1,
                maxBarThickness: 80,
                minBarLength: 5,
                data: [
                    (barChartData?.subscriptions.Monday.length || 0),
                    (barChartData?.subscriptions.Tuesday.length || 0),
                    (barChartData?.subscriptions.Wednesday.length || 0),
                    (barChartData?.subscriptions.Thursday.length || 0),
                    (barChartData?.subscriptions.Friday.length || 0),
                    (barChartData?.subscriptions.Saturday.length || 0),
                    (barChartData?.subscriptions.Sunday.length || 0),
                ]
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

    return { chartData, chartOptions, refetch };
};


