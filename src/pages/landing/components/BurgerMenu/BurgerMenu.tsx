import React from "react";
import styles from "./BurgerMenu.module.scss";

interface Props {
  setIsMenuOpen: any;
}

export const BurgerMenu: React.FC<Props> = ({ setIsMenuOpen }) => {
  const handleClose = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className={styles.burgerMenu}>
      <div onClick={handleClose} className={styles.closeButton}></div>
      <nav className={styles.headerNav}>
        <li className={styles.headerList}>
          <ul className={styles.headerListItem}>
            <a
              onClick={handleClose}
              className={styles.headerLink}
              href="#audience"
            >
              Для кого?
            </a>
          </ul>
          <ul className={styles.headerListItem}>
            <a
              onClick={handleClose}
              className={styles.headerLink}
              href="#features"
            >
              Возможности
            </a>
          </ul>
          <ul className={styles.headerListItem}>
            <a onClick={handleClose} className={styles.headerLink} href="#faq">
              FAQ
            </a>
          </ul>
        </li>
      </nav>
    </div>
  );
};
