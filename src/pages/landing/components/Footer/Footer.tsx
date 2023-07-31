import React from "react";
import "@/shared/styles/styles.css";
import styles from "./Footer.module.scss";
import logo from "@/assets/logo.svg";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <img src={logo} alt="Логотип" className={styles.footerLogo} />
      <p className={styles.footerText}>
        Защита для ваших сотрудников
        <br />
        &copy;&nbsp;&nbsp;2023&nbsp;&nbsp;MoodBeat
      </p>
    </footer>
  );
};
