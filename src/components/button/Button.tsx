import React from "react";
import styles from "./Button.module.scss";
import { loadingSpinner } from "../../../public/assets";

interface PROPS {
  action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<PROPS> = ({
  action,
  disabled = true,
  children,
  className,
  isLoading,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      onClick={action}
      className={`${styles.button} ${disabled && styles.disabled} ${className} `}
    >
      {isLoading ? <img src={loadingSpinner} alt="loading" className={styles.loading} /> : children}
    </button>
  );
};

export default Button;
