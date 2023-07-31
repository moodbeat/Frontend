import React from "react";
import "@/shared/styles/styles.css";
import styles from "./Header.module.scss";
import logoHeader from "@/assets/logo_MoodBeat_bl.svg";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a href="#">
        <img src={logoHeader} alt="Логотип" className={styles.headerLogo} />
      </a>
      <nav className={styles.headerNav}>
        <li className={styles.headerList}>
          <ul className={styles.headerListItem}>
            <a className={styles.headerLink} href="#audience">
              Для кого?
            </a>
          </ul>
          <ul className={styles.headerListItem}>
            <a className={styles.headerLink} href="#features">
              Возможности
            </a>
          </ul>
          <ul className={styles.headerListItem}>
            <a className={styles.headerLink} href="#faq">
              FAQ
            </a>
          </ul>
        </li>
      </nav>
      <a className={`${styles.button} ${styles.headerButton}`} href="/login">
        Войти
      </a>
      <button className={styles.buttonMenu}></button>
    </header>
  );
};
