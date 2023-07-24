import styles from "./main.module.css";
import {ArticleInterface, EventInterface} from "@/types";
import { useOnlineCheck } from "@/shared/hooks/useOnlineCheck";
import { BadInternetConnection } from "@/components/BadInternetConnection/BadInternetConnection";
import { Navbar } from "@/components/Navbar/Navbar";
import {RoutineSlider} from "@/components/RoutineSlider/RoutineSlider.tsx";
import {MoodButton} from "@/components/MoodButton/MoodButton.tsx";
import {BurnoutTestBanner} from "@/components/BurnoutTestBanner/BurnoutTestBanner.tsx";
import {MoodGraph} from "@/components/MoodGraph/MoodGraph.tsx";
import {BurnoutLevel} from "@/components/BurnoutLevel/BurnoutLevel.tsx";
import {PsychologistInfo} from "@/components/PsychologistInfo/PsychologistInfo.tsx";
import {Articles} from "@/components/Articles/Articles.tsx";
import {EventsMain} from "@/components/EventsMain/EventsMain.tsx";

interface Props {
  events: EventInterface[];
}
export const Main: React.FC<Props> = ({events}) => {
  const isOnline = useOnlineCheck();

  const articles: ArticleInterface[] = [
    {
      type: "видео",
      title: "Как понять, что у вас профессиональное выгорание",
      length: "5 минут",
      banner: "/image.png",
    },
    {
      type: "статья",
      title: "Как понять, что у вас профессиональное выгорание",
      length: "5 минут",
      banner: "/image.png",
    },
    {
      type: "видео",
      title: "Как понять, что у вас профессиональное выгорание",
      length: "5 минут",
      banner: "/image.png",
    },
  ];

  return  (
    <div className="page-container">
      <Navbar />
      {isOnline ?
        <div className={styles.container}>
          <main className={styles.main}>
            <section className={styles.section}>
              <BurnoutTestBanner id='express'/>
              <PsychologistInfo/>
            </section>
            <section className={styles.moodTracker}>
              <h2 className={styles.moodTrackerHeading}>Оцените свое настроение сегодня</h2>
              <div className={styles.moodButtons}>
                <MoodButton mood="bad" />
                <MoodButton mood="so-so" />
                <MoodButton mood="normal" />
                <MoodButton mood="good" />
                <MoodButton mood="perfect" />
              </div>
            </section>
            <RoutineSlider />
            <section className={styles.section}>
              <MoodGraph />
              <div className={styles.pieChart}>здесь будет круговая диаграмма</div>
            </section>
            <section className={styles.section}>
              <BurnoutLevel />
              <div className={styles.analytics}>здесь будет кнопка для скачивания аналитики</div>
            </section>
            <section className={styles.section}>
              <Articles
                articles={articles}
                title={'Как улучшить ментальное здоровье'}
              />
              <EventsMain  events={events}/>
            </section>
          </main>
        </div>
      : <BadInternetConnection/>}
    </div>
  )
};
