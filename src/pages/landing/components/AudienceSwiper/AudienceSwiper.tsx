import React from "react";
import "@/shared/styles/styles.css";
import styles from "./AudienceSwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const AudienceSwiper: React.FC = () => {
  return (
    <section id="audience" className={styles.sectionAudience}>
      <div className={styles.sectionAudienceContainer}>
        <h2 className={styles.sectionAudienceTitle}>
          Кому будет полезен MoodBeat?
        </h2>
        <Swiper
          style={{ padding: "4px", zIndex: 0 }}
          className={styles.audienceCards}
          spaceBetween={0}
          slidesPerView={1}
        >
          <SwiperSlide className={styles.audienceCard}>
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
          </SwiperSlide>

          <SwiperSlide className={styles.audienceCard}>
            <div>
              <span className={styles.audienceCardLabel}>02</span>
            </div>
            <h3 className={styles.audienceCardTitle}>
              Руководителям и&nbsp;менеджерам
            </h3>
            <div>
              <p className={styles.audienceCardText}>
                Для оценки состояния выгорания участников&nbsp;своей команды
                и&nbsp;предоставления необходимой
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
          </SwiperSlide>

          <SwiperSlide className={styles.audienceCard}>
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
                поддержке своего психического здоровья
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
