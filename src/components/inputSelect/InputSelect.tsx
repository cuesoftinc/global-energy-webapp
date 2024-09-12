import styles from "./InputSelect.module.scss"

interface PROPS {
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    options: Array<{ value: string, label: string }>,
    id: string;
}

const InputSelect: React.FC<PROPS> = ({ label, value, onChange, options, id }) => {
    return (
        <div className={styles.inputDiv}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <select id={id} value={value} onChange={onChange} className={styles.selectInput}>
                <option value="">Select Option</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}


export default InputSelect