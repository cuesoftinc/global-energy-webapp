import React from "react";
import styles from "./Input.module.scss";
import { closeEye, openEye } from "../../../public/assets";

interface PROPS {
    id: string;
    label: string;
    type: string;
    value: string;
    placeholder: string;
    className?: string;
    alt?: boolean,
    see?: boolean,
    showFilter?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    autocomplete?: string
}

const Input: React.FC<PROPS> = ({
    id,
    label = "default label",
    type = "text",
    value,
    placeholder = "placeholder",
    className,
    alt,
    see,
    onChange,
    onClick,
    autocomplete
}) => {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onClick) {
            onClick(e)
        }
    };

    return (
        <main>
            <div className={styles.inputDiv}>
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
                <div className={styles.inputContainer}>
                    <input
                        id={id}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={`${styles.input} ${className}`}
                        autoComplete={autocomplete}
                    />
                    {alt && (
                        <button className={styles.button} onClick={handleButtonClick}><img src={see? openEye : closeEye} alt="icon" className={styles.icon} /></button>
                    )}
                </div>
            </div>
        </main>
    );
};


export default Input;
