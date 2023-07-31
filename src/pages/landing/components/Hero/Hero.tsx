import React from "react";
import "@/shared/styles/styles.css";
import styles from "./Hero.module.scss";
import heroScreenshot from "@/assets/hero_image.png";

export const Hero: React.FC = () => {
  return (
    <section className={styles.sectionHero}>
      <div className={styles.sectionHeroContainer}>
        <div className={styles.heroCol}>
          <h1 className={styles.heroTitle}>
            Держите руку на&nbsp;пульсе эффективности
          </h1>
          <img
            className={`${styles.heroImageMobile}`}
            src={heroScreenshot}
            alt="Скриншот главного экрана приложения"
          />
          <p className={styles.heroText}>
            Поможем HR и руководителям установить&nbsp;эмоциональный контакт
            с&nbsp;командой, вовремя заметить тревожные сигналы
            и&nbsp;остановить выгорание.
          </p>
          <a className={`${styles.button} ${styles.heroButton}`} href="#form">
            Заказать демо
          </a>
        </div>
        <div className={styles.heroImages}>
          <img
            className={styles.heroImage}
            src={heroScreenshot}
            alt="Скриншот главного экрана приложения"
          />
        </div>
      </div>
    </section>
  );
};
