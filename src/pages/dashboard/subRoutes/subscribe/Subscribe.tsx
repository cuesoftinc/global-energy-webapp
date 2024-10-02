import { useState } from "react"
import styles from "./Subscribe.module.scss"
import api from "../../../../utils/interceptor";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

import { useMutation } from "react-query";
import toast from "react-hot-toast"
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types";
import useCurrentUser from "../../../../hook/useCurrentUser";


interface FlutterwaveResponse {
    status: string;
    transaction_id: string | number;
}
interface Plan {
    type: string;
    amount: number;
    planId: string;
}

const Subscribe = () => {

    const { currentUser } = useCurrentUser()
    const [selected, setSelected] = useState("monthly")
    const [selectedPlan, setSelectedPlan] = useState({ type: "Basic", amount: 200, planId: "basic" });

    const handleOptionChange = (option: string) => {
        setSelected(option)
    }

    const createSubscription = async ({ type, paymentId, amount }: { type: string, paymentId: string, amount: number }) => {
        const response = await api.post("subscription", {
            type,
            paymentId,
            amount
        });
        console.log("response", response)
        return response;
    }

    const { mutate } = useMutation(createSubscription, {
        onSuccess: (data) => {
            console.log("data", data);
            toast.success("Subscription successful!");
        },
        onError: (error: any) => {
            console.error("error", error);
            toast.error("Subscription failed, please try again.");
        }
    });

    const verifyTransaction = async (transactionId: string) => {
        try {
            const response = await api.get(`/flutterwave/verify/${transactionId}`)
            return response.data
        } catch (error) {
            console.error("Verification failed:", error)
            throw new Error("Transaction verification failed.")
        }
    };


    // Flutterwave payment handler
    const config: FlutterwaveConfig = {
        public_key: "FLWPUBK_TEST-945f0d9fd310032631ee82622af4e80b-X",
        tx_ref: Date.now().toString(),
        amount: selectedPlan.amount,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
            email: currentUser?.email || "defaultEmail@example.com",
            phone_number: currentUser?.phoneNumber || "00000000000",
            name: currentUser?.name || "Anonymous User",
        },
        customizations: {
            title: `Subscription to ${selectedPlan.type} Plan`,
            description: `Payment for the ${selectedPlan.type} subscription plan`,
            logo: "",
        }
    };

    const handleFlutterPayment = useFlutterwave(config);

    const handlePlanSelect = (plan: Plan) => {
        setSelectedPlan(plan);
        handleFlutterPayment({
            callback: async (response: FlutterwaveResponse) => {
                if (response.status === "successful") {
                    try {
                        const verifiedTransaction = await verifyTransaction(response.transaction_id.toString())
                        if (verifiedTransaction.status === "success") {
                            mutate({
                                type: plan.planId,
                                paymentId: response.transaction_id.toString(),
                                amount: plan.amount,
                            })
                        } else {
                            console.error("Transaction verification failed:", verifiedTransaction);
                            toast.error("Payment verification failed.")
                        }
                    } catch (error) {
                        console.error("Error during transaction verification:", error)
                        toast.error("Unable to verify payment.")
                    }
                } else {
                    console.error("Payment failed:", response)
                }
                closePaymentModal()
            },
            onClose: () => {
                console.log("Payment modal closed")
            },
        });
    };



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
                            <p className={styles.price}>$200</p>
                            <p className={styles.subPrice}>Per month billed annually <span>$8 billed monthly</span></p>
                        </div>
                        <button className={styles.btn} onClick={() => handlePlanSelect({ type: "Basic", amount: 200, planId: "basic" })}>Get started</button>
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
                            <p className={styles.pprice}>$600</p>
                            <p className={styles.ssubPrice}>Per month billed annually <span>$8 billed monthly</span></p>
                        </div>
                        <button className={styles.bbtn} onClick={() => handlePlanSelect({ type: "Extended", amount: 600, planId: "extended" })}>Get started</button>
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
                            <p className={styles.price}>$300</p>
                            <p className={styles.subPrice}>Per month billed annually <span>$8 billed monthly</span></p>
                        </div>
                        <button className={styles.btn} onClick={() => handlePlanSelect({ type: "Advance", amount: 300, planId: "advance" })}>Get started</button>
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