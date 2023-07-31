import React from "react";
import "@/shared/styles/styles.css";
import styles from "./Audience.module.scss";

export const Audience: React.FC = () => {
  // TODO: Add Swiper for width < 786px
  return (
    <section id="audience" className={styles.sectionAudience}>
      <div className={styles.sectionAudienceContainer}>
        <h2 className={styles.sectionAudienceTitle}>
          Кому будет полезен MoodBeat?
        </h2>
        <div className={styles.audienceCards}>
          <article className={styles.audienceCard}>
            <div>
              <span className={styles.audienceCardLabel}>01</span>
            </div>
            <h3 className={styles.audienceCardTitle}>
              Работодателям и&nbsp;HR&nbsp;специалистам
            </h3>
            <div>
              <p className={styles.audienceCardText}>
                Для отслеживания уровня выгорания, выявления проблемных областей
                и профилактики выгорания среди сотрудников.
              </p>
            </div>
          </article>

          <article className={styles.audienceCard}>
            <div>
              <span className={styles.audienceCardLabel}>02</span>
            </div>
            <h3 className={styles.audienceCardTitle}>
              Руководителям и&nbsp;менеджерам
            </h3>
            <div>
              <p className={styles.audienceCardText}>
                Для оценки состояния выгорания участников&nbsp;своей команды
                и&nbsp;предоставления&nbsp;необходимой
                <br />
                поддержки.
              </p>
              <p className={styles.audienceCardText}>
                Для получения информации о&nbsp;состоянии&nbsp;сотрудников,
                правильного распределения задач и&nbsp;нагрузки и&nbsp;улучшению
                рабочей
                <br />
                среды
              </p>
            </div>
          </article>

          <article className={styles.audienceCard}>
            <div>
              <span className={styles.audienceCardLabel}>03</span>
            </div>
            <h3 className={styles.audienceCardTitle}>Сотрудникам</h3>
            <div>
              <p className={styles.audienceCardText}>
                Как инструмент для оценки и&nbsp;мониторинга&nbsp;своего
                эмоционального состояния
              </p>
              <p className={styles.audienceCardText}>
                Ресурс с рекомендациями по&nbsp;управлению&nbsp;стрессом и
                поддержке своего&nbsp;психического здоровья
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};