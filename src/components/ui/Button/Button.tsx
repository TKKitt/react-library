import React, { useState } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps {
  label: string;
  onButtonClick?: (to: string) => void;
  primaryColor?: string;
  textColor?: string;
  hoverColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onButtonClick,
  primaryColor,
  textColor,
  hoverColor,
}) => {
  const buttonStyle = {
    "--primary-color": primaryColor || "var(--default-color-secondary)",
    "--text-color": textColor || "var(--default-color-text)",
    "--hover-color": hoverColor || "var(--default-color-accent)",
  } as React.CSSProperties;

  return (
    <button
      className={styles.button}
      style={buttonStyle}
      onClick={() => onButtonClick && onButtonClick(label)}
    >
      {label}
    </button>
  );
};

export default Button;
