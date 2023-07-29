import React, { useState } from "react";
import "@/shared/styles/styles.css";
import styles from "./LandingPage.module.scss";
import logo from "@/assets/logo.svg";
import logoHeader from "@/assets/logo_MoodBeat_bl.svg";
import articleTests from "@/assets/article_tests.png";
import articleQueries from "@/assets/article_queries.png";
import articleProfile from "@/assets/article_profile.png";
import articleBookmarks from "@/assets/article_bookmarks.png";
import articleTelegram from "@/assets/article_telegram.png";
import heroScreenshot from "@/assets/hero_screenshot.png";
import heroWheel from "@/assets/hero_wheel.png";
import { Accordion } from "@/components/Accordion/Accordion";
import { FeedbackForm } from "./components/FeedbackForm/FeedbackForm";
import { faqItems } from "@/shared/constants";

export const LandingPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <a href="#">
          <img src={logoHeader} alt="Логотип" />
        </a>
        <nav className={styles.headerNav}>
          <li className={styles.headerList}>
            <ul>
              <a className={styles.headerLink} href="#audience">
                Для кого?
              </a>
            </ul>
            <ul>
              <a className={styles.headerLink} href="#features">
                Возможности
              </a>
            </ul>
            <ul>
              <a className={styles.headerLink} href="#faq">
                FAQ
              </a>
            </ul>
          </li>
        </nav>
        <a className={`${styles.button} ${styles.headerButton}`} href="/login">
          Войти
        </a>
      </header>
      <main>
        <section className={styles.sectionHero}>
          <div className={styles.sectionHeroContainer}>
            <div className={styles.heroCol}>
              <h1 className={styles.heroTitle}>
                Держите руку на&nbsp;пульсе эффективности
              </h1>
              <p className={styles.heroText}>
                Поможем HR и руководителям установить&nbsp;эмоциональный контакт
                с&nbsp;командой, вовремя заметить тревожные сигналы
                и&nbsp;остановить выгорание.
              </p>
              <a
                className={`${styles.button} ${styles.heroButton}`}
                href="#form"
              >
                Заказать демо
              </a>
            </div>
            <div className={styles.heroImages}>
              <img
                src={heroScreenshot}
                alt="Скриншот главного экрана приложения"
              />
              <img src={heroWheel} alt="Скриншот колеса баланса" />
            </div>
          </div>
        </section>

        <section id="audience" className={styles.sectionAudience}>
          <div className={styles.sectionAudienceContainer}>
            <h2>Кому будет полезен MoodBeat?</h2>
            <div className={styles.audienceCards}>
              <article>
                <div>
                  <span>01</span>
                </div>
                <h3>Работодателям и&nbsp;HR&nbsp;специалистам</h3>
                <div>
                  <p>
                    Для отслеживания уровня выгорания, выявления проблемных
                    областей и профилактики выгорания среди сотрудников.
                  </p>
                </div>
              </article>

              <article>
                <div>
                  <span>02</span>
                </div>
                <h3>Руководителям и&nbsp;менеджерам</h3>
                <div>
                  <p>
                    Для оценки состояния выгорания участников&nbsp;своей команды
                    и&nbsp;предоставления&nbsp;необходимой
                    <br />
                    поддержки.
                  </p>
                  <p>
                    Для получения информации о&nbsp;состоянии&nbsp;сотрудников,
                    правильного распределения задач и&nbsp;нагрузки
                    и&nbsp;улучшению рабочей
                    <br />
                    среды
                  </p>
                </div>
              </article>

              <article>
                <div>
                  <span>03</span>
                </div>
                <h3>Сотрудникам</h3>
                <div>
                  <p>
                    Как инструмент для оценки и&nbsp;мониторинга&nbsp;своего
                    эмоционального состояния
                  </p>
                  <p>
                    Ресурс с рекомендациями по&nbsp;управлению&nbsp;стрессом и
                    поддержке своего&nbsp;психического здоровья
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className={styles.sectionFeatures}>
          <div className={styles.sectionFeaturesContainer}>
            <article>
              <div>
                <span>Сотрудникам</span>
                <h2>Экспресс-тесты настроения и рабочих задач</h2>
                <p>
                  Оценивайте регулярно свое настроение и загрузку по&nbsp;работе
                  и формируйте данные для аналитики. Это&nbsp;поможет
                  отрефлексировать свой рабочий опыт и&nbsp;эмоциональное
                  сосотояние
                </p>
              </div>
              <img
                src={articleTests}
                alt="Скриншот приложения со страницей тестирования"
              />
            </article>

            <article>
              <div>
                <span>HR специалистам</span>
                <h2>Опросы сотрудников</h2>
                <p>
                  Проводите регулярные опросы своих сотрудников для&nbsp;оценки
                  их состояния. Используйте предустановленные&nbsp;опросы или
                  добавляйте свои благодаря конструктору опросов
                </p>
              </div>
              <img
                src={articleQueries}
                alt="Скриншот приложения со страницей опросов"
              />
            </article>

            <article>
              <div>
                <span>Сотрудникам</span>
                <h2>Раздел с полезными ресурсами</h2>
                <p>
                  Используйте ресурсы из раздела Полезное для&nbsp;улучшения
                  эмоционального состояния, уменьшения&nbsp;стресса и
                  саморазвития
                </p>
              </div>
              <img
                src={articleBookmarks}
                alt="Скриншот приложения со страницей сохраненных полезных материалов"
              />
            </article>

            <article>
              <div>
                <span>Руководителям</span>
                <h2>Страница сотрудника</h2>
                <p>
                  Получайте всю необходимую информацию о&nbsp;состоянии каждого
                  сотрудника в приложении, сохраняйте и&nbsp;отслеживайте
                  информацию о проведенных&nbsp;встречах, вовремя реагируйте на
                  тревожные&nbsp;сигналы
                </p>
              </div>
              <img
                src={articleProfile}
                alt="Скриншот приложения со страницей профиля сотрудника"
              />
            </article>

            <article>
              <div>
                <span>Для всех</span>
                <h2>Чат-бот в Telegram</h2>
                <p>
                  Получайте всю необходимую информацию о состоянии каждого
                  сотрудника не только в приложении, но&nbsp;удобным для вас
                  способом на смартфон.
                </p>
                <p>
                  Сохраняйте и отслеживайте информацию о&nbsp;проведенных
                  встречах, вовремя реагируйте на&nbsp;тревожные сигналы
                </p>
              </div>
              <img
                src={articleTelegram}
                alt="Скриншот использования Телеграм-бота"
              />
            </article>
          </div>
        </section>

        <section id="faq" className={styles.sectionFaq}>
          <div className={styles.sectionFaqContainer}>
            <h2>FAQ</h2>
            <Accordion faqItems={faqItems} />
          </div>
        </section>

        <section id="form" className={styles.sectionForm}>
          {/* @TODO: Валидация и сабмит формы */}
          <div className={styles.sectionFormContainer}>
            {isSubmitted ? (
              <h2>
                Спасибо!
                <br />
                Мы получили Ваше&nbsp;сообщение.
              </h2>
            ) : (
              <FeedbackForm setIsSubmitted={setIsSubmitted} />
            )}
          </div>
        </section>
      </main>
      <footer>
        <div className={styles.footerContainer}>
          <img src={logo} alt="Логотип" />
          <p>
            Защита для ваших сотрудников
            &copy;&nbsp;&nbsp;2023&nbsp;&nbsp;MoodBeat
          </p>
        </div>
      </footer>
    </div>
  );
};
