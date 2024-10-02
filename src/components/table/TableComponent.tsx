import React from 'react';
import styles from "./Table.module.scss"




interface Props {
    headings: string[];
    bodyContent: JSX.Element;
}


const TableComponent: React.FC<Props> = ({ headings, bodyContent }) => {
    return (
        <main className={styles.main}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headings.map((heading, index) => (
                            <th className={`${styles.th}`} key={index} style={index === 0 ? { textAlign: "left" } : {}}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                {bodyContent}
            </table>
        </main>
    )
}

export default TableComponent