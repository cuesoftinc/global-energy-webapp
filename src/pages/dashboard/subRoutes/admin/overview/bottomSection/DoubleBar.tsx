import styles from "./DoubleBar.module.scss"
import {  useConstant } from "./Constant";
import { DatePicker } from "antd";
// import { useState } from "react";
import SingleBarChart from "../../../../../../components/Chart/SingleBarChart";

const DoubleBar = () => {
    // const [dateRange, setDateRange] = useState<[string, string]>(["2024-02-22", "2024-04-15"]);

    // const handleDateChange = (_dates: any, dateStrings: [string, string]) => {
    //     setDateRange(dateStrings);
    // };

    const { chartData, chartOptions } = useConstant();

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
                onChange={()=> {}}
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

