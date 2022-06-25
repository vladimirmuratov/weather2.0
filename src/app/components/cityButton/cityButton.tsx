import React from "react";
import styles from "./cityButton.module.css";

interface Props {
    bgColor: string,
    text: string,
    onClick: () => void
}

export const CityButton: React.FC<Props> = ({bgColor, text, onClick}): JSX.Element => {
    return (
        <span
            style={{backgroundColor: `${bgColor}`}}
            className={styles.button}
            onClick={onClick}
        >
            {text}
        </span>
    )
}