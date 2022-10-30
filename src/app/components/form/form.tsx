import React from "react";
import styles from "./form.module.css";

interface Props {
    city: string,
    onSubmit: (e: React.FormEvent) => void,
    onChange: (str: string) => void
}

export const Form: React.FC<Props> = ({city, onChange, onSubmit}): JSX.Element => (

    <form className={styles.form_block} onSubmit={onSubmit}>
        <input
            className={styles.form_input}
            name="search"
            value={city}
            onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" className={styles.form_button}>Search</button>
    </form>
)