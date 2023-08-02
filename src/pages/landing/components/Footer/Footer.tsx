import React from "react";
import "@/shared/styles/styles.css";
import styles from "./Footer.module.scss";
import logo from "@/assets/logo.svg";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <img
        src={logo}
        alt="Логотип"
        className={styles.footerLogo}
        onClick={scrollToTop}
      />
      <p className={styles.footerText}>
        Защита для ваших сотрудников
        <br />
        &copy;&nbsp;&nbsp;2023&nbsp;&nbsp;MoodBeat
      </p>
    </footer>
  );
};
