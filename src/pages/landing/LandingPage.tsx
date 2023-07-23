import React from "react";
import "@/shared/styles/styles.css";
import styles from "./LandingPage.module.scss";
import logo from "@/assets/logo.svg";
import logoWhiteText from "@/assets/logo_whiteText.svg";
import sectionFormImage from "@/assets/sectionForm_image.png";
import articleTests from "@/assets/article_tests.png";
import articleQueries from "@/assets/article_queries.png";
import articleProfile from "@/assets/article_profile.png";
import articleBookmarks from "@/assets/article_bookmarks.png";
import imageHero from "@/assets/section_hero.png";

import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { basicSchema } from "@/schemas/validationSchema";
import { LogoImg } from "@/shared/ui/Logo/LogoImg";
import { MyFormValues } from "@/types";
import { Input } from "@/shared/ui/Input/Input";
import { Accordion } from "@/components/Accordion/Accordion";

export const LandingPage: React.FC = () => {
  const faqItems = [
    {
      question: "На какую команду расчитано приложение?",
      answer: "Интересный ответ",
    },
    { question: "Вопрос 2", answer: "Ответ 2" },
    { question: "Вопрос 3", answer: "Ответ 3" },
    { question: "Вопрос 3", answer: "Ответ 4" },
  ];

  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <a href="#">
          <img src={logoWhiteText} alt="Логотип" />
        </a>
        <nav className={styles.headerNav}>
          <li className={styles.headerList}>
            <ul>
              <a href="#audience">Для кого?</a>
            </ul>
            <ul>
              <a href="#features">Возможности</a>
            </ul>
            <ul>
              <a href="#faq">FAQ</a>
            </ul>
          </li>
        </nav>
        <Link to="#form">Заказать демо</Link>
      </header>

      <main>
        <section className={styles.sectionHero}>
          <div>
            <h1>Хотите защитить сотрудников от выгорания?</h1>
            <p>
              Установите наше инновационное приложение для профилактики
              профессионального выгорания сотрудников MoodBeat.
            </p>
            <Link to="#audience">Узнать больше</Link>
          </div>
          <img src={imageHero} alt="Скриншот главного экрана приложения" />
        </section>

        <section id="audience" className={styles.sectionAudience}>
          <h2>Кому будет полезен MoodBeat?</h2>
          <div>
            <article>
              <div>
                <span>01</span>
              </div>
              <h3>Сотрудникам</h3>
              <p>
                Как инструмент для оценки и мониторинга своего эмоционального
                состояния
              </p>
              <p>
                Ресурс с рекомендациями по управлению стрессом и поддержке
                своего психического здоровья
              </p>
            </article>
            <article>
              <div>
                <span>02</span>
              </div>
              <h3>руководителям и менеджерам</h3>
              <p>
                Для оценки состояния выгорания участников своей команды и
                предоставления необходимой поддержки.
              </p>
              <p>
                Для получения информации о состоянии сотрудников для правильного
                распределения задач и нагрузки и улучшению рабочей среды
              </p>
            </article>
            <article>
              <div>
                <span>03</span>
              </div>
              <h3>работодателям и HR специалистам</h3>
              <p>
                Для отслеживания уровня выгорания, выявления проблемных областей
                и принятия мер для предотвращения и управления выгоранием среди
                своих сотрудников
              </p>
            </article>
          </div>
        </section>

        <section id="features" className={styles.sectionFeatures}>
          <article>
            <div>
              <span>Сотрудникам</span>
              <h2>Экспресс-тесты настроения и рабочих задач</h2>
              <p>
                Оценивайте регулярно свое настроение и загрузку по работе и
                формируйте данные для аналитики. Это поможет отрефлексировать
                свой рабочий опыт и эмоциональное сосотояние
              </p>
              <Link to="#form">Заказать демо</Link>
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
                Проводите регулярные опросы своих сотрудников для оценки их
                состояния. Используйте предустановленные опросы или добавляйте
                свои благодаря конструктору опросов
              </p>
              <Link to="#form">Заказать демо</Link>
            </div>
            <img
              src={articleQueries}
              alt="Скриншот приложения со страницей опросов"
            />
          </article>

          <article>
            <div>
              <span>Руководителям</span>
              <h2>Страница сотрудника</h2>
              <p>
                Получайте всю необходимую информацию о состоянии каждого
                сотрудника в приложении, сохраняйте и отслеживайте информацию о
                проведенных встречах, вовремя реагируйте на тревожные сигналы
              </p>
              <Link to="#form">Заказать демо</Link>
            </div>
            <img
              src={articleProfile}
              alt="Скриншот приложения со страницей профиля сотрудника"
            />
          </article>

          <article>
            <div>
              <span>Сотрудникам</span>
              <h2>Раздел с полезными ресурсами</h2>
              <p>
                Используйте ресурсы из раздела Полезное для улучшения
                эмоционального состояния, уменьшения стресса и саморазвития
              </p>
              <Link to="#form">Заказать демо</Link>
            </div>
            <img
              src={articleBookmarks}
              alt="Скриншот приложения со страницей сохраненных полезных материалов"
            />
          </article>
        </section>

        <section id="faq" className={styles.sectionFaq}>
          <h2>FAQ</h2>
          <Accordion faqItems={faqItems} />
        </section>

        <section id="form" className={styles.sectionForm}>
          <form>
            <h2>Остались еще вопросы? Напишите нам!</h2>
            <input />
            <input />
            <textarea />
            <button>Отправить</button>
          </form>
          <img
            src={sectionFormImage}
            alt="Фотография счастливых офисных работников на фоне розовой стены"
          />
        </section>
      </main>

      <footer>
        <img src={logo} alt="Логотип" />
        <p>Защита для ваших сотрудников &copy; 2023 MoodBeat</p>
      </footer>
    </div>
  );
};
