import { optionIcon } from "../../../../../../public/assets"
import Input from "../../../../../components/input/Input"
import TableComponent from "../../../../../components/table/TableComponent"
import styles from "./Pending.module.scss"


const PendingPosts = () => {
    const headings = ["Title", "Slug", "Account Type", "Post Date & Time", "Action"]

    const tableBody = (
        <tbody>
            <tr>
                <td className={styles.customTD1}>Latest Post</td>
                <td className={styles.customTD2}>This is a test post to showcase that the latest post should show on top</td>
                <td className={styles.customTD3}>Individual</td>
                <td className={styles.customTD4}>Fri Sep 13 2024 18:46:15</td>
                <td className={styles.customTD5}>
                    <button className={styles.button}><img src={optionIcon} alt="option icon" /></button>
                </td>
            </tr>
        </tbody>
    )


    return (
        <div className={styles.main}>
            <Input
                value=""
                id="firstName"
                type="text"
                label=""
                placeholder="Search pending posts"
                alt={false}
                showFilter={false}
                onChange={() => { }}
            />
            <div className={styles.Container}>
                <TableComponent
                    headings={headings}
                    bodyContent={tableBody}
                />
            </div>
        </div>
    )
}

export default PendingPosts