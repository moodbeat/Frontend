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
import { Accordion } from "@/components/Accordion/Accordion";
import { FormikErrors, useFormik } from "formik";

interface FormValues {
  name: string;
  comment: string;
  email: string;
}

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};
  if (!values.name) {
    errors.name = "Укажите Ваше имя";
  }

  if (!values.comment) {
    errors.comment = 'Напишите Ваш вопрос в поле "Комментарий"';
  }

  if (!values.email) {
    errors.email = "Укажите адрес электронной почты";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Указанный корректный адрес электронной почты";
  }

  return errors;
};

export const LandingPage: React.FC = () => {
  const faqItems = [
    {
      question: "На какую команду расчитано приложение?",
      answer: "Интересный ответ",
    },
    { question: "Вопрос 2", answer: "Ответ 2" },
    { question: "Вопрос 3", answer: "Ответ 3" },
    { question: "Вопрос 4", answer: "Ответ 4" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <a href="#">
          <img src={logoWhiteText} alt="Логотип" />
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
        <a className={`${styles.button} ${styles.headerButton}`} href="#form">
          Заказать демо
        </a>
      </header>

      <main>
        <section className={styles.sectionHero}>
          <div className={styles.heroCol}>
            <h1 className={styles.heroTitle}>
              Хотите защитить сотрудников от&nbsp;выгорания?
            </h1>
            <p className={styles.heroText}>
              Установите наше инновационное приложение для&nbsp;профилактики
              профессионального выгорания&nbsp;сотрудников MoodBeat.
            </p>
            <a
              className={`${styles.button} ${styles.heroButton}`}
              href="#audience"
            >
              Узнать больше
            </a>
          </div>
          <img
            className={styles.heroImage}
            src={imageHero}
            alt="Скриншот главного экрана приложения"
          />
        </section>

        <section id="audience" className={styles.sectionAudience}>
          <h2>Кому будет полезен MoodBeat?</h2>
          <div className={styles.audienceCards}>
            <article>
              <div>
                <span>01</span>
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
            <article>
              <div>
                <span>02</span>
              </div>
              <h3>руководителям и&nbsp;менеджерам</h3>
              <div>
                <p>
                  Для оценки состояния выгорания участников&nbsp;своей команды
                  и&nbsp;предоставления&nbsp;необходимой
                  <br />
                  поддержки.
                </p>
                <p>
                  Для получения информации о&nbsp;состоянии&nbsp;сотрудников
                  для&nbsp;правильного&nbsp;распределения задач и&nbsp;нагрузки
                  и улучшению рабочей
                  <br />
                  среды
                </p>
              </div>
            </article>
            <article>
              <div>
                <span>03</span>
              </div>
              <h3>работодателям и&nbsp;HR&nbsp;специалистам</h3>
              <div>
                <p>
                  Для отслеживания уровня выгорания, выявления проблемных
                  областей и&nbsp;принятия мер для предотвращения
                  и&nbsp;управления выгоранием среди своих сотрудников
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="features" className={styles.sectionFeatures}>
          <article>
            <div>
              <span>Сотрудникам</span>
              <h2>Экспресс-тесты настроения и рабочих задач</h2>
              <p>
                Оценивайте регулярно свое настроение и загрузку по&nbsp;работе и
                формируйте данные для аналитики. Это поможет отрефлексировать
                свой рабочий опыт и эмоциональное сосотояние
              </p>
              <a
                className={`${styles.button} ${styles.featuresButton}`}
                href="#form"
              >
                Заказать демо
              </a>
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
                Проводите регулярные опросы своих сотрудников для&nbsp;оценки их
                состояния. Используйте предустановленные&nbsp;опросы или
                добавляйте свои благодаря конструктору опросов
              </p>
              <a
                className={`${styles.button} ${styles.featuresButton}`}
                href="#form"
              >
                Заказать демо
              </a>
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
                Получайте всю необходимую информацию о состоянии&nbsp;каждого
                сотрудника в приложении, сохраняйте&nbsp;и отслеживайте
                информацию о проведенных&nbsp;встречах, вовремя реагируйте на
                тревожные&nbsp;сигналы
              </p>
              <a
                className={`${styles.button} ${styles.featuresButton}`}
                href="#form"
              >
                Заказать демо
              </a>
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
                Используйте ресурсы из раздела Полезное для
                улучшения&nbsp;эмоционального состояния, уменьшения&nbsp;стресса
                и саморазвития
              </p>
              <a
                className={`${styles.button} ${styles.featuresButton}`}
                href="#form"
              >
                Заказать демо
              </a>
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
          {/* @TODO: Валидация и сабмит формы */}
          <form onSubmit={formik.handleSubmit}>
            <h2>Остались еще вопросы? Напишите нам!</h2>
            <input
              id="name"
              placeholder="Имя"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />

            <input
              id="email"
              placeholder="E-mail"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />

            <textarea
              id="comment"
              placeholder="Комментарий"
              name="comment"
              onChange={formik.handleChange}
              value={formik.values.comment}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className={styles.sectionFormError}>
                {formik.errors.name}
              </div>
            ) : null}
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.sectionFormError}>
                {formik.errors.email}
              </div>
            ) : null}
            {formik.touched.comment && formik.errors.comment ? (
              <div className={styles.sectionFormError}>
                {formik.errors.comment}
              </div>
            ) : null}
            <button
              type="submit"
              className={`${styles.button} ${styles.sectionFormButton}`}
            >
              Отправить
            </button>
          </form>
          <img
            src={sectionFormImage}
            alt="Фотография счастливых офисных работников на фоне розовой стены"
          />
        </section>
      </main>

      <footer>
        <img src={logo} alt="Логотип" />
        <p>
          Защита для ваших сотрудников
          &copy;&nbsp;&nbsp;2023&nbsp;&nbsp;MoodBeat
        </p>
      </footer>
    </div>
  );
};
