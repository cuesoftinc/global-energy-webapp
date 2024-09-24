
import { optionIcon } from "../../../../../../../public/assets"
import Input from "../../../../../../components/input/Input"
import TableComponent from "../../../../../../components/table/TableComponent"
import styles from "./Viewusers.module.scss"


const ViewUsers = () => {
    const headings = ["First Name", "Last Name", "Email", "Account Type", "Account Creation", "Action"]

    const tableBody = (
        <tbody>
            <tr>
                <td className={styles.customTD}>Udoka</td>
                <td>Ineh</td>
                <td>udokaineh04@gmail.com</td>
                <td>Individual</td>
                <td>Fri Sep 13 2024 18:46:15</td>
                <td className={styles.customTD1}>
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
                placeholder="Search for users by name or email"
                alt={false}
                showFilter={false}
                onChange={() => {}}
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

export default ViewUsers