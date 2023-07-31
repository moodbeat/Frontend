import React from "react";
import "@/shared/styles/styles.css";
import styles from "./Features.module.scss";
import articleTests from "@/assets/article_tests.png";
import articleQueries from "@/assets/article_queries.png";
import articleQueriesMobile from "@/assets/article_queries_mobile.png";
import articleProfile from "@/assets/article_profile.png";
import articleProfileMobile from "@/assets/article_profile_mobile.png";
import articleBookmarks from "@/assets/article_bookmarks.png";
import articleBookmarksMobile from "@/assets/article_useful_mobile.png";
import articleTelegram from "@/assets/article_telegram.png";
import articleTelegramMobile from "@/assets/article_telegram_mobile.png";

export const Features: React.FC = () => {
  // TODO: Add slider to feature screenshots gallery
  return (
    <section id="features" className={styles.sectionFeatures}>
      <div className={styles.sectionFeaturesContainer}>
        <article className={styles.feature}>
          <div className={styles.featureTextCol}>
            <span className={styles.featureLabel}>Сотрудникам</span>
            <h2 className={styles.featureTitle}>
              Экспресс-тесты настроения и рабочих задач
            </h2>
            <p className={styles.featureText}>
              Оценивайте регулярно свое настроение и загрузку по&nbsp;работе и
              формируйте данные для аналитики. Это&nbsp;поможет отрефлексировать
              свой рабочий опыт и&nbsp;эмоциональное сосотояние
            </p>
          </div>
          <img
            className={`${styles.featureImage} ${styles.featureImageDesktop} ${styles.featureImageMobile}`}
            src={articleTests}
            alt="Скриншот приложения со страницей тестирования"
          />
        </article>

        <article className={styles.feature}>
          <div className={styles.featureTextCol}>
            <span className={styles.featureLabel}>HR специалистам</span>
            <h2 className={styles.featureTitle}>Опросы сотрудников</h2>
            <p className={styles.featureText}>
              Проводите регулярные опросы своих сотрудников для&nbsp;оценки их
              состояния. Используйте предустановленные&nbsp;опросы или
              добавляйте свои благодаря конструктору опросов
            </p>
          </div>
          <img
            className={`${styles.featureImage} ${styles.featureImageDesktop}`}
            src={articleQueries}
            alt="Скриншот приложения со страницей опросов"
          />
          <img
            className={`${styles.featureImage} ${styles.featureImageMobile}`}
            src={articleQueriesMobile}
            alt="Скриншот приложения со страницей опросов"
          />
        </article>

        <article className={styles.feature}>
          <div className={styles.featureTextCol}>
            <span className={styles.featureLabel}>Сотрудникам</span>
            <h2 className={styles.featureTitle}>
              Раздел с полезными ресурсами
            </h2>
            <p className={styles.featureText}>
              Используйте ресурсы из раздела Полезное для&nbsp;улучшения
              эмоционального состояния, уменьшения&nbsp;стресса и саморазвития
            </p>
          </div>
          <img
            className={`${styles.featureImage} ${styles.featureImageDesktop}`}
            src={articleBookmarks}
            alt="Скриншот приложения со страницей сохраненных полезных материалов"
          />
          <img
            className={`${styles.featureImage} ${styles.featureImageMobile}`}
            src={articleBookmarksMobile}
            alt="Скриншот приложения со страницей сохраненных полезных материалов"
          />
        </article>

        <article className={styles.feature}>
          <div className={styles.featureTextCol}>
            <span className={styles.featureLabel}>Руководителям</span>
            <h2 className={styles.featureTitle}>Страница сотрудника</h2>
            <p className={styles.featureText}>
              Получайте всю необходимую информацию о&nbsp;состоянии каждого
              сотрудника в приложении, сохраняйте и&nbsp;отслеживайте информацию
              о проведенных&nbsp;встречах, вовремя реагируйте на
              тревожные&nbsp;сигналы
            </p>
          </div>
          <img
            className={`${styles.featureImage} ${styles.featureImageDesktop}`}
            src={articleProfile}
            alt="Скриншот приложения со страницей профиля сотрудника"
          />
          <img
            className={`${styles.featureImage} ${styles.featureImageMobile}`}
            src={articleProfileMobile}
            alt="Скриншот приложения со страницей профиля сотрудника"
          />
        </article>

        <article className={styles.feature}>
          <div className={styles.featureTextCol}>
            <span className={styles.featureLabel}>Для всех</span>
            <h2 className={styles.featureTitle}>Чат-бот в Telegram</h2>
            <p className={styles.featureText}>
              Получайте всю необходимую информацию о состоянии каждого
              сотрудника не только в приложении, но&nbsp;удобным для вас
              способом на смартфон.
            </p>
            <p className={styles.featureText}>
              Сохраняйте и отслеживайте информацию о&nbsp;проведенных встречах,
              вовремя реагируйте на&nbsp;тревожные сигналы
            </p>
          </div>
          <img
            className={`${styles.featureImage} ${styles.featureImageDesktop}`}
            src={articleTelegram}
            alt="Скриншот использования Телеграм-бота"
          />
          <img
            className={`${styles.featureImage} ${styles.featureImageMobile}`}
            src={articleTelegramMobile}
            alt="Скриншот использования Телеграм-бота"
          />
        </article>
      </div>
    </section>
  );
};
