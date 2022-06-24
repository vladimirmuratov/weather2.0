import React from "react";
import styles from "./header.module.css";
import logo from "../../../images/logo.png";

export const Header = (): JSX.Element => (
    <header className={styles.header_container}>
        <div className={styles.header_block}>
            <img src={logo} alt="logo"/>
            <h1 className={styles.header_title}>WEATHER 2.0</h1>
        </div>
    </header>
)