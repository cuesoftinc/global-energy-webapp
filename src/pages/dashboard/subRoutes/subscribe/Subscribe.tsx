import { useState } from "react"
import styles from "./Subscribe.module.scss"
// import { Flutterwave, closePaymentModal } from "@flutterwave/flutterwave-js";

const Subscribe = () => {
    const [selected, setSelected] = useState("monthly")

    const handleOptionChange = (option: string) => {
        setSelected(option)
    }
    return (
        <main className={styles.main}>
            <div className={styles.btnWrapper}>
                <p className={styles.title}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
                <div className={styles.btnDiv}>
                    <button onClick={() => handleOptionChange("monthly")} className={selected === "monthly" ? styles.fill : styles.outline}>Monthly</button>
                    <button onClick={() => handleOptionChange("yearly")} className={selected === "yearly" ? styles.fill : styles.outline}>Yearly</button>
                </div>
            </div>

            <div className={styles.cardDiv}>
                <div className={styles.card}>
                    <div className={styles.topDiv}>
                        <div className={styles.typeDiv}>
                            <p className={styles.planType}>Basic</p>
                            <p className={styles.subType}>Reference site about Lorem Ipsum, giving information on its origins</p>
                        </div>
                        <div className={styles.priceDiv}>
                            <p className={styles.price}>$20</p>
                            <p className={styles.subPrice}>Per month billed annually <span>$8 billed monthly</span></p>
                        </div>
                        <button className={styles.btn}>Get started</button>
                    </div>

                    <div className={styles.namDiv}>
                        <div>
                            <p className={styles.name}>For Individual:</p>
                            <ul className={styles.ul}>
                                <li className={styles.li}>Empowerment / skill training to venture into renewable energy business.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={styles.name}>For Family</p>
                            <ul className={styles.ul}>
                                <li className={styles.li}>Access to energy audit of your homes and assist in reducing energy usage by 70%.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={styles.name}>For Corporate</p>
                            <ul className={styles.ul}>
                                <li className={styles.li}>Access to energy audit of your homes and assist in reducing energy usage by 60%</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.ccard}>
                    <div className={styles.topDiv}>
                        <div className={styles.typeDiv}>
                            <p className={styles.pplanType}>Extended</p>
                            <p className={styles.ssubType}>Reference site about Lorem Ipsum, giving information on its origins</p>
                        </div>
                        <div className={styles.priceDiv}>
                            <p className={styles.pprice}>$20</p>
                            <p className={styles.ssubPrice}>Per month billed annually <span>$8 billed monthly</span></p>
                        </div>
                        <button className={styles.bbtn}>Get started</button>
                    </div>

                    <div className={styles.namDiv}>
                        <div>
                            <p className={styles.nname}>For Individual:</p>
                            <ul className={styles.ul}>
                                <li className={styles.lli}>Access to electric vehicles or motorbikes and others depending on performance.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={styles.nname}>For Family</p>
                            <ul className={styles.ul}>
                                <li className={styles.lli}>Access to electric vehicles Swap program and others benefits depending on performance.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={styles.nname}>For Corporate</p>
                            <ul className={styles.ul}>
                                <li className={styles.lli}></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.topDiv}>
                        <div className={styles.typeDiv}>
                            <p className={styles.planType}>Advance</p>
                            <p className={styles.subType}>Reference site about Lorem Ipsum, giving information on its origins</p>
                        </div>
                        <div className={styles.priceDiv}>
                            <p className={styles.price}>$20</p>
                            <p className={styles.subPrice}>Per month billed annually <span>$8 billed monthly</span></p>
                        </div>
                        <button className={styles.btn}>Get started</button>
                    </div>

                    <div className={styles.namDiv}>
                        <div>
                            <p className={styles.name}>For Individual:</p>
                            <ul className={styles.ul}>
                                <li className={styles.li}>Access funding for startups after training, mentorship for growth.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={styles.name}>For Family</p>
                            <ul className={styles.ul}>
                                <li className={styles.li}>Access to subsidized rate up to 60% to migrate from to clean energy sources at home.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={styles.name}>For Corporate</p>
                            <ul className={styles.ul}>
                                <li className={styles.li}>Access to electric vehicles Swap program and others benefits depending on performance.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Subscribe