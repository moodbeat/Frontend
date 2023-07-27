import React from "react";
import "@/shared/styles/styles.css";
import styles from "./LandingPage.module.scss";
import logo from "@/assets/logo.svg";
import logoHeader from "@/assets/logo_MoodBeat_bl.svg";
import articleTests from "@/assets/article_tests.png";
import articleQueries from "@/assets/article_queries.png";
import articleProfile from "@/assets/article_profile.png";
import articleBookmarks from "@/assets/article_bookmarks.png";
import heroScreenshot from "@/assets/hero_screenshot.png";
import heroWheel from "@/assets/hero_wheel.png";
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
    errors.email = "Укажите корректный адрес электронной почты";
  }

  return errors;
};

export const LandingPage: React.FC = () => {
  const faqItems = [
    {
      question: "Как сервис поможет в борьбе с выгоранием?",
      answer:
        "Выявление и предупреждение выгорания требует индивидуального подхода к каждому сотруднику. Наш сервис в первую очередь служит инструментом для предупреждения выгорания на основе построенной аналитики, исходя из собираемых с сотрудников данных.",
    },
    {
      question:
        "Какая функция позволяет сотрудникам оценивать своё настроение?",
      answer:
        'В сервисе есть функция "Оценка настроения", которая позволяет сотрудникам регулярно отслеживать свои эмоциональные состояния и выявлять тревожные тенденции.',
    },
    {
      question: "Какие преимущества прохождения опросов в сервисе?",
      answer:
        "Регулярное прохождение опросов помогает сотрудникам более осознанно подходить к своему состоянию, а также предоставляет HR ценную информацию для дальнейшего анализа и предпринятия необходимых мер по предотвращению выгорания.",
    },
    {
      question: "Как функция оценки прошедшего дня может помочь сотрудникам?",
      answer:
        "Оценка прошедшего дня позволяет сотрудникам рефлексировать и анализировать свои действия, успехи и неудачи, что способствует лучшему пониманию собственных эмоций и поведения",
    },
    {
      question: "Что представляют собой полезные статьи в сервисе?",
      answer:
        'В разделе "Полезные статьи" вы найдете информацию о психологическом благополучии, стратегиях противостояния стрессу и выгоранию, а также практические советы для повышения эффективности и удовлетворенности работой.',
    },
    {
      question: "Что такое мероприятия в контексте вашего сервиса?",
      answer:
        "Мероприятия – это различные события, организованные в рамках сервиса, например, вебинары, тренинги или групповые занятия, которые помогают сотрудникам научиться справляться с нагрузкой и стрессом",
    },
    {
      question: "Как HR может оценить состояние сотрудника с помощью сервиса?",
      answer:
        "HR имеет возможность просматривать обобщенные данные о состоянии сотрудников, полученные из опросов и оценок, что помогает выявить общие тенденции и поддерживать тех, кто может нуждаться в дополнительной помощи.",
    },
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
        <a className={`${styles.button} ${styles.headerButton}`} href="#form">
          Заказать демо
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
                href="#audience"
              >
                Установить MoodBeat
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
                <h3>работодателям и&nbsp;HR&nbsp;специалистам</h3>
                <div>
                  <p>
                    Для отслеживания уровня выгорания, выявления проблемных
                    областей и&nbsp;принятия мер для предотвращения
                    и&nbsp;управления выгоранием среди своих сотрудников
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
                    для&nbsp;правильного&nbsp;распределения задач
                    и&nbsp;нагрузки и улучшению рабочей
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
                  и формируйте данные для аналитики. Это поможет
                  отрефлексировать свой рабочий опыт и эмоциональное сосотояние
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
                  Проводите регулярные опросы своих сотрудников для&nbsp;оценки
                  их состояния. Используйте предустановленные&nbsp;опросы или
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
                <span>Сотрудникам</span>
                <h2>Раздел с полезными ресурсами</h2>
                <p>
                  Используйте ресурсы из раздела Полезное для
                  улучшения&nbsp;эмоционального состояния,
                  уменьшения&nbsp;стресса и саморазвития
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
              <p>
                Нажимая на кнопку, я соглашаюсь на{" "}
                <a href="#">обработку персональных данных.</a>
              </p>
            </form>
          </div>
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
