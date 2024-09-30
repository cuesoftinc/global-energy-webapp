import styles from "./DoubleBar.module.scss"
import { useConstant } from "./Constant";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import SingleBarChart from "../../../../../../components/Chart/SingleBarChart";

const DoubleBar = () => {
    const [dateRange, setDateRange] = useState<[string, string]>(["2024-09-05T00:00:00.000Z", "2024-09-30T00:00:00.000Z"]);

    const handleDateChange = (_dates: any, dateStrings: [string, string]) => {
        setDateRange([new Date(dateStrings[0]).toISOString(), new Date(dateStrings[1]).toISOString()]);
    };

    const { chartData, chartOptions, refetch } = useConstant({ dateRange});


    useEffect(() => {
        refetch()
    }, [dateRange, refetch])

    const element = (
        <div className={styles.buttonwrapper}>
            <div className={styles.usersAndSubDiv}>
                <div className={styles.userDiv}>
                    <div className={styles.green}></div>
                    <p className={styles.para}>All Users</p>
                </div>
                <div className={styles.subDiv}>
                    <div className={styles.red}></div>
                    <p className={styles.para}>Subscribed Users</p>
                </div>
            </div>

            <div>
                <DatePicker.RangePicker
                    size="middle"
                    color="#1a3426"
                    placeholder={["Start date", "End date"]}
                    style={{
                        height: "40px",
                        maxWidth: "250px",
                        borderColor: "#BCBCBC",
                    }}
                    onChange={handleDateChange}
                />
            </div>
        </div>
    )

    return (
        <main className={styles.main}>
            <div className={styles.chart}>
                <SingleBarChart
                    title="Users Statisitics"
                    label=""
                    labelColor=""
                    data={chartData}
                    options={chartOptions}
                    element={element}
                />
            </div>
        </main>
    );
};

export default DoubleBar;

